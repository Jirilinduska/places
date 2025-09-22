import { auth  } from "@clerk/nextjs/server";
import { Box } from "@mui/material"
import { Post as PostComponent } from "@/components/Post";
import { IPost } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { getProfilePosts } from "@/helpers/getProfilePosts"
import NoPostsFound from "@/components/NoPostsFound"

type Props = {
    params: Promise<{ profileID: string }>
}

export default async function PlacesBeenPage({ params }: Props) {

    const { profileID } = await params
    const { userId } = await auth()

    if(!userId) {
        return // TODO
    }

    await connectDB()
    const allPosts: IPost[] = await getProfilePosts(userId, { beenThere: true }, profileID, true)

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">

            {allPosts.length === 0 && <NoPostsFound />}
            {allPosts.map(x => (
                <PostComponent key={x._id} data={x} />
            ))}
        </Box>
    )
}
