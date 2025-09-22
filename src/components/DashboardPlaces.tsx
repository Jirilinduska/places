import { DashboardValues, IPinsWithPopup } from "@/interfaces/interfaces"
import { Box, Skeleton, Typography } from "@mui/material"
import { DashboardItem } from "./DashboardItem"
import { useState } from "react"

type Props = {
    loading?: boolean
    pinsOnMap: IPinsWithPopup[]
    dashboardValue: DashboardValues
    onTitleClick:(item: IPinsWithPopup) => void
}

export const DashboardPlaces = ({ loading, pinsOnMap, dashboardValue, onTitleClick } : Props) => {

    if(loading) {
      return (
        <Box color="black">
          <Skeleton variant="text" sx={{ fontSize: 20, mb: 1 }} />
          <Skeleton variant="text" sx={{ fontSize: 20, mb: 1 }} />
          <Skeleton variant="text" sx={{ fontSize: 20, mb: 1 }} />
          <Skeleton variant="text" sx={{ fontSize: 20, mb: 1 }} />
        </Box>
      )
    }
  
    return (
      <Box color="black">
  
        <Typography textAlign="center" mb={2} fontWeight={600}>
          {dashboardValue === "_visited_" && "Visited places"}
          {dashboardValue === "_want_visit_" && "Places to visit"}
        </Typography>

        <Box>
          {pinsOnMap.map(x => 
            <DashboardItem 
              key={x._id}
              title={x.placeTitle}
              href={`/post/${x._id}`}
              pinColor={dashboardValue === "_visited_" ? "red" : "black"}
              openButtonTitle="Show this post"
              onTitleClick={() => onTitleClick(x)}
              wantClick
            />)
          }
        </Box>
  
      </Box>
    );
  };