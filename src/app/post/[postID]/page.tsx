import { ButtonDelete } from "@/components/ButtonDelete"
import { ButtonEditPost } from "@/components/ButtonEditPost"
import { ButtonShare } from "@/components/ButtonShare"
import { Emoji } from "@/components/Emoji"
import { PostImages } from "@/components/PostImages"
import { Stars } from "@/components/Stars"
import { TripDate } from "@/components/TripDate"
import { UserBadge } from "@/components/UserBadge"
import { isContentMine } from "@/helpers/isContentMine"
import { IPost } from "@/interfaces/interfaces"
import { connectDB } from "@/lib/mongo"
import { Post } from "@/models/Post"
import { auth } from "@clerk/nextjs/server"
import { Box, Divider, Typography } from "@mui/material"
import { notFound } from "next/navigation"

type Props = {
    params: Promise<{ postID: string }>
}

export default async function PostPage({ params } : Props) {

    const { userId } = await auth()
    const { postID } = await params
    const decodedPostID = decodeURIComponent(postID)

    await connectDB()
    const post = await Post.findById(decodedPostID).lean<IPost>()

    if(!post) return notFound()

        //     country_code: { type: String, required: true },
        //     isPublic: { type: Boolean, required: true },

  return (
    <Box bgcolor="white" minHeight="100vh">

        <Box p={16} color="black">

            <Box mb={2} display="flex" alignItems="center" justifyContent="end" gap={1}>
                <ButtonShare
                    successSnackbarMsg="Post URL copied"
                    url={`/post/${postID}`}
                />
                {userId && isContentMine(userId, post.userID) && 
                    <>
                        <ButtonEditPost
                            postID={postID}
                        />
                        <ButtonDelete
                            deleteID={postID}
                            deleteOperation="delete_post"
                            modalTitle="Delete this post?"
                            tooltipBtn="Delete post"
                        />
                    </>
                }
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight={600}>{post.placeTitle}</Typography>
                <UserBadge 
                    userID={post.userID} 
                    county={post.county}
                    lat={post.lat}
                    lon={post.lon}
                    municipality={post.municipality}
                    placeName={post.placeName}
                    showLocation
                />
            </Box>

            <Box mb={4}>
                <TripDate tripDate={post.tripDate} />
            </Box>

            <Divider />

            {post.images.length > 0 && <PostImages images={post.images} height="700px" />}

            <Divider />

            {post.note && <Typography my={2}>{post.note}</Typography>}

            {post.stars > 0 && <Stars stars={post.stars} />}

            <Emoji postID={postID} />
        </Box>
        
    </Box>
  );
}