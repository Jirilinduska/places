"use client";

import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from "@mui/material"
import { useRouter } from 'next/navigation'

export const ButtonEditPost = ({ postID } : { postID: string }) => {

    const router = useRouter()

  return (
    <Tooltip title="Edit post">
        <IconButton onClick={() => router.push(`/post/${postID}/edit`)}>
            <EditIcon />
        </IconButton>
    </Tooltip>
  );
};