import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { Box, Skeleton, Typography } from "@mui/material"

export default async function AppDashboardUsersPageLoading() {

  return (
    <AppDashboardWrapper>

      <Typography mb={2} variant="h6" fontWeight={600}>Users</Typography>

      <Box>
        <Box display="flex" justifyContent="space-between" gap={4} my={4}>
            <Skeleton variant="rounded" width="100%" height={50} />
            <Skeleton variant="rounded" width="100%" height={50} />
            <Skeleton variant="rounded" width="100%" height={50} />
        </Box>

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