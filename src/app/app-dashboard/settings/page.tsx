import { getAdminAppSettings } from "@/app/actions"
import { auth } from "@clerk/nextjs/server"
import { Box, Typography } from "@mui/material"
import { AppSettings } from "@/components/AppSettings"

export default async function AppDashboardSettingsPage() {

    const result = await getAdminAppSettings()

    if(result.success) return <AppSettings appSettings={result.appSettings} />

    return (
        <Box border="1px solid black" width="100%" mx={2} p={2} color="black">
            <Typography>{result.errMsg}</Typography>
        </Box>
    )
}