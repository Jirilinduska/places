import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { Box, Skeleton, Typography } from "@mui/material"

export default async function AppDashboardActivityPageLoading() {

  return (
    <AppDashboardWrapper>

      <Typography>Activity</Typography>

      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" gap={2} alignItems="center">
              <Skeleton width={50} height={50} variant="circular"/>
              <Skeleton width={100} height={30} variant="text"/>
            </Box>

            <Box>
                <Skeleton width={100} height={30} variant="rounded"/>
            </Box>
        </Box>

        <Box mb={4}>
          <Skeleton width="100%" height={40} variant="text"/>
          <Skeleton width="100%" height={40} variant="text"/>
          <Skeleton width="100%" height={40} variant="text"/>
          <Skeleton width="100%" height={40} variant="text"/>
          <Skeleton width="100%" height={40} variant="text"/>
          <Skeleton width="100%" height={40} variant="text"/>
        </Box>
    </Box>
   
    </AppDashboardWrapper>
  );
}