"use client"

import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useRouter } from "next/navigation"

type Props = {
    icon: React.ReactNode
    mainTitle: string
    subTitle: string
    buttonText: string
    routerPushUrl?: string
    onClick?: () => void 
}

export const AppDashboardItem = ({ icon, mainTitle, subTitle, routerPushUrl, buttonText, onClick } : Props) => {

    const router = useRouter()

    const handleClick = () => {
        if(routerPushUrl) {
            router.push(routerPushUrl)
        } else if (onClick)
            onClick()
    }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>{icon}</Box>
        <Typography mb={1} textAlign="center" variant="h4" component="div">{mainTitle}</Typography>
        <Typography mb={2} fontSize={14} textAlign="center" >{subTitle}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small">{buttonText}</Button>
      </CardActions>
    </Card>
  );
};