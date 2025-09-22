import { Box, Button, Modal, Typography } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 150,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

type Props = {
    open: boolean
    title: string
    onClose: () => void
    onSubmit: () => void
    onDecline: () => void
    loading?: boolean
}

export const ModalAreYouSure = ({ open, title, onClose, onSubmit, onDecline, loading } : Props) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box sx={style}>
            <Typography fontWeight={600} color="black" textAlign="center">{title}</Typography>
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2} mt={4}>
                <Button
                    fullWidth
                    color="success"
                    variant="contained"
                    onClick={onSubmit}
                    loading={loading}
                >
                    Yes
                </Button>
                <Button
                    fullWidth
                    color="error"
                    variant="outlined"
                    onClick={onDecline}
                    loading={loading}
                >
                    No
                </Button>
            </Box>
        </Box>
    </Modal>
  );
};