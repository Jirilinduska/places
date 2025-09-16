import { IPost } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { Box } from "@mui/material"
import { Post as PostComponent } from "@/components/Post"
import { Post } from "@/models/Post"


export default async function FeedPage() {

    await connectDB()
    const posts: IPost[] = (await Post.find({ beenThere: true }).sort({ tripDate: -1 }).lean<IPost[]>())
        .map(x => ({
        ...x,
        _id: x._id.toString(),
        tripDate: new Date(x.tripDate), 
    }))
  

  return (
    <Box bgcolor="white" minHeight="100vh">

        <Box width="100%" height="100%" py={16} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            {posts.map((x) => (
                <PostComponent key={x._id} data={x}/>
            ))}

        </Box>
    </Box>
  );
}