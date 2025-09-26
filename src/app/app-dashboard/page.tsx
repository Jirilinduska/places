import { Post } from "@/models/Post"
import { Report } from "@/models/Report"
import { clerkClient } from "@clerk/nextjs/server"
import { Box, Button, Typography } from "@mui/material"
import { ActivityItem } from "@/components/ActivityItem"
import { IActivityWithID } from "@/interfaces/interfaces"
import { Activity } from "@/models/Activity"
import { AppDashboardItem } from "@/components/AppDashboardItem"
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FeedIcon from '@mui/icons-material/Feed';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { ErrorLog } from "@/models/ErrorLog"

const APP_DASHBOARD = "/app-dashboard"

export default async function AppDashboardPage() {

  const client = await clerkClient()
  const usersCount = await client.users.getCount()
  const postsCount = (await Post.find()).length
  const totalReportsCount = (await Report.find()).length
  const unresolvedReportsCount = (await Report.find({ isSolved: false })).length
  const totalErrorsCount = (await ErrorLog.find()).length
  const unsolvedErrorsCount = (await ErrorLog.find({ isSolved: false })).length

  const activities = await Activity.find().lean<IActivityWithID[]>().limit(3).sort({ createdAt: -1 })
  const activitiesPlain = activities.map(x => ({
    ...x,
    _id: x._id.toString(),
}))


// TODO 

  return (
    <AppDashboardWrapper>

      <Typography mb={2} variant="h6" fontWeight={600}>App stats</Typography>

      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">

        <AppDashboardItem 
          icon={<SupervisedUserCircleIcon />}
          mainTitle={usersCount.toString()}
          subTitle="Users"
          routerPushUrl={`${APP_DASHBOARD}/users`}
          buttonText="Show More"
        />

        <AppDashboardItem 
          icon={<FeedIcon />}
          mainTitle={postsCount.toString()}
          subTitle="Posts"
          routerPushUrl={`${APP_DASHBOARD}/posts`}
          buttonText="Show More"
        />

        <AppDashboardItem 
          icon={<ReportProblemIcon />}
          mainTitle={`${unresolvedReportsCount} / ${totalReportsCount}`}
          subTitle="Unsolved Reports"
          routerPushUrl={`${APP_DASHBOARD}/reports`}
          buttonText="Show More"
        />

        <AppDashboardItem 
          icon={<ErrorOutlineIcon />}
          mainTitle={`${unsolvedErrorsCount} / ${totalErrorsCount}`}
          subTitle="Error Logs"
          routerPushUrl={`${APP_DASHBOARD}/errors`}
          buttonText="Show More"
        />
      
      </Box>

      <Typography my={2} variant="h6" fontWeight={600}>Recently:</Typography>

      <Box>
        {activitiesPlain.map((x: IActivityWithID) => <ActivityItem key={x._id} data={x} /> )}
        <Button
          sx={{ mt: 2 }}
          href={`${APP_DASHBOARD}/activity`}
        >
          Show more
        </Button>
      </Box>
    

    </AppDashboardWrapper>
  );
}