import { EditPost } from "@/components/EditPost"
import { IPost } from "@/interfaces/interfaces"
import { Post } from "@/models/Post"
import { auth } from "@clerk/nextjs/server"
import { Box } from "@mui/material"
import { notFound } from "next/navigation"


type Props = {
    params: Promise<{ postID: string }>
}

export default async function EditPostPage({ params } : Props) {

    const { userId } = await auth()
    const { postID } = await params
    const post = await Post.findById(postID).lean<IPost>()
    if(!post || (post.userID !== userId)) return notFound()

    const postData = {
        ...post,
        _id: post._id.toString()
    }

  return (
    <Box minHeight="100vh">
        <EditPost data={postData} />
    </Box>
  );
}