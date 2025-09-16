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
    county: string
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
}