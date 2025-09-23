"use client";

import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, IconButton, Modal, Tooltip, Typography } from "@mui/material"
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

export const ModalChangeProfileBg = ({ userId } : { userId: string }) => {

    const [open, setOpen] = useState(false)
    const [isChange, setIsChange] = useState(false)

    const handleSubmit = async() => {

    }

  return (
    <>
        <Tooltip title="Change background">
            <IconButton onClick={() => setOpen(true)}>
                <ImageIcon fontSize="large" className='text-white' />
            </IconButton>
        </Tooltip>

        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <Typography mb={4} fontWeight={600} color="black" textAlign="center">Change background</Typography>


                <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mt={4}>
                    <Button
                        fullWidth
                        disabled={!isChange}
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
                            setIsChange(false)
                            setOpen(false)
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