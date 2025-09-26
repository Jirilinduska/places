import { handleError } from "@/helpers/handleError"
import { ActitivyReason, IActivityWithID } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { Activity } from "@/models/Activity"

export type CreateActivityServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function createActivityService
(userID: string, activity: ActitivyReason, reportID?: string, postID?: string) 
    : Promise<CreateActivityServiceType>
{
    try {
        await connectDB()
        await Activity.create({ userID, activity, reportID, postID })
        return { success: true }
    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Create Activity",
            component: "createActivityService()",
            input: { userID, activity, reportID, postID},
            userID
        })
        return  { success: false, errMsg }
    }
}

export type GetActivitiesServiceType =
  | { success: true, activities: IActivityWithID[] }
  | { success: false, errMsg: string }

export async function getActivitiesService(limit: number, skip: number) : Promise<GetActivitiesServiceType> {
    try {
        await connectDB()
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
        const { errMsg } = await handleError(error, {
            action: "Get Activities",
            component: "getActivitiesService()",
            input: { limit, skip }, 
        })
        return { success: false, errMsg }
    }
}