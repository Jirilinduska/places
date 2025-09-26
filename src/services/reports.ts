import { createActivity } from "@/app/actions"
import { handleError } from "@/helpers/handleError"
import { IReport, ReportReason, ResolveReport } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { Report } from "@/models/Report"
import { auth } from "@clerk/nextjs/server"


export type GetReportsServiceType =
  | { success: true, reports: IReport[] }
  | { success: false, errMsg: string }

export async function getReportsService(limit: number, skip: number) : Promise<GetReportsServiceType> {
    try {
        await connectDB()
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
        const {} = await handleError(error, {
            action: "Get Reports List",
            component: "getReportsService()",
            input: { limit, skip }
        })
        return { success: false, errMsg: "Unknown error" }
    }
}

export type CreateReportServiceType =
  | { success: true}
  | { success: false, errMsg: string }

export async function createReportService(postID: string, reason: ReportReason, comment: string) : Promise<CreateReportServiceType> {

    const { userId } = await auth()
    if(!userId) throw new Error("Unauthorized")

    try {
        await connectDB()
        const report = await Report.create({ reportedBy: userId, postID, reason, comment })
        await createActivity(userId, "report_post", report._id)
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Create report",
            component: "createReportService()",
            input: { postID, reason, comment, userId}
        })
        return { success: false, errMsg }
    }
}

export type ResolveReportServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function resolveReportService(reportID: string, resolved: ResolveReport, solvedComment: string) {
    const { userId } = await auth()
    if(!userId) throw new Error("Unauthorized")
    
    try {
        await connectDB()

        const report = await Report.findById(reportID)
        if(!report) {
            throw new Error("Report not found")
        }

        if(resolved === "delete_post") {
            const deleted = await Post.findByIdAndDelete(report.postID)
            if(!deleted) throw new Error("Post not found")
        }

        report.isSolved = true
        report.solvedBy = userId
        report.commentSolvedBy = solvedComment
        await report.save()
        await createActivity(userId, "resolve_report", reportID)
        return { success: true } as const
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Resolve report",
            component: "resolveReportService()",
            input: { reportID, resolved, solvedComment, userId }
        })
        return { success: false, errMsg }
    }  

}