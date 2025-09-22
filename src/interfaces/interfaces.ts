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
    postID: Types.ObjectId
    reason: ReportReason
    comment: string
    createdAt: Date
}

export interface IUserMongo {
    userIDClerk: string
    profileBgImg: string
    isAdmin: boolean
}

export type ActitivyReason = 
   | "upload_post" 
   | "report_post"

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