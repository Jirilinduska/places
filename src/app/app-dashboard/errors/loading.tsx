import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { Box, Skeleton, Typography } from "@mui/material"

export default async function AppDashboardErrorsPageLoading() {

  return (
    <AppDashboardWrapper>

      <Typography mb={2} variant="h6" fontWeight={600}>Error Logs</Typography>

      <Box>
        <Box>
            <Skeleton variant="rounded" width="100%" height={70} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width="100%" height={70} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width="100%" height={70} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width="100%" height={70} sx={{ mb: 2 }} />
            <Skeleton variant="rounded" width="100%" height={70} sx={{ mb: 2 }} />
        </Box>

    </Box>

    </AppDashboardWrapper>
  );
}