import { AppDashboardWrapper } from "@/components/AppDashboardWrapper"
import { Box, Divider, Skeleton } from "@mui/material"

export default async function AppDashboardReportIDPageLoading() {

  return (
    <AppDashboardWrapper>

      <Skeleton width={200} height={40} variant="text"/>

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
          <Divider sx={{ my: 1 }} />
          <Skeleton width="100%" height={40} variant="text"/>
          <Divider sx={{ my: 1 }} />
          <Skeleton width="100%" height={40} variant="text"/>
          <Divider sx={{ my: 1 }} />
          <Skeleton width="100%" height={40} variant="text"/>
          <Divider sx={{ my: 1 }} />
          <Skeleton width="100%" height={40} variant="text"/>
          <Divider sx={{ my: 1 }} /> 
          <Skeleton width="100%" height={40} variant="text"/>
          <Divider sx={{ my: 1 }} />
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Skeleton width={100} height={30} variant="rounded"/>
          <Skeleton width={100} height={30} variant="rounded"/>
        </Box>
    </Box>
   
    </AppDashboardWrapper>
  );
}