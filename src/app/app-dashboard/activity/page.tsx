import { ActivityList } from "@/components/ActivityList"
import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { IActivityWithID } from "@/interfaces/interfaces"
import { Activity } from "@/models/Activity"
import { Typography } from "@mui/material"


export default async function AppDashboardActivityPage() {

    const activityDB = await Activity.find()
        .lean<IActivityWithID[]>()
        .sort({ createdAt: -1 })
        .limit(5)

    const activity: IActivityWithID[] = activityDB.map(x => ({
        ...x,
        _id: x._id.toString(),
    }))

  return (
    <AppDashboardWrapper>
        <Typography mb={2} variant="h6" fontWeight={600}>Activity</Typography>
        <ActivityList initialActivity={activity} />
    </AppDashboardWrapper>
  );
}