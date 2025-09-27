"use client";

import { changeImageClerk, deleteProfileImg } from "@/app/actions"
import { borderRadius } from "@/constants/constants"
import { useUser } from "@clerk/nextjs"
import { Box, Button, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"

export const ChangeProfileImage = () => {

    const { user } = useUser()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [img, setImg] = useState("")

    useEffect(() => {
        if(!user) return
        setImg(user.imageUrl)
    }, [user])

    const handleDelete = async() => {
        setLoading(true)
        if(!user) return
        const result = await deleteProfileImg(user.id)
        if(result.success) {
            enqueueSnackbar("Image deleted", { variant: "success" })
            await user.reload()
            router.refresh()
        } else {
            enqueueSnackbar(result.errMsg, { variant: "success" })
        }
        setLoading(false)
    }

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!user) return
        if (!e.target.files || e.target.files.length === 0) return
        setLoading(true)
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
    
        const result = await changeImageClerk(formData)

        if(result.success) {
            enqueueSnackbar("Image updated", { variant: "success" })
            await user.reload()
            router.refresh()
        } else {
            enqueueSnackbar(result.errMsg, { variant: "success" })
        }
        setLoading(false)
      }

    if(!user) return null

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" border="1px solid black" borderRadius={borderRadius} p={1}>
          <Typography fontSize={12}>Profile image:</Typography>
    
          <Box width={50} height={50}>
            <img src={img || "/images/default_avatar.png"} alt="profile_image" className="w-full h-full rounded-full" />
          </Box>
    
          <Box display="flex" gap={2}>
            <input
              type="file"
              name="file"
              accept="image/*"
              id="upload-images"
              style={{ display: "none" }}
              onChange={handleUpload}
            />
            <label htmlFor="upload-images">
              <Button loading={loading} variant="contained" size="small" component="span">
                Upload
              </Button>
            </label>
          </Box>
    
          <Button loading={loading} onClick={handleDelete} color="error" variant="contained" size="small">
            Delete
          </Button>
        </Box>
      )
    }