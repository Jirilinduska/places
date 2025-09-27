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
      mb={4}
      p={0}
      borderRadius={borderRadius}
      color="black"
    >
      <Box p={2}>
        <PostHeader
          data={data} 
          onDelete={handleDeletePost}
          loading={loading}
        />
      </Box>

      <Box px={2}> 
        <TripDate tripDate={data.tripDate}/>
      </Box>

      <Box px={2}>
        <Typography my={2} fontWeight={600}>{data.placeTitle}</Typography>
      </Box>

      {data.images.length > 0 && <PostImages images={data.images} height="400px" /> }

      {data.note && (
        <Box px={2}>
          <Typography my={2}>{data.note}</Typography>
        </Box>
      )}

      {data.stars > 0 && (
        <Box mb={1} px={2}>
          <Stars stars={data.stars} createdByUserID={data.userID} /> 
        </Box>
      )}

      <Box px={2}>
        <Emoji postID={data._id} />
      </Box>

    </Box>
  );
};