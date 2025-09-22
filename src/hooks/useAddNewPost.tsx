import { INewPlaceData } from "@/interfaces/interfaces"
import dayjs, { Dayjs } from "dayjs"
import { useSnackbar } from "notistack"
import { useState } from "react"

export type FormState = {
    loading: boolean,
    error: "placeTitle" | "placeName" | ""
    errorMsg: string
}

export const useAddNewPost = (closeDrawer: () => void) => {

    const { enqueueSnackbar } = useSnackbar()

    const [state, setState] = useState<FormState>({
        loading: false,
        error: "",
        errorMsg: ""
    })

    const [tripDate, setTripDate] = useState<Dayjs | null>(dayjs())

    const [newPlaceData, setNewPlaceData] = useState<INewPlaceData>({
        placeTitle: "",
        placeName: "",
        lat: 50.0755,
        lon: 14.4378,
        note: "",
        images: [],
        beenThere: true,
        stars: 0,
        country_code: "",
        county: "",
        municipality: "",
        isPublic: true,
    })

    const handleSubmit = async() => {

        if(!newPlaceData.placeTitle) {
            setState((prev) => ({...prev, error: "placeTitle"}))
            return
        }
        if(!newPlaceData.placeName) {
            setState((prev) => ({...prev, error: "placeName"}))
            return
        }

        setState(prev => ({ ...prev, loading: true }))

        try {
            const payload = {
                ...newPlaceData,
                tripDate: tripDate ? tripDate.toDate() : new Date()
            }
            
            const res = await fetch("/api/posts", {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })

            if(!res.ok) {
                // TODO error!
            }

            setNewPlaceData({
                placeTitle: "",
                placeName: "",
                lat: 50.0755,
                lon: 14.4378,
                note: "",
                images: [],
                beenThere: true,
                stars: 0,
                country_code: "",
                municipality: "",
                county: "",
                isPublic: true
              })
              setTripDate(dayjs())
              enqueueSnackbar("Post created", { variant: "success" })
              closeDrawer()
        } catch (error) {
            setState(prev => ({ ...prev, errorMsg: "Error saving post" }))
        } finally {
            setState(prev => ({ ...prev, loading: false }))
        }
    }

    return { state, setState, tripDate, setTripDate, newPlaceData, setNewPlaceData, handleSubmit }
}