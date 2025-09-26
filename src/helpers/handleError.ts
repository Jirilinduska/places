import { logErrorService } from "@/services/error-logs"

export async function handleError(
    error: unknown,
    context: {
      route?: string
      action?: string
      component?: string
      userID?: string
      input?: any
      url?: string
    }
  ) {
    const errMsg = error instanceof Error ? error.message : "Unknown error"
   logErrorService({message: errMsg, context})
    return { success: false, errMsg }
}