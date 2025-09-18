"use client";

import { isContentMine } from "@/helpers/isContentMine"
import { Box, Divider, IconButton, Tab, Tabs, Tooltip } from "@mui/material"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link"

type Props = {
    profileID: string
    userID: string
}

export const ProfileNavigation = ({ profileID, userID } : Props) => {

    const pathname = usePathname()
    const currentTab = pathname?.split("/").pop() || "" 
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
                {isContentMine(userID, profileID) && 
                    <Tooltip title="Profile settings">
                        <IconButton>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                }
            </Box>
        </Box>
        <Divider />
    </Box>
  );
};