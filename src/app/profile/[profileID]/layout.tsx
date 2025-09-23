import { Box, Typography } from "@mui/material"
import { isContentMine } from "@/helpers/isContentMine"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { ProfileNavigation } from "@/components/ProfileNavigation"
import { ModalChangeProfileBg } from "@/components/ModalChangeProfileBg"

type Props = {
    children: React.ReactNode
    params: Promise<{ profileID: string }>
}

export default async function ProfileLayout({ children, params } : Props) {

    const { profileID } = await params
    const { userId } = await auth()

    if(!userId) {
        return // TODO
    }

    const client = clerkClient()
    const user = (await client).users.getUser(profileID)

    const userData = {
        username: (await user).username,
        imageUrl: (await user).imageUrl
    }

    return (
        <Box bgcolor="white" minHeight="100vh" pb={20}>

            <Box height="350px" bgcolor="blue" position="relative" display="flex" alignItems="center" justifyContent="center">

                <Box width={200} height={200}>
                    <img
                        src={userData.imageUrl}
                        alt={userData.username || `user_${profileID}`}
                        className="w-full h-full rounded-full"
                    />
                    <Typography textAlign="center" fontWeight={600} fontSize="20px" my={2}>@{userData.username}</Typography>
                </Box>

                {isContentMine(userId, profileID) && (
                    <Box className="cursor-pointer absolute bottom-4 right-4">
                        <ModalChangeProfileBg userId={userId} />
                    </Box>
                )}
            </Box>

            <ProfileNavigation 
                profileID={profileID}
                userID={userId}
            />

        <>{children}</>

    </Box>
    )
}