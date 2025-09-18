"use client"

import { Box, Typography } from "@mui/material";
import Link from "next/link"
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { useAuth } from "@clerk/nextjs"

export const AppBar = () => {

    const { userId } = useAuth()

  return (
    <Box
        position="fixed"
        bgcolor="black"
        top={0}
        left={0}
        width="100%"
        height="70px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
        zIndex={100}
    >

        <Link href="/" className="flex flex-col items-center gap-1">
            <DashboardIcon />
            <Typography fontSize="12px">Dashboard</Typography>
        </Link>

        <Link href="/feed" className="flex flex-col items-center gap-1">
            <FeedIcon />
            <Typography fontSize="12px">Feed</Typography>
        </Link>

        <Link href={`/profile/${userId}`} className="flex flex-col items-center gap-1">
            <PermContactCalendarIcon />
            <Typography fontSize="12px">Profile</Typography>
        </Link>

    </Box>
  );
};
