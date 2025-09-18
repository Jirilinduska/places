import { auth  } from "@clerk/nextjs/server";
import { Box } from "@mui/material"
import { Post as PostComponent } from "@/components/Post";
import { IPost } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { getProfilePosts } from "@/helpers/getProfilePosts"

type Props = {
    params: Promise<{ profileID: string }>
}

export default async function ProfilePage({ params }: Props) {

    const { profileID } = await params
    const { userId } = await auth()

    if(!userId) {
        return // TODO
    }

    await connectDB()
    const allPosts: IPost[] = await getProfilePosts(userId, {}, profileID, true)

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            {allPosts.map(x => (
                <PostComponent key={x._id} data={x} />
            ))}
        </Box>
    )
}
