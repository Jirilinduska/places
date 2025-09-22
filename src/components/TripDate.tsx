import { Box, Typography } from "@mui/material"
import EventIcon from '@mui/icons-material/Event';


export const TripDate = ({ tripDate } : { tripDate: Date }) => {
  return (
    <Box display="flex" alignItems="center" mt={1}>
        <EventIcon fontSize="small"/>
        <Typography fontSize="12px">Trip date: {tripDate.toLocaleDateString()}</Typography>
  </Box>
  );
};