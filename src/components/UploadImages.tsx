"use client";

import { INewPlaceData } from "@/interfaces/interfaces"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import CancelIcon from '@mui/icons-material/Cancel';

export const UploadImages = ({ imgArray, setNewPlace } : { imgArray: string[], setNewPlace: React.Dispatch<React.SetStateAction<INewPlaceData>> }) => {

    const [state, setState] = useState({
        loading: false,
        errMsg: ""
    })

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setState((prev) => ({...prev, loading: true}))
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
        const base64data = reader.result as string        
        try {
            const res = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64data })
            })
            const data = await res.json()
            console.log("Uploaded URL:", data.url)
        
            setNewPlace(prev => ({
                ...prev,
                images: [...prev.images, data.url]
            }))
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setState((prev) => ({...prev, loading: false}))
        }
    }}

    const handleDelete = async(imgUrl: string) => {
        setState((prev) => ({...prev, loading: true}))
        try {
            const res = await fetch("/api/image/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({imageURL: imgUrl})
            })
            const newArr = imgArray.filter(x => x !== imgUrl)
            setNewPlace((prev) => ({...prev, images: newArr}))
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setState((prev) => ({...prev, loading: false}))
        }
    }

  return (
    <>

        <input
            type="file"
            id="upload-images"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
        />

        <label htmlFor="upload-images">
            <Button disabled={imgArray.length === 2} loading={state.loading} variant="contained" component="span" sx={{ bgcolor: "black" }}>
                Upload Photos
            </Button>
        </label>

        {imgArray.length > 0 && <Typography my={1}>Images {imgArray.length}/2</Typography>}

        {imgArray.length > 0 && <Box display="flex" gap={1}>

            {imgArray.map((x, i) => (

                <Box width={100} height={100} position="relative">

                    <IconButton 
                        onClick={() => handleDelete(x)} 
                        loading={state.loading} 
                        sx={{ position: "absolute", top: -20, right: -20 }}
                    >
                        <CancelIcon color="error" />
                    </IconButton>
                    
                    <img
                        key={i}
                        src={x}
                        alt={x}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover" }}
                    />
                </Box>
            ))}
        </Box>}

    </>
  );
};