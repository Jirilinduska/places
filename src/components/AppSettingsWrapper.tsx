"use client"

import { Box, Button, IconButton, Typography } from "@mui/material"
import { AppDashboardItem } from "./AppDashboardItem"
import { IAppSettings } from "@/interfaces/interfaces"
import EngineeringIcon from '@mui/icons-material/Engineering';
import { useState } from "react"
import CancelIcon from '@mui/icons-material/Cancel';
import { uploadAdminProfileBgImage } from "@/app/actions"
import { useAuth } from "@clerk/nextjs"
import { useSnackbar } from "notistack"

type Props = {
    appSettings: IAppSettings
}

export const AppSettingsWrapper = ({ appSettings } : Props) => {


    const { enqueueSnackbar } = useSnackbar()
    const { userId } = useAuth()
    const [data, setData] = useState<IAppSettings>(appSettings)

    const [state, setState] = useState({
        wantEditImages: false,
        loading: false
    })


    const handleUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
        if(!userId) return  
        if (!e.target.files || e.target.files.length === 0) return
        setState((prev) => ({...prev, loading: true}))
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
        const base64data = reader.result as string
        try {
            const { success, errMsg, imgUrl } = await uploadAdminProfileBgImage(userId, base64data)
            if(success) {
                setData(prev => ({ ...prev, images: [...prev.profileBgImages, imgUrl] }))
                enqueueSnackbar("Image uploaded", { variant: "success" })
            } else {
                enqueueSnackbar(errMsg, { variant: "error" })
            }
        } catch (err) {
            console.error(err)
        } finally {
            setState((prev) => ({...prev, loading: false}))
        }
    }}

    // TODO - mazani dokončit
    // const handleDeleteImage = async(imgUrl: string) => {
    //     setState((prev) => ({...prev, loading: true}))
    //     const res = await deleteImageFromCloudinary(imgUrl)
    //     if(res.success) {
    //         const newArr = post.images.filter(x => x !== imgUrl)
    //         setPost((prev) => ({...prev, images: newArr}))
    //     } else {
    //         enqueueSnackbar(res.errMsg, { variant: "error" })
    //     }
    //     setState((prev) => ({...prev, loading: false}))
    // }

  return (
    <Box border="1px solid black" width="100%" mx={2} p={2} color="black">
        
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">

            <AppDashboardItem 
                buttonText={data.maintenance ? "Turn Off" : "Turn On"}
                icon={<EngineeringIcon />}
                subTitle="Maintenance Mode"
                mainTitle={data.maintenance ? "ON" : "OFF"}
            />
            
            <AppDashboardItem 
                buttonText={data.maintenance ? "Turn Off" : "Turn On"}
                icon={<EngineeringIcon />}
                subTitle="Maintenance Mode"
                mainTitle={data.maintenance ? "ON" : "OFF"}
            />

        </Box>

        {/* Profile Bg Images */}

        <Box my={4}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="h5">
                    Profile background images
                </Typography>
                <Button  
                    variant="contained" 
                    color={state.wantEditImages ? "success" : "info"} 
                    size="small"
                    onClick={() => {
                        if(state.wantEditImages) {
                            setState((prev) => ({...prev, wantEditImages: false}))
                        } else {
                            setState((prev) => ({...prev, wantEditImages: true}))
                        }
                    }}
                >
                    {state.wantEditImages ? "Save" : "Edit"}
                </Button>
                {state.wantEditImages && (
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
                            <Button loading={state.loading} variant="contained" size="small" component="span" sx={{ bgcolor: "black" }}>
                                Upload Photos
                            </Button>
                        </label>
                    </>
                )}
            </Box>

            {data.profileBgImages.length > 0 
                ? (
                    <Box display="flex" alignItems="center" gap={2} my={4}>
                        {data.profileBgImages.map((x, i) => (

                            <Box width={200} height={100} position="relative" key={i} border="1px solid black">
                                
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
                                    // onClick={() => handleDeleteImage(x)}
                                    loading={state.loading}
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
                    </Box>
                )
                : <Typography>No images</Typography>
            }
        </Box>

    </Box>
)
}