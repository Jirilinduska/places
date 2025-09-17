"use client";

import { IPost } from "@/interfaces/interfaces"
import { Box, Typography } from "@mui/material"
import { TimeAgo } from "./TimeAgo"
import { borderRadius } from "@/constants/constants"
import { PostImages } from "./PostImages"
import { Emoji } from "./Emoji"
import { PostLocation } from "./PostLocation"

type Props = {
  data: IPost
}

// note: string
// beenThere: boolean,
// stars: number,
// country_code: string
// tripDate: Date
// userID: string
// _id: string

export const Post = ({ data } : Props) => {
  return (
    <Box  
      border="1px solid black" 
      width={{ xs: "95%", md: "75%", lg: "50%" }}
      mb={10}
      height={data.images.length === 0 ? "200px" : "auto"}
      p={2}
      borderRadius={borderRadius}
      color="black"
    >

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography fontWeight={600}>USERNAME</Typography>
          <PostLocation lat={data.lat} lon={data.lon} placeName={data.placeName} county={data.county} municipality={data.municipality} />
        </Box>
        <TimeAgo date={data.createdAt} />
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