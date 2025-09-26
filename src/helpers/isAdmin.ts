import { getUserFromMongo } from "@/app/actions"
import { auth } from "@clerk/nextjs/server"

type IsAdminResult = { succ: boolean; isAdmin?: boolean; errorMsg?: string };

export const isAdminHelper = async (): Promise<IsAdminResult> => {

    const { userId } = await auth()
    
    if (!userId) {
        return { succ: false, errorMsg: "Unauthorized" }
    }

    const result = await getUserFromMongo(userId)

    if (!result.success) {
        return { succ: false, errorMsg: `Not Allowed, authUserID: ${userId}` }
    }

    return { succ: true, isAdmin: result.isAdmin }
}