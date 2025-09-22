"use client"

import { Box, Typography } from "@mui/material";
import Link from "next/link"
import FeedIcon from '@mui/icons-material/Feed';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { SignedIn, useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { getUserFromMongo } from "@/app/actions"
import { UserBadge } from "./UserBadge"
import { AppNavigation } from "./AppNavigation"

export const AppBar = () => {

    const { userId, isSignedIn } = useAuth()
    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async() => {
            if(!userId || !isSignedIn) return
            const { isAdmin, success } = await getUserFromMongo(userId)
            if(success) setIsAdmin(isAdmin)
        }
        fetchData()
    }, [])

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
        justifyContent="space-between"
        gap={4}
        px={2}
        zIndex={100}
    >

        {/* // TODO - tady logo */}
        <Box>
            <Link href="/" className="flex items-center gap-2">
                <img 
                    width={40} 
                    height={40}
                    className="rounded-full"
                    src="/images/earth_logo.png"
                    alt="PlacesBeen"
                />
                <Typography fontWeight={600}>PlacesBeen</Typography>
            </Link>
        </Box>

        <AppNavigation />

        <SignedIn>
            <Box display="flex" alignItems="center" gap={2}>
                {/* <Link href="/feed" className="flex flex-col items-center gap-1">
                    <FeedIcon />
                    <Typography fontSize="12px">Feed</Typography>
                </Link> */}
                {isAdmin && 
                    <Link href={`/app-dashboard`} className="flex flex-col items-center gap-1 ml-6 text-red-400">
                        <PermContactCalendarIcon />
                    <Typography fontSize="12px">Admin Panel</Typography>
                </Link>
                }
            </Box>
        </SignedIn>

        {userId && <UserBadge userID={userId} />}


    </Box>
  );
};
