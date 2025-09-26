"use server"

import { isAdminHelper } from "@/helpers/isAdmin"
import { ActitivyReason, IPost, ReportReason, ResolveReport } from "@/interfaces/interfaces"
import { CreateActivityServiceType, GetActivitiesServiceType, createActivityService, getActivitiesService } from "@/services/activities"
import { GetAdminAppSettingsServiceType, GetProfileBackgroundsServiceType, UploadAdminProfileBgImageServiceType, getAdminAppSettingsService, getProfileBackgroundsService, uploadAdminProfileBgImageService } from "@/services/app-settings"
import { BanUserServiceType, ChangeUsernameClerkServiceType, DeleteUserImgByAdminServiceType, GetUserFromClerkServiceType, GetUserNameFromClerkServiceType, UnbanUserServiceType, banUserService, changeUsernameClerkService, deleteUserImgByAdminService, getUserFromClerkService, getUsernameFromClerkService, unbanUserService } from "@/services/clerk"
import { DeleteImageFromCloudinaryServiceType, deleteImageFromCloudinaryService } from "@/services/cloudinary"
import { GetErrLogsServiceType, MarkErrLogAsSolvedServiceType, getErrLogsService, logErrorService, markErrLogAsSolvedService } from "@/services/error-logs"
import { DeletePostServiceType, UpdatePostServiceType, deletePostService, updatePostService } from "@/services/posts"
import { CreateReportServiceType, GetReportsServiceType, ResolveReportServiceType, createReportService, getReportsService, resolveReportService } from "@/services/reports"
import { DeleteUserForoverServiceType, GetUserFromMongoServiceType, UpdateProfileBgServiceType, deleteUserForoverService, getUserFromMongoService, updateProfileBgService } from "@/services/users"


// ========== CLERK ==========
export async function getUserFromClerk(userID: string) : Promise<GetUserFromClerkServiceType> {
    return getUserFromClerkService(userID)
}
  
export async function getUsernameFromClerk(userID: string) : Promise<GetUserNameFromClerkServiceType>{
    return getUsernameFromClerkService(userID)
}

export async function changeUsernameClerk(userId: string, newUsername: string) : Promise<ChangeUsernameClerkServiceType> {
    return changeUsernameClerkService(userId, newUsername)
}

export async function banUser(userId: string) : Promise<BanUserServiceType> {
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return banUserService(userId)
}

export async function unbanUser(userId: string) : Promise<UnbanUserServiceType>{
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return unbanUserService(userId)
}

// ========== CLOUDINARY ==========
export async function deleteImageFromCloudinary(imgPublicUrl: string) : Promise<DeleteImageFromCloudinaryServiceType> {
    return deleteImageFromCloudinaryService(imgPublicUrl)
}


// ========== USERS MONGO_DB ==========
export async function getUserFromMongo(userID: string) : Promise<GetUserFromMongoServiceType> {
    return getUserFromMongoService(userID)
}

export async function updateProfileBg(userID: string, imgUrl: string) : Promise<UpdateProfileBgServiceType> {
    return updateProfileBgService(userID, imgUrl)
}

// ========== POSTS ==========
export async function UpdatePost(newPost: IPost) : Promise<UpdatePostServiceType> {
    return updatePostService(newPost)
}

export async function deletePost(postID: string) : Promise<DeletePostServiceType> {
    return deletePostService(postID)
}

// ========== REPORTS ==========
export async function createReport(postID: string, reason: ReportReason, comment: string) : Promise<CreateReportServiceType> {
    return createReportService(postID, reason, comment)
}

export async function getReports(limit: number, skip: number) : Promise<GetReportsServiceType> {
    return getReportsService(limit, skip)
}

// ========== ACTIVITIES ==========
export async function createActivity(userID: string, activity: ActitivyReason, reportID?: string, postID?: string)
    : Promise<CreateActivityServiceType>
 {
    return createActivityService(userID, activity, reportID, postID)
}

export async function getActivities(limit: number, skip: number): Promise<GetActivitiesServiceType>  {
    return getActivitiesService(limit, skip)
}

// ========== APP SETTINGS x ADMIN STUFF ==========
export async function getAdminAppSettings() : Promise<GetAdminAppSettingsServiceType> {
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return await getAdminAppSettingsService()
}


export async function uploadAdminProfileBgImage(base64data: string) : Promise<UploadAdminProfileBgImageServiceType> {
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return await uploadAdminProfileBgImageService(base64data)
}

export async function getProfileBackgrounds() : Promise<GetProfileBackgroundsServiceType> {
    return await getProfileBackgroundsService()
}

export async function resolveReport(reportID: string, resolved: ResolveReport, solvedComment: string)
    : Promise<ResolveReportServiceType> 
{
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return await resolveReportService(reportID, resolved, solvedComment)
}

export async function deleteUserImgByAdmin(userIdToDelete: string) : Promise<DeleteUserImgByAdminServiceType> {
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return await deleteUserImgByAdminService(userIdToDelete)
}

export async function deleteUserByAdmin(userIdToDelete: string) : Promise<DeleteUserForoverServiceType> {
    const { errorMsg, isAdmin } = await isAdminHelper()
    if(!isAdmin) return { success: false, errMsg: errorMsg! }
    return await deleteUserForoverService(userIdToDelete)
}


// ========== ERROR ==========
// logError(userId, "Něco se rozbilo", { route: "/profile", action: "update" })
export async function logError(...args: Parameters<typeof logErrorService>) {
    await logErrorService(...args)
}

export async function getErrorLogs(limit: number, skip: number) : Promise<GetErrLogsServiceType> {
    return await getErrLogsService(limit, skip)
}

export async function markErrLogAsSolved(errLogID: string) : Promise<MarkErrLogAsSolvedServiceType> {
    return await markErrLogAsSolvedService(errLogID)
}