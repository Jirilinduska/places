"use client";

import { Dashboard, Feed } from "@mui/icons-material"
import { BottomNavigation, BottomNavigationAction, Box, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import AddIcon from '@mui/icons-material/Add';
import { DrawerAddPlace } from "./DrawerAddPlace"
import { useState } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import Link from "next/link"

export const AppNavigation = () => {

    const { userId } = useAuth()
    const router = useRouter()
    const isMobile = useIsMobile()

    const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>

        <DrawerAddPlace 
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
        />

        {!isMobile && (
            <Box display="flex" alignItems="center" gap={4} justifyContent="flex-end" width="100%">
                <Link href="/feed" className="flex flex-col items-center gap-1">
                    <Feed />
                    <Typography fontSize="12px">Feed</Typography>
                </Link> 
                <Box 
                    component="span" 
                    className="flex flex-col items-center gap-1 cursor-pointer"
                    onClick={() => setOpenDrawer(true)}
                >
                    <AddIcon />
                    <Typography fontSize="12px">New post</Typography>
                </Box> 
            </Box>
        )}

        {isMobile && 
            <Box position="fixed" bottom={0} left={0} width="100%">
                <BottomNavigation
                    showLabels
                    sx={{ bgcolor: "black" }}
                >
                    <BottomNavigationAction 
                        sx={{ color: "white" }}
                        label="Dashboard" 
                        icon={<Dashboard />} 
                        onClick={() => router.push("/")}
                    />

                    <BottomNavigationAction 
                        sx={{ color: "white" }}
                        label="New post" 
                        icon={<AddIcon />} 
                        onClick={() => setOpenDrawer(true)}
                    />

                    <BottomNavigationAction 
                        sx={{ color: "white" }}
                        label="Feed" 
                        icon={<Feed />} 
                        onClick={() => router.push("/feed")}
                    />
                    
                    <BottomNavigationAction 
                        sx={{ color: "white" }}
                        label="Profile" 
                        icon={<AccountCircleIcon />} 
                        onClick={() => router.push(`/profile/${userId}`)}
                    />
                </BottomNavigation>
            </Box>
        }
    </>
  );
};