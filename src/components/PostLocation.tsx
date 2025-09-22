

"use client";

import { Box, Modal, Tooltip, Typography } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place';
import { useState } from "react"
import { AppMap } from "./AppMap"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

type Props = {
    placeName: string,
    lat: number
    lon: number
    municipality: string
    county: string
    wantEdit?: boolean
}

export const PostLocation = ({ lat, lon, placeName, municipality, county, wantEdit } : Props) => {

    const [open, setOpen] = useState(false)

  return (
    <Box>
        <Typography display="flex" alignItems="center" fontSize={12}>
            <PlaceIcon fontSize="small" />
            <Tooltip title="Show on map">
                <Box component="span" onClick={() => setOpen(true)} fontSize={12} sx={{ textDecoration: "underline", cursor: "pointer" }}>
                    {placeName}
                </Box>
            </Tooltip>
        </Typography>

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <Box display="flex" alignItems="center" gap={0.5} mb={2} color="black" fontWeight={600}>
                    <Box component="span">{placeName},</Box>
                    <Box component="span">{municipality},</Box>
                    <Box component="span">{county}.</Box>
                </Box>
                <AppMap 
                    center={[lat, lon]}
                    height="600px"
                    pins={[[lat, lon]]}
                    zoom={13}
                />
            </Box>
        </Modal>
    </Box>
  );
};