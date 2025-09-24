"use client";

import { IReport, ReportReason } from "@/interfaces/interfaces"
import { Box, Button } from "@mui/material"
import { useState } from "react"
import { ReportItem } from "./ReportItem"
import { getReports } from "@/app/actions"

type InitialReport = {
    _id: string,
    reason: ReportReason,
    isSolved: boolean,
    createdAt: string
}

type Props = {
    initialReports: IReport[]
}

export const ReportList = ({ initialReports } : Props) => {

    const [reports, setReports] = useState(initialReports)
    const [skip, setSkip] = useState(initialReports.length)
    const [loading, setLoading] = useState(false)
    const [noMore, setNoMore] = useState(false)

    const handleShowMore = async () => {
        setLoading(true)
        const result = await getReports(5, skip)
        if(result.success) {
            if (result.reports?.length === 0) {
                setLoading(false)
                setNoMore(true)
                return
            }
            setReports(prev => [...prev, ...result.reports || []])
            setSkip(prev => prev + (result.reports?.length || 0))
        }
        setLoading(false)
    }

  return (
    <Box>
        {reports.map(x => 
            <ReportItem 
                key={x._id} 
                reportID={x._id}
                createdAt={x.createdAt.toString()}
                isSolved={x.isSolved} 
                reason={x.reason}   
                isJustPreview
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