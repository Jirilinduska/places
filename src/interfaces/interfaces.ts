import { Types } from "mongoose";

export interface INewPlaceData {
    placeTitle: string,
    placeName: string,
    lat: number,
    lon: number,
    note: string
    images: string[]
    beenThere: boolean,
    stars: number,
    country_code: string,
    municipality: string,
    county: string,
    isPublic: boolean
}


export interface ISearchResultAPI {
    display_name: string
    lat: string
    lon: string
    name: string
    address: {
        country_code: string
        municipality: string
        county: string
    }
}

export interface IPost extends INewPlaceData {
    tripDate: Date
    userID: string
    _id: string
    createdAt: Date
}

export interface IPinsWithPopup {
    _id: string
    lat: number
    lon: number
    placeTitle: string
    placeName: string
    images: string[]
    beenThere: boolean
    tripDate: Date
}

export interface IDashboardData {
    placesBeen: number
    placesWantVisit: number
    posts: IPinsWithPopup[]
    placesBeenLastYear: number
    placesBeenThisYear: number
}


export interface IReactions {
    postID: string
    hearts: string[]
    trees: string[]
    water: string[]
    bikes: string[]
    mountains: string[]
}

export interface IUser {
    createdAt: Date | null
    username: string | null
    profileImg: string | null
}

export type ReportReason = "wrong_location" | "inappropriate_photo" | "spam" | "duplicate" | "other"

export interface INewReport {
    reportedBy: string
    postID: Types.ObjectId | string
    reason: ReportReason
    comment: string
    createdAt: Date | string
    isSolved: boolean
    solvedBy: string,
    commentSolvedBy: string
}

export interface IReport extends INewReport {
    _id: string
}

export interface IUserMongo {
    userIDClerk: string
    profileBgImg: string
    isAdmin: boolean
    isBanned: boolean
}

export type ActitivyReason = 
   | "upload_post" 
   | "report_post"
   | "resolve_report"

export interface IActivity {
    userID: string
    activity: ActitivyReason
    createdAt: Date
    postID?: string
    reportID?: string
}

export interface IActivityWithID extends IActivity {
    _id: string
}

export type DashboardValues = "_stats_" | "_visited_" | "_want_visit_" | "_settings_"

export type ResolveReport = "delete_post" | "keep_post"

export interface IAppSettings {
    maintenance: boolean
    profileBgImages: string[]
}

export type IClerkUser = {
    id: string
    banned: boolean
    createdAt: number
    lastSignInAt: number | null
    imageUrl: string
    username: string | null
    firstName: string | null
    lastName: string | null
    lastActiveAt: number | null
}

export interface IErrorLog {
    _id?: string
    message: string
    context: {
        route?: string
        component?: string
        action?: string
        userID?: string
        input?: { [key: string]: unknown } | string
        url?: string
    };
    env: string
    createdAt: Date
    isSolved: boolean
}