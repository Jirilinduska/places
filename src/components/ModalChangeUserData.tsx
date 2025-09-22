"use client";

import { useUser } from "@clerk/nextjs"
import { Box, Button, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit'
import { useSnackbar } from "notistack"
import { changeUsernameClerk } from "@/app/actions"
import { DeleteForever } from "@mui/icons-material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

type Props = {
    username?: boolean
    profileImg?: boolean
    toggleChange?: () => void
}

export const ModalChangeUserData = ({ username, profileImg, toggleChange } : Props) => {

    const { user } = useUser()
    const { enqueueSnackbar } = useSnackbar()

    const [modalState, setModalState] = useState({
        open: false,
        isChange: false,
        loading: false
    })

    const [userData, setUserData] = useState({
        username: "",
        imageUrl: ""
    })

    const changeModalState = (updateState: "open" | "isChange" | "loading", value: boolean) => {
        setModalState((prev) => ({...prev, [updateState]: value}))
    }

    const handleTitle = () => {
        if(username) return "Change username"
        if(profileImg) return "Change profile image"
    }

    const handleSubmit = async() => {
        if(!user) return
        if(username) {
            const { errMsg } = await changeUsernameClerk(user.id, userData.username)
            if(errMsg) {
                enqueueSnackbar(errMsg, { variant: "error" })
                return  
            }
            if(toggleChange) {
                toggleChange()
            } 
            enqueueSnackbar("Username updated", { variant: "success" })
            changeModalState("isChange", false)
            changeModalState("open", false)
        }
    }

    useEffect(() => {
        if(!user) return
        setUserData({
            username: user.username || "",
            imageUrl: user.imageUrl || ""
        })
    }, [])

  return (
    <>
        <Box display="flex" alignItems="center" justifyContent="space-between">
            {username && <Typography>{ `Username: ${user?.username || ""}`}</Typography>}
            {profileImg && (
                <Box width={50} height={50}>
                    <img 
                        className="w-full h-full rounded-full"
                        src={user?.imageUrl || "/images/default_avatar.png"}
                        alt={userData.username}
                    />
                </Box>
            )}

            <Tooltip 
                title={username ? "Change username" : profileImg ? "Change profile image" : ""} 
                onClick={() => changeModalState("open", true)}
            >
                <IconButton>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>

        <Modal open={modalState.open} onClose={() => changeModalState("open", false)}>
            <Box sx={style}>
                <Typography mb={4} fontWeight={600} color="black" textAlign="center">{handleTitle()}</Typography>
                {username && (
                    <TextField
                        value={userData.username}
                        onChange={(e) => {
                            setUserData((prev) => ({...prev, username: e.target.value}))
                            changeModalState("isChange", true)
                        }}
                        fullWidth
                        label="Username"
                    />
                )}

                {profileImg && (
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Box width={200} height={200} position="relative">
                            <img 
                                className="w-full h-full rounded-full" 
                                src={userData.imageUrl || "/images/default_avatar.png"}
                                alt={userData.imageUrl || "/images/default_avatar.png"}
                            />
                            {userData.imageUrl && 
                                <Tooltip title="Remove" sx={{ position: "absolute", top: -10, right: -10 }}>
                                    <IconButton>
                                        <DeleteForever color="error"/>
                                    </IconButton>
                                </Tooltip>
                            }
                        </Box>
                    </Box>
                )}


                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mt={4}>

                    <Button
                        fullWidth
                        disabled={!modalState.isChange}
                        color="success"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>

                    <Button
                        fullWidth
                        color="error"
                        variant="outlined"
                        onClick={() => {
                            changeModalState("isChange", false)
                            changeModalState("open", false)
                        }}
                    >
                        Cancel
                    </Button>

                </Box>
            </Box>
        </Modal>
    </>
  );
};