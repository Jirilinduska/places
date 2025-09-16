"use client";

import { Box } from "@mui/material"
import { DashboardItem } from "./DashboardItem"

type Props = {
    placesBeen: number
    placesWantVisit: number
}

export const DashboardStats = ({ placesBeen, placesWantVisit } : Props) => {
  return (
    <Box p={4} width={{ xs: "100%", lg: "50%" }} height="600px" display="flex" gap={2} flexDirection={{ xs: "column", lg: "row" }}>
        <DashboardItem amount={placesBeen} title="Places visited" bgColor="white" pinColor="red" />
        <DashboardItem amount={0.00} title="Places visited this year" bgColor="white" pinColor="red" />
        <DashboardItem amount={placesWantVisit} title="Places to visit" bgColor="white" pinColor="black" />
    </Box>
  );
};