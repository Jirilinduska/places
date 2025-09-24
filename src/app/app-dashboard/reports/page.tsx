import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { ReportList } from "@/components/ReportList"
import { IReport } from "@/interfaces/interfaces"
import { Report } from "@/models/Report"
import { Typography } from "@mui/material"


export default async function AppDashboardReportsPage() {

    const reportsDB = await Report.find()
        .select("_id reason isSolved createdAt") 
        .lean<IReport[]>()
        .sort({ isSolved: 1, createdAt: -1 })
        .limit(5)

    const reports = reportsDB.map(x => ({
        ...x,
        _id: x._id.toString(),
        createdAt: x.createdAt.toString()
    }))

  return (
    <AppDashboardWrapper>
      <Typography mb={2} variant="h6" fontWeight={600}>Reports</Typography>
      <ReportList initialReports={reports} />
    </AppDashboardWrapper>
  );
}