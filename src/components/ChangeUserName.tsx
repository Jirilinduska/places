"use client";

import { changeUsernameClerk } from "@/app/actions"
import { useUser } from "@clerk/nextjs"
import { Edit } from "@mui/icons-material"
import { Box, Button, Divider, IconButton, TextField, Tooltip, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useSnackbar } from "notistack"
import { useEffect, useState } from "react"

export const ChangeUserName = () => {

    const { user } = useUser()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()

    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)

    const handleSave = async() => {
        if(!user) return 
        setLoading(true)
        const result = await changeUsernameClerk(user.id, username)
        if(result.success) {
            enqueueSnackbar("Username changed", { variant: "success" })
            setEdit(false)
            await user.reload()
            router.refresh()
        } else {
             enqueueSnackbar(result.errMsg, { variant: "error" })
        }
        setLoading(false)
    }

    useEffect(() => {
        if(!user) return
        setUsername(user.username || "")
    }, [user])

    if(!user) return // TODO

  return (
    <Box width="100%">
            {edit
            ? (
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} gap={2}>
                    <TextField 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        label="Username"
                        size="small"
                        disabled={loading}
                        fullWidth
                    /> 
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            loading={loading}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            loading={loading}
                            onClick={() => {
                                setUsername(user.username || "")
                                setEdit(false)
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            )
            : (
                <Box mb={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography fontSize={12}>Username: {username}</Typography>
                        <Tooltip title="Edit">
                            <IconButton onClick={() => setEdit(true)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Divider />
                </Box>
            )
        }
    </Box>
  );
};