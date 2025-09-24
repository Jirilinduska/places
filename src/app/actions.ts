"use server"

import { ActitivyReason, IPost, ReportReason, ResolveReport } from "@/interfaces/interfaces"
import { createActivityService, getActivitiesService } from "@/services/activities"
import { getAdminAppSettingsService, getProfileBackgroundsService, uploadAdminProfileBgImageService } from "@/services/app-settings"
import { changeUsernameClerkActivity, getUserFromClerkService, getUsernameFromClerkService } from "@/services/clerk"
import { deleteImageFromCloudinaryService } from "@/services/cloudinary"
import { deletePostService, updatePostService } from "@/services/posts"
import { createReportService, getReportsService, resolveReportService } from "@/services/reports"
import { getUserFromMongoService, updateProfileBgService } from "@/services/users"


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
export async function getAdminAppSettings(userId: string) {
    return getAdminAppSettingsService(userId)
}

export async function uploadAdminProfileBgImage(userId: string, base64data: string) {
    return uploadAdminProfileBgImageService(userId, base64data)
}

export async function getProfileBackgrounds() {
    return getProfileBackgroundsService()
}

export async function resolveReport(reportID: string, resolved: ResolveReport, solvedComment: string) {
    return resolveReportService(reportID, resolved, solvedComment)
}