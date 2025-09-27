"use client";

import { isContentMine } from "@/helpers/isContentMine"
import { Box, Button, Divider, IconButton, Tab, Tabs } from "@mui/material"
import { usePathname } from "next/navigation"
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link"
import { useIsMobile } from "@/hooks/useIsMobile"

type Props = {
    profileID: string
    userID: string
}

export const ProfileNavigation = ({ profileID, userID } : Props) => {

    const pathname = usePathname()
    const currentTab = pathname?.split("/").pop() || "" 
    const isMobile = useIsMobile()

    if(pathname.includes("settings")) return null
    
  return (
    <Box mb={2}>
        <Box height="100px" display="flex" alignItems="center" justifyContent="space-between">

            <Box p={1} display="flex" justifyContent="space-between" alignItems="center">
                <Tabs
                    value={currentTab === "been" || currentTab === "wants-visit" ? currentTab : ""}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value="" label="Feed" component={Link} href={`/profile/${profileID}`} />
                    <Tab value="been" label="Been" component={Link} href={`/profile/${profileID}/been`} />
                    <Tab value="wants-visit" label="Wants visit" component={Link} href={`/profile/${profileID}/wants-visit`} />
                </Tabs>
            </Box>

            <Box px={2}>
                {isContentMine(userID, profileID) && isMobile && (
                    <IconButton
                        LinkComponent={Link}
                        href={`/profile/${profileID}/settings`}
                    >
                        <SettingsIcon />
                    </IconButton>
                )}
                {isContentMine(userID, profileID) && !isMobile && (
                    <Button
                        LinkComponent={Link}
                        href={`/profile/${profileID}/settings`}
                        variant="outlined"
                        startIcon={<SettingsIcon />}
                    >
                        Settings
                    </Button>
                )}
            </Box>
        </Box>
        <Divider />
    </Box>
  );
};