import { AppDashboardWrapper } from "@/components/AppDashboardWrapper";
import { Box, Divider, Skeleton } from "@mui/material";

export default async function AppDashboardErrorLogIDPageLoading() {
  return (
    <AppDashboardWrapper>
      <Skeleton width={200} height={40} variant="text" />

      <Box mb={4}>
        <Skeleton width="100%" height={40} variant="text" />
        <Divider sx={{ my: 1 }} />
        <Skeleton width="100%" height={40} variant="text" />
        <Divider sx={{ my: 1 }} />
        <Skeleton width="100%" height={40} variant="text" />
        <Divider sx={{ my: 1 }} />
        <Skeleton width="100%" height={40} variant="text" />
        <Divider sx={{ my: 1 }} />
        <Skeleton width="100%" height={40} variant="text" />
        <Divider sx={{ my: 1 }} />
        <Skeleton width="100%" height={40} variant="text" />
        <Divider sx={{ my: 1 }} />
      </Box>
    </AppDashboardWrapper>
  );
}
