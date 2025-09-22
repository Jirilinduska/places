"use client";

import { Box, Tooltip } from "@mui/material"
import { IPost } from "@/interfaces/interfaces"
import { TimeAgo } from "./TimeAgo"
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import { UserBadge } from "./UserBadge"
import { PostMenu } from "./PostMenu"
import { ButtonOpenInNewTab } from "./ButtonOpenInNewTab"

type Props = {
    data: IPost
    onDelete: () => Promise<void>
    loading?: boolean
}

export const PostHeader = ({ data, onDelete, loading } : Props) => {

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

        <Box display="flex" alignItems="center" gap={0}>
        
            <Box mr={2}>
                <TimeAgo date={data.createdAt} />
            </Box>
        
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

            <ButtonOpenInNewTab href={`/post/${data._id}`} />

            <PostMenu 
                postID={data._id} 
                createdBy={data.userID} 
                onDelete={onDelete}
                loading={loading}
            />

        </Box>
  </Box>
  );
};