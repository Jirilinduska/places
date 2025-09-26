import { Box } from "@mui/material"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { ProfileNavigation } from "@/components/ProfileNavigation"
import { getProfileBackgrounds, getUserFromMongo } from "@/app/actions"
import { ProfileHeader } from "@/components/ProfileHeader"

type Props = {
    children: React.ReactNode
    params: Promise<{ profileID: string }>
}

export default async function ProfileLayout({ children, params } : Props) {

    const { profileID } = await params
    const { userId } = await auth()

    let bgImages: string[] = []
    let userProfileBG: string = ""

    if(!userId) {
        return // TODO
    }

    const client = clerkClient()
    const user = (await client).users.getUser(profileID)
    const userMongoResult = await getUserFromMongo(userId)
    if(userMongoResult.success) {
        userProfileBG = userMongoResult.profileBG
    }

    const result = await getProfileBackgrounds()
    if(result.success) {
        bgImages = result.images
    }

    const userData = {
        username: (await user).username,
        imageUrl: (await user).imageUrl,
        bgImg: userProfileBG
    }

    return (
        <Box bgcolor="white" minHeight="100vh" pb={20}>

            <ProfileHeader 
                backgroundImg={userData.bgImg}
                profileID={profileID}
                profileImg={userData.imageUrl}
                userID={userId}
                username={userData.username || ""}
                appBgImages={bgImages}
            />

            <ProfileNavigation 
                profileID={profileID}
                userID={userId}
            />

        <>{children}</>

    </Box>
    )
}