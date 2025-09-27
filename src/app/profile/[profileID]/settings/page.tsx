import { UserSettings } from "@/components/UserSettings"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { Box, Typography } from "@mui/material"
import { notFound, redirect } from "next/navigation"

type Props = {
    params: Promise<{ profileID: string }>
}

export default async function ProfileSettingsPage({ params } : Props) {

    const { profileID } = await params
    const { userId } = await auth()

    if(profileID !== userId) {
        redirect(`/profile/${profileID}`)
    }

  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" color="black" p={2}>
        <Typography variant="h6" fontWeight={600}>Profile Settings</Typography>
        <UserSettings />
    </Box>
  );
}