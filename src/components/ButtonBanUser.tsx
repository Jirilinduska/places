"use client"

import { Button, Tooltip } from "@mui/material"
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { banUser, unbanUser } from "@/app/actions"
import { useSnackbar } from "notistack"

type Props = {
    isBanned: boolean 
    userID: string
    handleSetBan: (value: boolean) => void
}

export const ButtonBanUser = ({ isBanned, userID, handleSetBan } : Props) => {

    const { enqueueSnackbar } = useSnackbar()

    const handleBanClick = async() => {
        if(!isBanned) {
            const result = await banUser(userID)
            if(result?.success) {
                enqueueSnackbar("User has been banned", { variant: "success" })
                handleSetBan(true)
            } else {
                enqueueSnackbar(result?.errMsg, { variant: "error" })
            }
        } else if(isBanned) {
            const result = await unbanUser(userID)
            if(result.success) {
                enqueueSnackbar("User has been unbanned", { variant: "success" })
                handleSetBan(false)
            } else {
                enqueueSnackbar(result.errMsg, { variant: "error" })
            }
        }
    }

  return (
    <Tooltip title={isBanned ? "Unban user" : "Ban user"}>
        <Button 
            onClick={handleBanClick}
            startIcon={
                isBanned
                    ? <LockOpenIcon fontSize="small"/>
                    : <BlockIcon fontSize="small" />
                }
            size="small"
            color="error"
            variant="contained"
        >
            {isBanned ? "Unban user" : "Ban user"}
        </Button>

    </Tooltip>
  );
};