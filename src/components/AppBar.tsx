import { Box, Typography } from "@mui/material";
import Link from "next/link"
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

export const AppBar = () => {
  return (
    <Box
        position="fixed"
        bgcolor="black"
        top={0}
        left={{ xs: 0, sm: "50%" }}
        width={{ xs: "100%", sm: "55%", lg: "25%"  }}
        height="80px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
        zIndex={100}
        sx={{
            transform: {
              xs: "translateX(0)",   // pro mobil
              md: "translateX(-50%)" // pro větší obrazovky
            },
            borderBottomLeftRadius: "50%",
            borderBottomRightRadius: "50%",
        }}
    >

        <Link href="/" className="flex flex-col items-center gap-1">
            <DashboardIcon />
            <Typography fontSize="12px">Dashboard</Typography>
        </Link>

        <Link href="/feed" className="flex flex-col items-center gap-1">
            <FeedIcon />
            <Typography fontSize="12px">Feed</Typography>
        </Link>

        <Link href="/profile" className="flex flex-col items-center gap-1">
            <PermContactCalendarIcon />
            <Typography fontSize="12px">Profile</Typography>
        </Link>

    </Box>
  );
};
