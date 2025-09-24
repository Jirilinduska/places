import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material"

export default async function LoadingPosts() {

    const posts = [1,2,3]

    return (
      <Box bgcolor="white" minHeight="100vh">
  
          <Box width="100%" height="100%" py={16} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          
            {posts.map(x => (<Card key={x} sx={{ width: { xs: "95%", md: "75%", lg: "50%" }, mb: 20, height: "600px" }} >
        
              <CardHeader
                avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }}/>}
              />
              
              <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
              
              <CardContent>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </CardContent>
            </Card>))}
  
          </Box>
      </Box>
    );
}