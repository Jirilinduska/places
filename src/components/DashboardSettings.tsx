import { Box, Button, Skeleton, Typography } from "@mui/material"
import { ModalChangeUserData } from "./ModalChangeUserData"

type Props = {
    loading?: boolean
    toggleChange?: () => void
}

export const DashboardSettings = ({ loading, toggleChange } : Props) => {

    if(loading) {
        return (
          <Box color="black">
            <Skeleton variant="text" sx={{ fontSize: 20, mb: 1 }} />
          </Box>
        )
      }
    
    return (
        <Box color="black">
            <Typography textAlign="center" mb={2} fontWeight={600}>Settings</Typography>
        
            <Box mb={2}>
                <ModalChangeUserData username toggleChange={toggleChange}/>
            </Box>
            
            <Box mb={2}>
                <ModalChangeUserData profileImg toggleChange={toggleChange}/>
            </Box>

            <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
                <Typography>Theme</Typography>
                <Button>Change theme</Button>
            </Box>
    
        </Box>
    )
};