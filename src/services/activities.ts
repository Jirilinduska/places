import { ActitivyReason, IActivityWithID } from "@/interfaces/interfaces"
import { Activity } from "@/models/Activity"

export async function createActivityService(userID: string, activity: ActitivyReason, reportID?: string, postID?: string) {
    try {
        await Activity.create({ userID, activity, reportID, postID })
        return { success: true }
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}

export async function getActivitiesService(limit: number, skip: number) {
    try {
        const activitiesDB = await Activity.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean<IActivityWithID[]>()

        const activities: IActivityWithID[] = activitiesDB.map(x => ({
            ...x,
            _id: x._id.toString(),
        }))

        return { success: true, activities }

    } catch (error: unknown) {
        if (error instanceof Error) {
            return { success: false, errMsg: error.message }
        }
        return { success: false, errMsg: "Unknown error" }
    }
}