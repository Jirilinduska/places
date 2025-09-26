import { handleError } from "@/helpers/handleError"
import { IErrorLog } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { ErrorLog } from "@/models/ErrorLog"

export async function logErrorService({
    message,
    context,
    env = process.env.NODE_ENV || "unknown"
  }: {
    message: string
    context: {
      route?: string
      component?: string
      action?: string
      userID?: string
      input?: any
      url?: string
    }
    env?: string
  }) {
    try {
      await connectDB()
      await ErrorLog.create({
        message,
        context: {
          route: context.route ?? "",
          component: context.component ?? "",
          action: context.action ?? "",
          userID: context.userID ?? "",
          input: context.input ?? null,
          url: context.url ?? ""
        },
        env,
        createdAt: new Date(),
        isSolved: false
      })
    } catch (error) {
      console.error("Error logging failed:", error)
    }
  }
  
export type GetErrLogsServiceType =
  | { success: true, errs: IErrorLog[] }
  | { success: false, errMsg: string }

export async function getErrLogsService(limit: number, skip: number) : Promise<GetErrLogsServiceType> {
    try {
        await connectDB()
        const errsDB = await ErrorLog.find().lean<IErrorLog[]>()
            .limit(5)
            .sort({ isSolved: 1, createdAt: -1 })
            .skip(skip)

        const errs = errsDB.map((e) => ({
            ...e,
            _id: e._id?.toString(),
            context: {
                ...e.context,
                input: JSON.stringify(e.context.input)
            }
        }))

        return { success: true, errs }

    } catch (error: unknown) {
        const { errMsg } = await handleError(error, {
            action: "Get Error Logs",
            component: "getErrLogsService()",
            input: { limit, skip },

        })
        return  { success: false, errMsg }
    }
}

export type MarkErrLogAsSolvedServiceType =
  | { success: true }
  | { success: false, errMsg: string }

export async function markErrLogAsSolvedService(errLogID: string) : Promise<MarkErrLogAsSolvedServiceType> {
  try {
    await connectDB()
    const errLog = await ErrorLog.findById(errLogID)
    if(!errLog) throw new Error("Error log not found")
    errLog.isSolved = true
    await errLog.save()
    return { success: true }
  } catch (error) {
    const { errMsg } = await handleError(error, {
      action: "Mark error log as solved",
      component: "markErrLogAsSolvedService()",
      input: { errLogID },
    })
    return { errMsg, success: false }
  }
}