"use client";

import { appURL } from '@/constants/constants'
import ShareIcon from '@mui/icons-material/Share';
import { IconButton, Tooltip } from '@mui/material'
import { useSnackbar } from 'notistack'

type Props = {
    successSnackbarMsg: string
    url: string
}

export const ButtonShare = ({ successSnackbarMsg, url } : Props) => {

    const { enqueueSnackbar } = useSnackbar()

    const handleShare = async() => {
        try {
            await navigator.clipboard.writeText(`${appURL}/${url}`)
            enqueueSnackbar(successSnackbarMsg, { variant: "success" })
        } catch (error) {
            enqueueSnackbar("Something went wrong.", { variant: "error" })
        }
    }

  return (
    <Tooltip title="Share">
        <IconButton onClick={handleShare}>
            <ShareIcon />
        </IconButton>
    </Tooltip>
  );
};