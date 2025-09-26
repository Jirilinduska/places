"use client";

import { IconButton, Tooltip } from "@mui/material"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ModalAreYouSure } from "./ModalAreYouSure"
import { useState } from "react"
import { deletePost } from "@/app/actions"
import { useSnackbar } from "notistack"
import { useRouter } from "next/navigation"

type Props = {
    tooltipBtn: string
    modalTitle: string
    deleteID: string
    deleteOperation: "delete_post" | "delete_report"
}

export const ButtonIconDelete = ({ tooltipBtn, modalTitle, deleteID, deleteOperation } : Props ) => {

    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = async() => {
        setLoading(true)

        if(deleteOperation === "delete_post") {
            const res = await deletePost(deleteID)
            if(res.success) {
                enqueueSnackbar("Post deleted", { variant: "success" })
                setOpen(false)
                router.push("/feed")
            } else {
                enqueueSnackbar(res.errMsg, { variant: "error" })
            } 
        }

        setLoading(false)
    }

  return (
    <>
        <Tooltip title={tooltipBtn}>
            <IconButton loading={loading} onClick={() => setOpen(true)}>
                <DeleteForeverIcon color="error" />
            </IconButton>
        </Tooltip>

        <ModalAreYouSure 
            open={open}
            onClose={() => setOpen(false)}
            onDecline={() => setOpen(false)}
            onSubmit={handleDelete}
            title={modalTitle}
            loading={loading}
        />
    </>
  );
};