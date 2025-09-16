"use client";

import { Drawer, Box, TextField, Button, Typography, Tooltip, IconButton } from "@mui/material";
import { useState } from "react"
import { AppMap } from "./AppMap"
import { Stars } from "./Stars"
import { INewPlaceData } from "@/interfaces/interfaces"
import CancelIcon from '@mui/icons-material/Cancel';
import { SearchInput } from "./SearchInput"
import { UploadImages } from "./UploadImages"
import { SelectTripDate } from "./SelectTripDate"
import dayjs, { Dayjs } from "dayjs"

export type FormState = {
    loading: boolean,
    error: "placeTitle" | "placeName" | ""
    errorMsg: string
}

export const DrawerAddPlace = () => {

    const [open, setOpen] = useState(false)
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
        municipality: ""
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
                county: ""
              })
              setTripDate(dayjs())
              setOpen(false)
        } catch (error) {
            setState(prev => ({ ...prev, errorMsg: "Error saving post" }))
        } finally {
            setState(prev => ({ ...prev, loading: false }))
        }
    }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Form
      </Button>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>

            <Box width={{ xs: "100vw", md: 700, lg: 900 }} p={3} display="flex" flexDirection="column" gap={2}>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6" fontWeight={600}>Add new place</Typography>
                    <Tooltip title="Close">
                        <IconButton onClick={() => setOpen(false)} children={<CancelIcon fontSize="large" color="error" />} />
                    </Tooltip>
                </Box>

                <TextField 
                    value={newPlaceData.placeTitle}
                    size="small" 
                    error={state.error === "placeTitle"} 
                    label="Trip title" 
                    fullWidth 
                    helperText={state.error === "placeTitle" ? "Please enter trip title" : ""}
                    onChange={(e) => {
                        setNewPlaceData((prev) => ({...prev, placeTitle: e.target.value}))
                        if(state.error === "placeTitle") setState(prev => ({ ...prev, error: "" }))
                    }}
                />

                <SearchInput
                    value={newPlaceData.placeName}
                    setNewPlace={setNewPlaceData}
                    setState={setState}
                    state={state}
                />

                {newPlaceData.beenThere && <SelectTripDate setTripDate={setTripDate} tripDate={tripDate} />}

                <AppMap
                    center={[newPlaceData.lat, newPlaceData.lon]}
                    height="300px"
                    zoom={6}
                    pins={[[newPlaceData.lat, newPlaceData.lon]]}   
                />

                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>

                    <Button
                        fullWidth
                        variant={newPlaceData.beenThere ? "contained" : "outlined"}
                        onClick={() => setNewPlaceData((prev) => ({...prev, beenThere: true}))}
                        loading={state.loading}
                    >
                        Been there
                    </Button>

                    <Button
                        fullWidth
                        variant={!newPlaceData.beenThere ? "contained" : "outlined"}
                        onClick={() => setNewPlaceData((prev) => ({...prev, beenThere: false}))}
                        loading={state.loading}
                    >
                        Want visit
                    </Button>

                </Box>

                <TextField 
                    value={newPlaceData.note}
                    onChange={(e) => setNewPlaceData((prev) => ({...prev, note: e.target.value}))} 
                    size="small" 
                    label="Note" 
                    multiline 
                    rows={2} 
                    fullWidth 
                />

                {newPlaceData.beenThere && (
                    <UploadImages 
                        imgArray={newPlaceData.images}
                        setNewPlace={setNewPlaceData}
                    />
                )}

                {newPlaceData.beenThere && 
                    <>
                        <Stars stars={newPlaceData.stars} />
                    </>
                }

                <Button onClick={handleSubmit} variant="contained" color="primary" loading={state.loading}>
                    Submit
                </Button>
            </Box>

        </Drawer>
    </>
  );
};
