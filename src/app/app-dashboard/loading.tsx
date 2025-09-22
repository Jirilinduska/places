import { Box, Skeleton, Typography } from "@mui/material"

export default async function AppDashboardPageLoading() {

  return (
    <Box border="1px solid black" width="100%" mx={2} p={2} color="black">

      <Typography mb={2} variant="h6" fontWeight={600}>App stats</Typography>

      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <Skeleton variant="rectangular" width={210} height={70} />
        <Skeleton variant="rectangular" width={210} height={70} />
        <Skeleton variant="rectangular" width={210} height={70} />
      </Box>

      <Typography mb={2} variant="h6" fontWeight={600}>Recently</Typography>

      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
      <Skeleton variant="rectangular" width={600} height={30} sx={{ mb: 1 }} />
    
    </Box>
  );
}