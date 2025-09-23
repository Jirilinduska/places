"use client";

import { IPost } from "@/interfaces/interfaces"
import { Box, Typography } from "@mui/material"
import { borderRadius } from "@/constants/constants"
import { PostImages } from "./PostImages"
import { Emoji } from "./Emoji"
import { PostHeader } from "./PostHeader"
import { useState } from "react"
import { deletePost } from "@/app/actions"
import { useSnackbar } from "notistack"
import { TripDate } from "./TripDate"
import { Stars } from "./Stars"

type Props = {
  data: IPost
}

export const Post = ({ data } : Props) => {

  const { enqueueSnackbar } = useSnackbar()
  const [isDeleted, setIsDeleted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDeletePost = async() => {
    setLoading(true )
    const res = await deletePost(data._id)
    if(res.success) {
      enqueueSnackbar("Post deleted", { variant: "success" })
      setIsDeleted(true)
    } else {
      enqueueSnackbar(res.errMsg, { variant: "error" })
    }
    setLoading(false)
  }

  if(isDeleted) return null

  return (
    <Box  
      border="1px solid black" 
      width={{ xs: "95%", md: "75%", lg: "50%" }}
      mb={10}
      height={data.images.length === 0 ? "250px" : "auto"}
      p={2}
      borderRadius={borderRadius}
      color="black"
    >

      <PostHeader
        data={data} 
        onDelete={handleDeletePost}
        loading={loading}
      />

      <TripDate tripDate={data.tripDate}/>

      <Typography my={2} fontWeight={600}>{data.placeTitle}</Typography>

      {data.images.length > 0 && <PostImages images={data.images} height="400px" /> }

      {data.note && (
        <Typography my={2}>{data.note}</Typography>
      )}

      {data.stars > 0 && <Stars stars={data.stars} createdByUserID={data.userID} /> }

      <Emoji postID={data._id} />

    </Box>
  );
};