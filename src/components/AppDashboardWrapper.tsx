import { borderRadius } from "@/constants/constants"
import { Box } from "@mui/material"


export const AppDashboardWrapper = ({ children } : { children: React.ReactNode }) => {
  return <Box boxShadow={3} borderRadius={borderRadius} width="100%" mx={2} p={2} color="black">{children}</Box>

};