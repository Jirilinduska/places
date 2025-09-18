"use client";

import { IPost } from "@/interfaces/interfaces"
import { Box, Typography } from "@mui/material"
import { borderRadius } from "@/constants/constants"
import { PostImages } from "./PostImages"
import { Emoji } from "./Emoji"
import EventIcon from '@mui/icons-material/Event';
import { PostHeader } from "./PostHeader"

type Props = {
  data: IPost
}

export const Post = ({ data } : Props) => {

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

      <PostHeader data={data} />

      <Box display="flex" alignItems="center" mt={1}>
        <EventIcon fontSize="small"/>
        <Typography fontSize="12px">Trip date: {data.tripDate.toLocaleDateString()}</Typography>
      </Box>

      <Typography my={2} fontWeight={600}>{data.placeTitle}</Typography>

      {data.images.length > 0 && <PostImages images={data.images} /> }

      {data.note && (
        <Typography my={2}>{data.note}</Typography>
      )}

      <Emoji postID={data._id} />

    </Box>
  );
};