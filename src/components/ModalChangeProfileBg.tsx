"use client";

import { updateProfileBg } from '@/app/actions'
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, IconButton, Modal, Tooltip, Typography } from "@mui/material"
import { useSnackbar } from 'notistack'
import { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: 400, sm: 600 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

type Props = {
    userId: string,
    bgImages: string[]
    currentBG: string
    handleSetCurrentBG: (url: string) => void
}

export const ModalChangeProfileBg = ({ userId, bgImages, currentBG, handleSetCurrentBG } : Props) => {

    const { enqueueSnackbar } = useSnackbar()

    const [state, setState] = useState({
        open: false,
        isSelected: currentBG,
        isChange: false,
        loading: false
    })

    const handleChange = (value: "open" | "isSelected" | "isChange" | "loading", newValue: unknown) => {
        setState((prev) => ({...prev, [value]: newValue}))
    }

    const handleSubmit = async() => {
        handleChange("loading", true)
        const { success, errMsg } = await updateProfileBg(userId, state.isSelected)
        if(success) {
            enqueueSnackbar("Image updated", { variant: "success" })
            handleSetCurrentBG(state.isSelected)
            handleChange("open", false)
        } else {
            enqueueSnackbar(errMsg, { variant: "error" })
        }
        handleChange("loading", false)
    }

  return (
    <>
        <Tooltip title="Change background">
            <IconButton onClick={() => handleChange("open", true)}>
                <ImageIcon fontSize="large" className='text-black' />
            </IconButton>
        </Tooltip>

        <Modal open={state.open} onClose={() => handleChange("open", false)}>
            <Box sx={style}>
                <Typography mb={4} fontWeight={600} color="black" textAlign="center">Change background</Typography>

                <Box display="flex" alignItems="center" gap={2}>
                    {bgImages.map((x,i) => (
                        <Box 
                            width={100} 
                            height={100} 
                            position="relative" 
                            key={i} 
                            border={state.isSelected === x ? "2px solid red" : "1px solid black"} 
                            sx={{ cursor: "pointer" }}
                            onClick={() => {
                                handleChange("isChange", true)
                                handleChange("isSelected", x)
                            }}
                        >
                            <Box width="100%" height="100%" overflow="hidden">
                                <img
                                    src={x}
                                    alt={x}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            </Box>
                        </Box>
                    ))}
                </Box>

                                
                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mt={4}>
                    <Button
                        fullWidth
                        disabled={!state.isChange}
                        loading={state.loading}
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
                        loading={state.loading}
                        onClick={() => {
                            handleChange("isChange", false)
                            handleChange("open", false)
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