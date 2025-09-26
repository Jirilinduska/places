"use client"

import { Box, Typography } from "@mui/material";
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
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
            const result = await getUserFromMongo(userId)
            if(result.success) {
                setIsAdmin(result.isAdmin)
            }
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

        {isSignedIn && <AppNavigation />}
        {userId && <UserBadge userID={userId} />}


    </Box>
  );
};
