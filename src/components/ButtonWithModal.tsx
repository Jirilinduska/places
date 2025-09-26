


"use client";

import { Button } from "@mui/material"
import { useState } from "react"
import { ModalAreYouSure } from "./ModalAreYouSure"

type Props = {
    onDelete: () => void
    loading?: boolean
    btnTitle: string
    modalTitle: string
    icon?: React.ReactNode
    color: "error" | "info" | "success" | "warning"
}

export const ButtonWithModal = ({ onDelete, loading, btnTitle, modalTitle, icon, color } : Props) => {

    const [open, setOpen] = useState(false)
    const toggleOpen = () => setOpen(prev => !prev)

  return (
    <>
        <ModalAreYouSure
            onClose={toggleOpen}
            onDecline={toggleOpen}
            onSubmit={onDelete}
            open={open}
            title={modalTitle}
            loading={loading}
        />

        <Button
            color={color}
            variant="contained"
            size="small"
            onClick={toggleOpen}
            loading={loading}
            startIcon={icon}
        >
            {btnTitle}
        </Button>
    </>
  );
};