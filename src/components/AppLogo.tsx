import { Box, Typography } from "@mui/material"
import Link from "next/link"


type Props = {
    hideLink?: boolean
}

export default function AppLogo({ hideLink } : Props) {

    if(hideLink) return (
        <Box>
            <Box className="flex items-center gap-2">
                <img 
                    width={40} 
                    height={40}
                    className="rounded-full"
                    src="/images/earth_logo.png"
                    alt="PlacesBeen"
                />
                <Typography fontWeight={600}>PlacesBeen</Typography>
            </Box>
        </Box>
    )

  return (
    <Box>
        <Link href="/" className="flex items-center gap-2">
            <img 
                width={40} 
                height={40}
                className="rounded-full"
                src="/images/earth_logo.png"
                alt="PlacesBeen"
            />
            <Typography fontWeight={600}>PlacesBeen</Typography>
        </Link>
    </Box>
  );
}