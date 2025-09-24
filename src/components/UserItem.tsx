"use client"

import { Box, Tooltip, Typography } from "@mui/material"
import BlockIcon from '@mui/icons-material/Block';
import { borderRadius } from "@/constants/constants"
import { useRouter } from "next/navigation"
import { TimeAgo } from "./TimeAgo"

type Props = {
    username: string
    imgUrl: string
    banned: boolean
    userIDClerk: string
    lastActiveAt: number | null
}

export const UserItem = ({ username, imgUrl, banned, userIDClerk, lastActiveAt } : Props) => {

    const router = useRouter()

  return (
    <Box 
        boxShadow={3} 
        p={2} 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between" 
        borderRadius={borderRadius}
        onClick={() => router.push(`/app-dashboard/users/${userIDClerk}`)}
        sx={{ cursor: "pointer" }}
    >
        
        <Box display="flex" gap={2} alignItems="center">
            <Box height={50} width={50}>
                <img
                    className="w-full h-full rounded-full"
                    alt={username}
                    src={imgUrl || "/images/default_avatar.png"}
                />
            </Box>
            <Typography fontWeight={600}>{username}</Typography>
        </Box>
        
        <Box>
            {lastActiveAt &&
                <Box display="flex" alignItems="center" gap={0.5}>
                    <Typography fontSize={12}>Last active: </Typography>
                    <TimeAgo date={new Date(lastActiveAt)}/>
                </Box>
            }
            {banned && <Tooltip title="Banned"><BlockIcon/></Tooltip>}
        </Box>

    </Box>
  );
};