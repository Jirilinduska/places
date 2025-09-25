import { createActivity, getUserFromMongo } from "@/app/actions"
import { IReport, ReportReason, ResolveReport } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { Report } from "@/models/Report"
import { auth } from "@clerk/nextjs/server"

export async function getReportsService(limit: number, skip: number) {
    try {
        const reportsDB = await Report.find()
            .select("_id reason isSolved createdAt")
            .sort({ isSolved: 1, createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean<IReport[]>()

        const reports = reportsDB.map(x => ({
            ...x,
            _id: x._id.toString(),
            createdAt: x.createdAt.toString()
        }))

        return { success: true, reports }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}


export async function createReportService(postID: string, reason: ReportReason, comment: string) {

    const { userId } = await auth()
    if(!userId) return // TODO 

    try {
        await connectDB()
        const report = await Report.create({ reportedBy: userId, postID, reason, comment })
        const { success, errMsg } = await createActivity(userId, "report_post", report._id)
        if(success) {
            return { success: true }
        } else {
            return { success: false, errMsg }
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function resolveReportService(reportID: string, resolved: ResolveReport, solvedComment: string) {
    const { userId } = await auth()
    if(!userId) return { success: false, errMsg: "Unauthorized" }

    try {
        const report = await Report.findById(reportID)
        if(!report) return { success: false, errMsg: "Report not found" }
        if(resolved === "delete_post") {
            const deleted = await Post.findByIdAndDelete(report.postID)
            if(!deleted) return { success: false, errMsg: "Post not found" }
        }
        report.isSolved = true
        report.solvedBy = userId
        report.commentSolvedBy = solvedComment
        await report.save()
        await createActivity(userId, "resolve_report", reportID)
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }  

}