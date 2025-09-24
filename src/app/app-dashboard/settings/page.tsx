import { getAdminAppSettings } from "@/app/actions"
import { auth } from "@clerk/nextjs/server"
import { Box, Typography } from "@mui/material"
import { AppSettings } from "@/components/AppSettings"

export default async function AppDashboardSettingsPage() {

    const { userId } = await auth()
    if(!userId) return // TODO 
    const { appSettings, errMsg } = await getAdminAppSettings(userId)

    if(errMsg) {
        return (
            <Box border="1px solid black" width="100%" mx={2} p={2} color="black">
                <Typography>{errMsg}</Typography>
            </Box>
        )
    }

    if(appSettings) {
        return <AppSettings appSettings={appSettings} />
    }

    return null
}