"use client";

import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react"
import { Delete, Edit, Report, Share } from "@mui/icons-material"
import { isContentMine } from "@/helpers/isContentMine"
import { useAuth } from "@clerk/nextjs"
import { useSnackbar } from "notistack"
import { ModalAreYouSure } from "./ModalAreYouSure"
import { useRouter } from "next/navigation"
import { ModalCreateReport } from "./ModalCreateReport"
import { appURL } from "@/constants/constants"

type Props = {
    postID: string, 
    createdBy: string
    onDelete: () => Promise<void>
    loading?: boolean    
}

export const PostMenu = ({ postID, createdBy, onDelete, loading } : Props) => {

    const { userId } = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const [deleteModal, setDeleteModal] = useState(false)
    const [reportModal, setReportModal] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const toggleDeleteModal = () => setDeleteModal(prev => !prev)
    const toggleReportModal = () => setReportModal(prev => !prev)
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    const handleCopyClick = async() => {
        try {
            await navigator.clipboard.writeText(`${appURL}/post/${postID}`)
            enqueueSnackbar("Post URL copied", { variant: "success" })
            handleClose()
        } catch (error) {
            enqueueSnackbar("Something went wrong.", { variant: "error" })
        }
    }

    const handleDeleteClick = () => {
        handleClose()
        toggleDeleteModal()
    }

    const handleEditClick = () => {
        handleClose()
        router.push(`/post/${postID}/edit`)
    }

    const handleReportClick = () => {
        handleClose()
        toggleReportModal()
    }
    

  return (
    <>

        <ModalAreYouSure 
            open={deleteModal} 
            onClose={toggleDeleteModal}
            onDecline={toggleDeleteModal}
            onSubmit={onDelete}
            title="Delete this post?"
            loading={loading}
        />

        <ModalCreateReport
            onClose={toggleReportModal}
            open={reportModal}
            postID={postID}
        />


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
            <MenuItem onClick={handleCopyClick}>
                <ListItemIcon>
                    <Share fontSize="small" />
                </ListItemIcon>
                <ListItemText>Share</ListItemText>
            </MenuItem>

            {userId && isContentMine(userId, createdBy) && 
                    <MenuItem onClick={handleEditClick}>
                        <ListItemIcon>
                            <Edit fontSize="small" color="action" />
                        </ListItemIcon>
                        <ListItemText className="text-black">Edit</ListItemText>
                    </MenuItem>
            }

            {userId && isContentMine(userId, createdBy) && 
                    <MenuItem onClick={handleDeleteClick}>
                    <ListItemIcon>
                        <Delete fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText className="text-red-500">Delete</ListItemText>
                </MenuItem>
            }

            <MenuItem onClick={handleReportClick}>
                <ListItemIcon>
                    <Report fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText className="text-red-500">Report</ListItemText>
            </MenuItem>
      </Menu>
    </>
  );
};