import { IPost } from "@/interfaces/interfaces"
import { Post } from "@/models/Post"
import { isContentMine } from "./isContentMine"


export const getProfilePosts = async(userID: string, filter: object = {}, profileID: string, wantSort: boolean) => {
    
    let postsToShow: IPost[]
    const onlyPrivate = isContentMine(userID, profileID)

    const allPosts: IPost[] = (await Post.find({ userID, ...filter })
        .sort({ tripDate: -1 })
        .lean<IPost[]>())
        .map(x => ({
            ...x,
            _id: x._id.toString(),
            tripDate: new Date(x.tripDate),
    }))

    if(wantSort) {
        if(!onlyPrivate) {
            postsToShow = allPosts.filter(x => x.isPublic)
        } else {
            postsToShow = allPosts
        } 
    } else {
        postsToShow = allPosts
    }

    return postsToShow
}