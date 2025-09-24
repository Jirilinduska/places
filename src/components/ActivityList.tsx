"use client"

import { IActivityWithID } from "@/interfaces/interfaces"
import { Box, Button } from "@mui/material"
import { useState } from "react"
import { ActivityItem } from "./ActivityItem"
import { getActivities } from "@/app/actions"

type Props = {
    initialActivity: IActivityWithID[]
}

export const ActivityList = ({ initialActivity } : Props) => {

    const [activity, SetActivity] = useState(initialActivity)
    const [skip, setSkip] = useState(initialActivity.length)
    const [loading, setLoading] = useState(false)
    const [noMore, setNoMore] = useState(false)

    const handleShowMore = async () => {
        setLoading(true)
        const result = await getActivities(5, skip)
        if(result.success) {
            if (result.activities?.length === 0) {
                setLoading(false)
                setNoMore(true)
                return
            }
            SetActivity(prev => [...prev, ...result.activities || []])
            setSkip(prev => prev + (result.activities?.length || 0))
        }
        setLoading(false)
    }

  return (
    <Box>
        {activity.map(x => 
            <ActivityItem
                key={x._id}
                data={x}
            />
        )}

        <Button
            variant="contained"
            onClick={handleShowMore}
            disabled={noMore}
            loading={loading}
            sx={{ mt: 2 }}
        >
            {loading ? "Loading..." : "Show more"}
        </Button>
    </Box> 
  );
};