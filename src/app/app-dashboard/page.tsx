import { DashboardItem } from "@/components/DashboardItem"
import { Post } from "@/models/Post"
import { Report } from "@/models/Report"
import { clerkClient } from "@clerk/nextjs/server"
import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { ActivityItem } from "@/components/ActivityItem"
import { IActivityWithID } from "@/interfaces/interfaces"
import { Activity } from "@/models/Activity"

export default async function AppDashboardPage() {

  const client = await clerkClient()
  const usersCount = await client.users.getCount()
  const postsCount = (await Post.find()).length
  const reportsCount = (await Report.find()).length

  const activities = await Activity.find().lean<IActivityWithID[]>()
  const activitiesPlain = activities.map(x => ({
    ...x,
    _id: x._id.toString(),
}))


// TODO 

  return (
    <Box border="1px solid black" width="100%" mx={2} p={2} color="black">

      <Typography mb={2} variant="h6" fontWeight={600}>App stats</Typography>

      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Link href="/app-dashboard/users">
          {/* <DashboardItem amount={usersCount} title="Users" pinColor="red" bgColor="white" /> */}
        </Link>
        
        <Link href="/app-dashboard/posts">
          {/* <DashboardItem amount={postsCount} title="Posts" pinColor="red" bgColor="white" /> */}
        </Link>

        <Link href="/app-dashboard/reports">
          {/* <DashboardItem amount={reportsCount} title="Reports" pinColor="red" bgColor="white" /> */}
        </Link>
      </Box>

      <Typography mb={2} variant="h6" fontWeight={600}>Recenntly:</Typography>

      <Box>
        {activitiesPlain.map((x: IActivityWithID) => <ActivityItem key={x._id} data={x} /> )}
      </Box>
    

    </Box>
  );
}