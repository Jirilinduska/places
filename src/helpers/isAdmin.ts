import { getUserFromMongo } from "@/app/actions"
import { auth } from "@clerk/nextjs/server"

type IsAdminResult = { succ: boolean; isAdmin?: boolean; errorMsg?: string };

export const isAdminHelper = async (): Promise<IsAdminResult> => {
    const { userId } = await auth()
    if (!userId) return { succ: false, errorMsg: "Unauthorized" }
    const { isAdmin } = await getUserFromMongo(userId)
    if(!isAdmin) return { succ: false, errorMsg: "Not Allowed" }
    return { succ: true, isAdmin }
}