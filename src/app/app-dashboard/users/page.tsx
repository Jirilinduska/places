import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { UsersList } from "@/components/UsersList"
import { IClerkUser } from "@/interfaces/interfaces"
import { clerkClient } from "@clerk/nextjs/server"
import { Typography } from "@mui/material"

export default async function AppDashboardUsersPage() {

  const client = await clerkClient()
  const usersClerk = (await client.users.getUserList({
    limit: 5,
  }))
    .data
    .sort((a,b) => b.lastActiveAt! - a.lastActiveAt!)

  const users: IClerkUser[] = usersClerk.map((x) => ({
    id: x.id,
    banned: x.banned,
    createdAt: x.createdAt,
    firstName: x.firstName,
    imageUrl: x.imageUrl,
    lastActiveAt: x.lastActiveAt,
    lastName: x.lastName,
    lastSignInAt: x.lastSignInAt,
    username: x.username,
  }))

  return (
    <AppDashboardWrapper>
        <Typography mb={2} variant="h6" fontWeight={600}>Users</Typography>
        <UsersList initialUsers={users} />
    </AppDashboardWrapper>
  );
}