import { getErrorLogs } from "@/app/actions"
import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { ErrorLogList } from "@/components/ErrorLogList"
import { Typography } from "@mui/material"

export default async function AppDashboardErrorsPage() {
    const result = await getErrorLogs(5, 0)
  
    if (!result.success) {
      return (
        <AppDashboardWrapper>
          <Typography mb={2} variant="h6" fontWeight={600}>Error Logs</Typography>
          <Typography color="error">{result.errMsg}</Typography>
        </AppDashboardWrapper>
      )
    }
  
    return (
      <AppDashboardWrapper>
        <Typography mb={2} variant="h6" fontWeight={600}>Error Logs</Typography>
        <ErrorLogList initialErrors={result.errs} />
      </AppDashboardWrapper>
    )
  }
  