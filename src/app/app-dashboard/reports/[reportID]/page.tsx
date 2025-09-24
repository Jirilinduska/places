import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { ReportItem } from "@/components/ReportItem"
import { IReport } from "@/interfaces/interfaces"
import { Report } from "@/models/Report"
import { Box, Typography } from "@mui/material"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ reportID: string }>
}

export default async function AppDashboardReportIDPage({ params } : Props) {

    const { reportID } = await params

    const reportDB = await Report.findById(reportID).lean<IReport>()

    if(!reportDB) {
        return notFound()
    }

    const report = {
        ...reportDB,
        _id: reportDB?._id.toString(),
        createdAt: reportDB?.createdAt.toString(),
        postID: reportDB?.postID.toString()
    }

  return (
    <AppDashboardWrapper>

      <Typography mb={2} variant="h6" fontWeight={600}>Report: {report._id}</Typography>

      <Box>
        {report && 
            <ReportItem
                reportID={report._id}
                createdAt={report.createdAt}
                isSolved={report.isSolved}
                reason={report.reason}
                postID={report.postID}
                reportedBy={report.reportedBy}
                comment={report.comment}
                commentSolvedBy={report.commentSolvedBy}
                solvedByUserID={report.solvedBy}
            />
        }
      </Box>   

    </AppDashboardWrapper>
  );
}