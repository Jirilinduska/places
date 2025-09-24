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

    if(!userId) {
        return // TODO
    }

    const client = clerkClient()
    const user = (await client).users.getUser(profileID)
    const userMongo = getUserFromMongo(userId)

    const result = await getProfileBackgrounds()
    if(result) {
        bgImages = result.images
    }

    const userData = {
        username: (await user).username,
        imageUrl: (await user).imageUrl,
        bgImg: (await userMongo).profileBG
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