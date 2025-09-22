"use client";

import { IPost } from "@/interfaces/interfaces"
import { Box, Button, Divider, IconButton, TextField, Typography } from "@mui/material"
import { ButtonDelete } from "./ButtonDelete"
import { useState } from "react"
import { PostLocation } from "./PostLocation"
import { SelectTripDate } from "./SelectTripDate"
import dayjs, { Dayjs } from "dayjs"
import CancelIcon from '@mui/icons-material/Cancel';
import { deleteImageFromCloudinary } from "@/app/actions"
import { useSnackbar } from "notistack"

export const EditPost = ({ data } : { data: IPost }) => {

    const { enqueueSnackbar } = useSnackbar()

    const [post, setPost] = useState<IPost>(data)
    const [loading, setLoading] = useState(false)
    const [tripDate, setTripDate] = useState<Dayjs | null>(dayjs(data.tripDate))

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return
        setLoading(true)
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
        
            setPost(prev => ({
                ...prev,
                images: [...prev.images, data.url]
            }))
        } catch (error) {
            console.error("Upload failed", error)
        } finally {
            setLoading(false)
        }
    }}

    const handleDelete = async(imgUrl: string) => {
        setLoading(true)
        const res = await deleteImageFromCloudinary(imgUrl)
        if(res.success) {
            const newArr = post.images.filter(x => x !== imgUrl)
            setPost((prev) => ({...prev, images: newArr}))
        } else {
            enqueueSnackbar(res.errMsg, { variant: "error" })
        }
        setLoading(false)
    }

  return (
    <Box bgcolor="white" minHeight="100vh">

        <Box py={16} px={{ xs: 2, sm: 6, lg: 16 }} color="black">

            <Box mb={2} display="flex" alignItems="center" justifyContent="end" gap={1}>
                <ButtonDelete
                    deleteID={data._id}
                    deleteOperation="delete_post"
                    modalTitle="Delete this post?"
                    tooltipBtn="Delete post"
                />
            </Box>

            <Box>

                <TextField
                    value={post.placeTitle}
                    label="Trip title"
                    size="small"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(e) => setPost((prev) => ({...prev, placeTitle: e.target.value}))}
                />

                <PostLocation
                    county={post.county}
                    lat={post.lat}
                    lon={post.lon}
                    municipality={post.municipality}
                    placeName={post.placeName}
                />

                {/* <SearchInput
                    value={post.placeName}
                    setNewPlace={setPost}

                /> */}

            </Box>

            <Box my={4}>
                <SelectTripDate 
                    tripDate={tripDate}
                    setTripDate={setTripDate}
                />
            </Box>

            <Divider />

            <Box my={4}>
                
                <input
                    type="file"
                    id="upload-images"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                />

                    <label htmlFor="upload-images">
                        <Button disabled={post.images.length === 2} loading={loading} variant="contained" component="span" sx={{ bgcolor: "black" }}>
                            Upload Photos
                        </Button>
                    </label>

                    {post.images.length > 0 && <Typography my={1}>Images {post.images.length}/2</Typography>}

                    {post.images.length > 0 && <Box display="flex" gap={4}>

                        {post.images.map((x, i) => (

                            <Box width={100} height={100} position="relative">
                                <Box width="100%" height="100%" overflow="hidden">
                                    <img
                                    src={x}
                                    alt={x}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                    />
                                </Box>

                                <IconButton
                                    onClick={() => handleDelete(x)}
                                    loading={loading}
                                    sx={{
                                    position: "absolute",
                                    top: -20,
                                    right: -20,
                                    zIndex: 10,
                                    }}
                                >
                                    <CancelIcon color="error" />
                                </IconButton>
                                </Box>

                        ))}
                    </Box>}
            </Box>

            <Divider />

            <Box my={4}>                
                <TextField 
                    value={post.note}
                    onChange={(e) => setPost((prev) => ({...prev, note: e.target.value}))} 
                    size="small" 
                    label="Note" 
                    multiline 
                    rows={2} 
                    fullWidth 
                />
            </Box>

            {/* {data.stars > 0 && <Stars stars={data.stars} />} */}
        </Box>
        
    </Box>
  );
};