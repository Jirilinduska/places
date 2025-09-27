"use client"

import { Box, Typography } from "@mui/material";
import Link from "next/link"
import { useAuth } from "@clerk/nextjs"
import { UserBadge } from "./UserBadge"
import { AppNavigation } from "./AppNavigation"
import { useEffect, useState } from "react"
import { DrawerUserMenu } from "./DrawerUserMenu"
import { getUserFromMongo } from "@/app/actions"
import MenuIcon from '@mui/icons-material/Menu';

export const AppBar = () => {

    const { userId, isSignedIn } = useAuth()
    const [openMenu, setOpenMenu] = useState(false)
    const [admin, setAdmin] = useState(false)

    const toggleOpen = () => setOpenMenu(prev => !prev)

    useEffect(() => {
    
        const fetchUser = async() => {
            if(!userId) return
            const result = await getUserFromMongo(userId)
            if(result.success) {
                setAdmin(result.isAdmin)
            }
        }

        fetchUser()
    }, [userId])

    if(!isSignedIn) return null

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

        <AppNavigation />

        {userId && 
            <Box onClick={toggleOpen}>
                <Box display={{ xs: "none", sm: "block" }}>
                    <UserBadge userID={userId} hideLink />
                </Box>
                <Box display={{ xs: "block", sm: "none" }}>
                    <MenuIcon fontSize="large" />
                </Box>
            </Box>
        }

        <DrawerUserMenu 
            onClose={toggleOpen}
            open={openMenu}
            userID={userId}
            isAdmin={admin}
        />
    </Box>
  );
};
