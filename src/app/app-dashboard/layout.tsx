import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { getUserFromMongo } from "../actions"
import { Box } from "@mui/material"
import AppDashboardNav from "@/components/AppDashboardNav"

type Props = {
    children: React.ReactNode
}

export default async function AppDashboardLayout({ children } : Props ) {

    const { userId } = await auth()
    if(!userId) return notFound() // TODO
    const { success, errMsg, isAdmin } = await getUserFromMongo(userId)
    if(!isAdmin) return notFound() // TODO

  return (
    <Box bgcolor="white" minHeight="100vh" py={16}>
        <Box display="flex">
            <AppDashboardNav />
            {children}
        </Box>
    </Box>
  )
}