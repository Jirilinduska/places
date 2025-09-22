import { auth  } from "@clerk/nextjs/server";
import { Box } from "@mui/material"
import { Post as PostComponent } from "@/components/Post";
import { IPost } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { getProfilePosts } from "@/helpers/getProfilePosts"
import { redirect } from "next/navigation"
import NoPostsFound from "@/components/NoPostsFound"

type Props = {
    params: Promise<{ year: string, profileID: string }>
}

export default async function PlacesBeenYearPage({ params }: Props) {

    const { year, profileID } = await params
    const { userId } = await auth()

    if(!year) {
        redirect(`/profile/${profileID}`)
    }

    if(!userId) {
        return // TODO
    }

    const start = new Date(`${year}-01-01T00:00:00.000Z`)
    const end = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`)

    await connectDB()
    const allPosts: IPost[] = await getProfilePosts(userId, { beenThere: true, tripDate: { $gte: start, $lt: end } }, profileID, true)

    return (
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">

            {allPosts.length === 0 && <NoPostsFound />}

            {allPosts.map(x => (
                <PostComponent key={x._id} data={x} />
            ))}
        </Box>
    )
}
