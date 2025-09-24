import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { Box, Skeleton, Typography } from "@mui/material"

export default async function AppDashboardPageLoading() {

  return (
    <AppDashboardWrapper>

      <Typography mb={2} variant="h6" fontWeight={600}>App stats</Typography>

      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Skeleton variant="rectangular" width={275} height={250} />
        <Skeleton variant="rectangular" width={275} height={250} />
        <Skeleton variant="rectangular" width={275} height={250} />
        <Skeleton variant="rectangular" width={275} height={250} />
      </Box>

      <Typography mb={2} variant="h6" fontWeight={600}>Recently</Typography>

      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />

    </AppDashboardWrapper>
  );
}