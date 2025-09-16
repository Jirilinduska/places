import { borderRadius } from "@/constants/constants"
import { Box, Typography } from "@mui/material"

type Props = {
    title: string
    amount: number
    bgColor: string,
    pinColor: string
}

export const DashboardItem = ({ title, amount, bgColor, pinColor }: Props) => {
    return (
      <Box
        bgcolor={bgColor}
        width={{ xs: "100%", lg: "250px" }}
        height={{ xs: "50px", lg: "100px" }}
        display="flex"
        borderRadius={borderRadius}
        overflow="hidden"
        border="2px solid black"
        color="black"
      >
        <Box
          width="8px"
          height="100%"
          bgcolor={pinColor}
          sx={{
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
          }}
        ></Box>
        <Box p={2} display="flex" width="100%" flexDirection={{ xs: "row", lg: "column" }} justifyContent={{ xs: "space-between", lg: "center" }} alignItems={{ xs: "center", lg: "start" }}>
          <Typography fontWeight={700} fontSize={{ xs: "14px", lg: "16px" }} mb={1}>{title}</Typography>
          <Typography fontWeight={600} fontSize={{ xs: "16px", lg: "20px" }}>{amount}</Typography>
        </Box>
      </Box>
    )
}