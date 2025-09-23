import { Box, Divider, Skeleton } from "@mui/material"


export default async function LoadingPostPage() {

  return (
    <Box bgcolor="white" minHeight="100vh">

        <Box p={16} color="black">

            <Box mb={2} display="flex" alignItems="center" justifyContent="end" gap={1}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
                <Skeleton variant="circular" width={40} height={40} />
            </Box>

            <Box mb={4}>
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </Box>

            <Divider />

            <Box display="flex" gap={2} my={4}>
                <Skeleton
                    animation="wave"
                    height="400px"
                    width="50%"
                />
                <Skeleton
                    animation="wave"
                    height="400px"
                    width="50%"
                />
            </Box>

            <Divider />

            <Box my={4}>
                <Skeleton variant="rectangular" width={210} height={60} />
            </Box>
            

            <Box my={4}>
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            </Box>
            

            <Divider />

            <Box mt={4} display="flex" alignItems="center" gap={2}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
            </Box>
        </Box>
        
    </Box>
  );
}