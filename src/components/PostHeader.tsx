"use client";

import { Box, Tooltip } from "@mui/material"
import { IPost } from "@/interfaces/interfaces"
import { TimeAgo } from "./TimeAgo"
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { UserBadge } from "./UserBadge"
import { PostMenu } from "./PostMenu"

export const PostHeader = ({ data } : { data: IPost }) => {

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">

        <UserBadge 
            userID={data.userID} 
            showLocation
            county={data.county}
            lat={data.lat}
            lon={data.lon}
            municipality={data.municipality}
            placeName={data.placeName}
        />

        <Box display="flex" alignItems="center" gap={2}>
        
            <TimeAgo date={data.createdAt} />
        
            {data.isPublic 
                ? (
                <Tooltip title="Public">
                    <PublicIcon fontSize="small" />
                </Tooltip>
                ) : (
                <Tooltip title="Private">
                    <LockIcon fontSize="small" /> 
                </Tooltip>
            )}

            <PostMenu 
                postID={data._id} 
                createdBy={data.userID} 
            />

        </Box>
  </Box>
  );
};