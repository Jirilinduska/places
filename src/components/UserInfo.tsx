"use client";

import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { ButtonBanUser } from "./ButtonBanUser"
import { useSnackbar } from "notistack"
import { IClerkUser } from "@/interfaces/interfaces"
import { TimeAgo } from "./TimeAgo"
import BlockIcon from '@mui/icons-material/Block';
import { clerkClient } from "@clerk/nextjs/server"
import { deleteUserByAdmin, deleteUserImgByAdmin } from "@/app/actions"
import { useRouter } from "next/navigation"

type Props = {
    userData: IClerkUser
}

const ITEM_WIDTH = 100

export const UserInfo = ({ userData } : Props) => {

    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const [user, setUser] = useState<IClerkUser>(userData)

    const handleSetBan = (newValue: boolean) => {
        setUser((prev) => ({...prev, banned: newValue}))
    }

    // TODO - obalit button do component a přidat modal are you sure :)

    const handleDeleteImage = async() => {
        const result = await deleteUserImgByAdmin(user.id)
        if(result?.success) {
            setUser((prev) => ({...prev, imageUrl: ""}))
        } else {
            enqueueSnackbar(result?.errMsg, { variant: "error" })
        }
    }

    const handleDeleteUser = async() => {
        const result = await deleteUserByAdmin(user.id)
        if(result?.success) {
            enqueueSnackbar("User deleted", { variant: "success" })
            router.push("/app-dashboard/users")
        } else {
            enqueueSnackbar(result?.errMsg, { variant: "error" })
        }
    }

  return (
    <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" gap={2} alignItems="center">
                <Box height={50} width={50}>
                    <img
                        className="w-full h-full rounded-full"
                        alt={user.username || ""}
                        src={user.imageUrl || "/images/default_avatar.png"}
                    />
                </Box>
                <Typography fontWeight={600}>{user.username || "No Username"}</Typography>
            </Box>

            <Box>
                <ButtonBanUser isBanned={user.banned} handleSetBan={handleSetBan} userID={user.id} />
            </Box>
        </Box>

        <Box mb={4}>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography width={ITEM_WIDTH}>Status:</Typography>
                <Typography color={user.banned ? "error" : "success"}>{user.banned ? "Banned" : "Active"}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography width={ITEM_WIDTH}>First name:</Typography>
                <Typography>{user.firstName}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography width={ITEM_WIDTH}>Last name:</Typography>
                <Typography>{user.lastName}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography width={ITEM_WIDTH}>Created:</Typography>
                {user.createdAt && <TimeAgo date={new Date(user.createdAt)}/>}
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography width={ITEM_WIDTH}>Last active:</Typography>
                {user.lastActiveAt && <TimeAgo date={new Date(user.lastActiveAt)}/>}
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography width={ITEM_WIDTH}>Last sign in:</Typography>
                {user.lastSignInAt && <TimeAgo date={new Date(user.lastSignInAt)}/>}
            </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>

            <Button
                color="error"
                variant="contained"
                size="small"
                onClick={handleDeleteImage}
            >
                Delete profile image
            </Button>

            <Button
                color="error"
                variant="contained"
                size="small"
                onClick={handleDeleteUser}
                startIcon={<BlockIcon/>}
            >
                Delete user
            </Button>

        </Box>
    </Box>
  );
};