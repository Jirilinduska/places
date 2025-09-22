"use client";

import { Box, Skeleton, Typography } from "@mui/material"
import { DashboardItem } from "./DashboardItem"
import { useAuth, useUser } from "@clerk/nextjs"

type Props = {
    placesBeen: number | null
    placesWantVisit: number | null
    loading?: boolean
    placesBeenThisYear: number | null
    placesBeenLastYear: number | null
}

export const DashboardStats = ({ placesBeen, placesWantVisit, loading, placesBeenLastYear, placesBeenThisYear } : Props) => {

  const { userId } = useAuth()
  const { user } = useUser()

  const thisYear = new Date().getFullYear()
  const lastYear = new Date().getFullYear() - 1

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

      <Typography textAlign="center" mb={2} fontWeight={600}>Welcome back, {user?.username}!</Typography>

      <DashboardItem
        amount={placesBeen || 0}
        href={`/profile/${userId}/been`}
        pinColor="red"
        title="Places visited"
        openButtonTitle="Show visited posts"
      />

      <DashboardItem
        amount={placesBeenThisYear || 0}
        href={`/profile/${userId}/been/${thisYear}`}
        pinColor="red"
        title={`Places visited (${thisYear})`}
        openButtonTitle={`Show visited posts (${thisYear})`}
      />

      <DashboardItem
        amount={placesBeenLastYear || 0}
        href={`/profile/${userId}/been/${lastYear}`}
        pinColor="red"
        title={`Places visited (${lastYear})`}
        openButtonTitle={`Show visited posts (${lastYear})`}
      />

      <DashboardItem
        amount={placesWantVisit || 0}
        href={`/profile/${userId}/been`}
        pinColor="black"
        title="Places to visit"
      />

    </Box>
  );
};