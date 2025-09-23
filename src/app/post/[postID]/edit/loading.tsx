import { Box, Divider, Skeleton } from "@mui/material"


export default async function LoadingEditPostPage() {

  return (


    <Box py={16} px={{ xs: 2, sm: 6, lg: 16 }} color="black">

        <Box mb={2} display="flex" alignItems="center" justifyContent="end" gap={1}>
            <Box display="flex" alignItems="center" gap={2}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={40} height={40} />
            </Box>
        </Box>

        <Box>
            <Skeleton variant="rectangular" width="100%" height={60} />
            <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
        </Box>

        <Box my={4}>
            <Skeleton variant="rectangular" width={210} height={100} />
        </Box>

        <Divider />

        <Box my={4} display="flex" gap={4}>
            <Skeleton
                animation="wave"
                height="100px"
                width="100px"
            />
            <Skeleton
                animation="wave"
                height="100px"
                width="100px"
            />   
        </Box>

        <Divider />

        <Box my={4}>
            <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
        </Box>

        <Divider />
               
        <Box my={4}>
                <Skeleton variant="rectangular" width={210} height={60} />
        </Box>

        <Divider />
        
    </Box>
    
  );
}