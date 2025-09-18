"use client";

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import { Delete, Edit, Report, Share } from "@mui/icons-material"
import { isContentMine } from "@/helpers/isContentMine"
import { useAuth } from "@clerk/nextjs"
import { useSnackbar } from "notistack"

const appURL = process.env.NEXT_PUBLIC_APP_URL!

export const PostMenu = ({ postID, createdBy } : { postID: string, createdBy: string }) => {

    const { userId } = useAuth()
    const { enqueueSnackbar } = useSnackbar()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl)
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleCopy = async() => {
        try {
            await navigator.clipboard.writeText(`${appURL}/post/${postID}`)
            enqueueSnackbar("Post URL copied", { variant: "success" })
            handleClose()
        } catch (error) {
            enqueueSnackbar("Something went wrong.", { variant: "error" })
        }
    }
    

  return (
    <>
        <IconButton
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
        >
            <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
                list: {
                    'aria-labelledby': 'basic-button',
                },
            }}
        >
            <MenuItem onClick={handleCopy}>
                <ListItemIcon>
                    <Share fontSize="small" />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
            </MenuItem>

            {userId && isContentMine(userId, createdBy) && 
                <>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Edit fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText className="text-black">Edit</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Delete fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText className="text-red-500">Delete</ListItemText>
                    </MenuItem>
                </>

            }

            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Report fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText className="text-red-500">Report</ListItemText>
            </MenuItem>
      </Menu>
    </>
  );
};