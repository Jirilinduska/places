"use client";

import { borderRadius } from "@/constants/constants"
import { Box, Divider, Typography } from "@mui/material";
import { useRouter } from "next/navigation"
import { TimeAgo } from "./TimeAgo"
import { ButtonWithModal } from "./ButtonWithModal"
import { useState } from "react"
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { markErrLogAsSolved } from "@/app/actions"
import { useSnackbar } from "notistack"

const ITEM_WIDHT = 110

type Props = {
    _id: string;
    message: string;
    route?: string;
    component?: string;
    action?: string;
    userID?: string;
    input?: any;
    url?: string;
    env: string;
    createdAt: Date;
    isSolved: boolean
    showFull?: boolean
}

export const ErrorLogItem = ({ _id, createdAt, env, message, action, component, input, route, url, userID, isSolved, showFull } : Props) => {

    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [loading, setLoading] = useState(false)
    const [solved, setSolved] = useState(isSolved)

    const handleRedirect = () => router.push(`/app-dashboard/errors/${_id}`)

    const handleSolve = async() => {
        setLoading(true)
        const result = await markErrLogAsSolved(_id)
        if(!result.success) {
            setLoading(false)
            enqueueSnackbar(result.errMsg, { variant: "error" })
            return
        }
        setSolved(true)
        enqueueSnackbar("Error log updated", { variant: "success" })
        setLoading(false)
    }


    if(!showFull) {
        return (
            <Box 
                onClick={handleRedirect} 
                sx={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }} 
                boxShadow={3} 
                borderRadius={borderRadius} 
                p={2} 
                mb={2}
            >
                <Box>
                    <Typography>{message}</Typography>
                    <TimeAgo date={createdAt}/>
                </Box>
                <Typography fontWeight={600} color={isSolved ? "success" : "error"}>{isSolved ? "SOLVED" : "UNSOLVED"}</Typography>
            </Box>
        )
    }

  return (
    <Box p={2} mb={4}>

        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center">
                <Typography width={ITEM_WIDHT} fontWeight={600}>
                    ErrorLog ID:
                </Typography>
                <Typography>{_id}</Typography>
            </Box>
            <Typography color={solved ? "success" : "error"} fontWeight={600}>
                {solved ? "SOLVED": "UNSOLVED"}
            </Typography>
        </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Message:
        </Typography>
        <Typography>{message}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Environment:
        </Typography>
        <Typography>{env}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Timestamp:
        </Typography>
        <Typography>{createdAt.toLocaleString()}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Route:
        </Typography>
        <Typography>{route || ""}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Component:
        </Typography>
        <Typography>{component || ""}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Action:
        </Typography>
        <Typography>{action || ""}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          UserID:
        </Typography>
        <Typography>{userID || ""}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Url:
        </Typography>
        <Typography>{url || ""}</Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <Box display="flex" alignItems="center">
        <Typography width={ITEM_WIDHT} fontWeight={600}>
          Input:
        </Typography>
        <Typography>
          {input
            ? JSON.stringify(input, null, 2)
            : "{}"}
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {showFull && !solved &&(
        <Box mt={4}>
            <ButtonWithModal 
                btnTitle="Mark as solved"
                color="success"
                modalTitle="Mark this error log as solved?"
                onDelete={handleSolve}
                icon={<DoneAllIcon/>}
                loading={loading}
            />
        </Box>
      )}
    </Box>
  );
};
