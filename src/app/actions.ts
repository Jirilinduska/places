"use server"

import { isAdminHelper } from "@/helpers/isAdmin"
import { ActitivyReason, IPost, ReportReason, ResolveReport } from "@/interfaces/interfaces"
import { createActivityService, getActivitiesService } from "@/services/activities"
import { getAdminAppSettingsService, getProfileBackgroundsService, uploadAdminProfileBgImageService } from "@/services/app-settings"
import { banUserService, changeUsernameClerkActivity, deleteUserImgByAdminService, getUserFromClerkService, getUsernameFromClerkService, unbanUserService } from "@/services/clerk"
import { deleteImageFromCloudinaryService } from "@/services/cloudinary"
import { deletePostService, updatePostService } from "@/services/posts"
import { createReportService, getReportsService, resolveReportService } from "@/services/reports"
import { deleteUserForoverService, getUserFromMongoService, updateProfileBgService } from "@/services/users"
import { auth } from "@clerk/nextjs/server"


// ========== CLERK ==========
export async function getUserFromClerk(userID: string) {
    return getUserFromClerkService(userID)
}
  
export async function getUsernameFromClerk(userID: string) {
    return getUsernameFromClerkService(userID)
}

export async function changeUsernameClerk(userId: string, newUsername: string) {
    return changeUsernameClerkActivity(userId, newUsername)
}

export async function banUser(userId: string) {
    return banUserService(userId)
}

export async function unbanUser(userId: string) {
    return unbanUserService(userId)
}

// ========== CLOUDINARY ==========
export async function deleteImageFromCloudinary(imgPublicUrl: string) {
    return deleteImageFromCloudinaryService(imgPublicUrl)
}


// ========== USERS MONGO_DB ==========
export async function getUserFromMongo(userID: string) {
    return getUserFromMongoService(userID)
}

export async function updateProfileBg(userID: string, imgUrl: string) {
    return updateProfileBgService(userID, imgUrl)
}

// ========== POSTS ==========
export async function UpdatePost(newPost: IPost) {
    return updatePostService(newPost)
}

export async function deletePost(postID: string) {
    return deletePostService(postID)
}

// ========== REPORTS ==========
export async function createReport(postID: string, reason: ReportReason, comment: string) {
    return createReportService(postID, reason, comment)
}

export async function getReports(limit: number, skip: number) {
    return getReportsService(limit, skip)
}

// ========== ACTIVITIES ==========
export async function createActivity(userID: string, activity: ActitivyReason, reportID?: string, postID?: string) {
    return createActivityService(userID, activity, reportID, postID)
}

export async function getActivities(limit: number, skip: number) {
    return getActivitiesService(limit, skip)
}

// ========== APP SETTINGS x ADMIN STUFF ==========
export async function getAdminAppSettings() {
    const { succ, errorMsg, isAdmin } = await isAdminHelper()
    if(succ || !isAdmin) return { success: false, errMsg: errorMsg }
    const { success, errMsg, appSettings } = await getAdminAppSettingsService()
    return { success, errMsg, appSettings }
}

export async function uploadAdminProfileBgImage(userId: string, base64data: string) {
    const { succ, errorMsg, isAdmin } = await isAdminHelper()
    if(succ || !isAdmin) return { success: false, errMsg: errorMsg }
    const { success, errMsg, imgUrl } = await uploadAdminProfileBgImageService(base64data)
    return { success, errMsg, imgUrl }
}

export async function getProfileBackgrounds() {
    return getProfileBackgroundsService()
}

export async function resolveReport(reportID: string, resolved: ResolveReport, solvedComment: string) {
    const { succ, errorMsg, isAdmin } = await isAdminHelper()
    if(succ || !isAdmin) return { success: false, errMsg: errorMsg }
    const { success, errMsg } = await resolveReportService(reportID, resolved, solvedComment)
    return { success, errMsg }
}

export async function deleteUserImgByAdmin(userIdToDelete: string) {
    const { succ, errorMsg, isAdmin } = await isAdminHelper()
    if(succ || !isAdmin) return { success: false, errMsg: errorMsg }
    const { success, errMsg } = await deleteUserImgByAdminService(userIdToDelete)
    return { success, errMsg }
}

export async function deleteUserByAdmin(userIdToDelete: string) {
    const { succ, errorMsg, isAdmin } = await isAdminHelper()
    if(succ || !isAdmin) return { success: false, errMsg: errorMsg }
    const { success, errMsg } = await deleteUserForoverService(userIdToDelete)
    return { success, errMsg }
}