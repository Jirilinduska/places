"use client";

import { Drawer, Box, TextField, Button, Typography, Tooltip, IconButton } from "@mui/material";
import { useState } from "react"
import { AppMap } from "./AppMap"
import { Stars } from "./Stars"
import CancelIcon from '@mui/icons-material/Cancel';
import { SearchInput } from "./SearchInput"
import { UploadImages } from "./UploadImages"
import { SelectTripDate } from "./SelectTripDate"
import { useAddNewPost } from "@/hooks/useAddNewPost"
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

export const DrawerAddPlace = () => {

    const [open, setOpen] = useState(false)
    const closeDrawer = () => setOpen(false)
    const { state, setState, tripDate, setTripDate, newPlaceData, setNewPlaceData, handleSubmit } = useAddNewPost(closeDrawer)

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

                <Box display="flex" alignItems="center" justifyContent="space-between">
                    {newPlaceData.beenThere && (
                        <UploadImages 
                            imgArray={newPlaceData.images}
                            setNewPlace={setNewPlaceData}
                        />
                    )}
                    <Box>
                        <Tooltip title="Public">
                            <IconButton onClick={() => setNewPlaceData((prev) => ({...prev, isPublic: true}))}>
                                <PublicIcon className={newPlaceData.isPublic ? "text-blue-500" : ""} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Private">
                            <IconButton onClick={() => setNewPlaceData((prev) => ({...prev, isPublic: false}))}>
                                <LockIcon className={!newPlaceData.isPublic ? "text-blue-500" : ""} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

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
