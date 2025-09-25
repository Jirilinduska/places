import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { ButtonBanUser } from "@/components/ButtonBanUser"
import { UserInfo } from "@/components/UserInfo"
import { IClerkUser } from "@/interfaces/interfaces"
import { clerkClient } from "@clerk/nextjs/server"
import { Box, Typography } from "@mui/material"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ userID: string }>
}

export default async function AppDashboardUserPage({ params } : Props) {

    const { userID } = await params

    const client = await clerkClient()
    const user = await client.users.getUser(userID)

    if(!user) {
        return notFound()
    }

    const userData: IClerkUser = {
        banned: user.banned,
        createdAt: user.createdAt,
        firstName: user.firstName,
        id: user.id,
        imageUrl: user.imageUrl,
        lastActiveAt: user.lastActiveAt,
        lastName: user.lastName,
        lastSignInAt: user.lastSignInAt,
        username: user.username
    }

  return (
    <AppDashboardWrapper>
        <Typography mb={2} variant="h6" fontWeight={600}>{user.username || "No Username"}</Typography>
        <UserInfo userData={userData} />
    </AppDashboardWrapper>
  );
}