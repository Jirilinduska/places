"use client"

import { Box, Button, Divider, Drawer, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from "@mui/icons-material/Logout"
import Link from "next/link";
import { useClerk } from "@clerk/nextjs"
import ExploreIcon from '@mui/icons-material/Explore';
import PlaceIcon from '@mui/icons-material/Place';
import AppLogo from "./AppLogo"
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useIsMobile } from "@/hooks/useIsMobile"

type Props = {
    open: boolean
    onClose: () => void
    userID: string
    isAdmin: boolean
}

export const DrawerUserMenu = ({ open, onClose, userID, isAdmin } : Props) => {

    const { signOut } = useClerk()
    const isMobile = useIsMobile()

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>

        <Box 
            width={{ xs: "80vw", md: 400, lg: 300 }} 
            height="100%"
            display="flex" 
            flexDirection="column" 
            bgcolor="#111" 
            p={3}
            gap={2}
            position="relative"
        >

            <Box color="white" mb={2}>
                <AppLogo hideLink/>
            </Box>

            {/* // Na menších displayech je tohle u bottom menu :) */}
            {!isMobile && 
                <>
                    <Link 
                        href={`/profile/${userID}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
                    >
                        <AccountCircleIcon />
                        <Typography fontWeight={500}>My profile</Typography>
                    </Link>

                    <Link 
                        href={`/`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
                    >
                        <SpaceDashboardIcon />
                        <Typography fontWeight={500}>Dashboard</Typography>
                    </Link>

                    <Link 
                        href={`/feed`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
                    >
                        <DynamicFeedIcon />
                        <Typography fontWeight={500}>Feed</Typography>
                    </Link>
                </>
            }


            <Link 
                href={`/profile/${userID}/been`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
            >
                <ExploreIcon />
                <Typography fontWeight={500}>Visited places</Typography>
            </Link>

            <Link 
                href={`/profile/${userID}/wants-visit`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
            >
                <PlaceIcon />
                <Typography fontWeight={500}>Places to visit</Typography>
            </Link>

            <Link 
                href={`/profile/${userID}/stats`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
            >
                <SignalCellularAltIcon />
                <Typography fontWeight={500}>Stats</Typography>
            </Link>

            <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.3)" }} />

            {/* ADMIN BUTTON */}
            {isAdmin && (
                <Link 
                    href="/app-dashboard"
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
                >
                    <DashboardIcon />
                    <Typography fontWeight={500}>App Dashboard</Typography>
                </Link>
            )}

            <Link 
                href={`/profile/${userID}/settings`}
                onClick={onClose}
                className="flex items-center gap-3 p-2 mb-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
            >
                <SettingsIcon />
                <Typography fontWeight={500}>Settings</Typography>
            </Link>

            <Button 
                onClick={() => {
                    signOut({ redirectUrl: "/" })
                    onClose()
                }}
                className="flex items-center gap-3 p-2 cursor-pointer text-white hover:bg-gray-600 hover:rounded-lg"
                variant="outlined"
            >
                <LogoutIcon />
                <Typography fontWeight={500}>Sign out</Typography>
            </Button>

        </Box>

    </Drawer>
  );
};
