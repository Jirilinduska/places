"use client"

import { ReportReason, ResolveReport } from "@/interfaces/interfaces"
import { Box, Button, TextField, Typography } from "@mui/material"
import { TimeAgo } from "./TimeAgo"
import { borderRadius } from "@/constants/constants"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { resolveReport } from "@/app/actions"
import { useSnackbar } from "notistack"
import { UserBadge } from "./UserBadge"
import { useAuth } from "@clerk/nextjs"

type Props = {
    reportID: string
    createdAt: string
    isSolved: boolean
    reason: ReportReason
    isJustPreview?: boolean
    postID?: string
    reportedBy?: string
    comment?: string
    commentSolvedBy?: string
    solvedByUserID?: string
}

export const ReportItem = ({ reportID, createdAt, isSolved, reason, isJustPreview, postID, reportedBy, comment, commentSolvedBy, solvedByUserID } : Props) => {

    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const { userId } = useAuth()

    const [data, setData] = useState({
        solved: isSolved,
        solvedComment: commentSolvedBy || "",
        errMsg: "",
        solvedByUserID: solvedByUserID || ""
    })

    const handleResolve = async(resolved: ResolveReport) => {
        if(!userId) return
        if(!data.solvedComment) {
            setData((prev) => ({...prev, errMsg: "Please enter comment"}))
            return
        }
        const result = await resolveReport(reportID, resolved, data.solvedComment)
        if(result?.success) {
            enqueueSnackbar("Report resolved", { variant: "success" })
            setData((prev) => ({...prev, errMsg: "", solved: true, solvedByUserID: userId }))
        } else {
            enqueueSnackbar(result?.errMsg, { variant: "error" })
        }
    }

    const handleClick = () => {
        if(!isJustPreview) return
        router.push(`/app-dashboard/reports/${reportID}`)
    }

  return (
    <Box 
        boxShadow={3} 
        mb={2} 
        p={2} 
        borderRadius={borderRadius}
        sx={{ cursor: isJustPreview ? "pointer" : "" }}
        onClick={(e) => {
            e.stopPropagation()
            handleClick()
        }}
    >
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box>
                <Typography fontSize={14}>Report ID: {reportID}</Typography>
                <Typography fontSize={14}>Reason: {reason}</Typography>
            </Box>
            <Box>
                {!data.solved &&
                    <Box component="span" fontSize={12} display="flex" alignItems="center" gap={0.5}>
                        Reported 
                        <TimeAgo date={new Date(createdAt)}/>
                    </Box>
                }
                <Typography fontWeight={600} color={data.solved ? "success" : "error"}>{data.solved ? "SOLVED" : "UNSOLVED"}</Typography>
            </Box>
        </Box>

        {!isJustPreview && (
            <Box mt={2}>
                <Box mb={2}>
                    <Typography fontSize={12} fontWeight={600}>Comment from user:</Typography>
                    <Typography fontSize={12}>{comment || "there is no comment from user"}</Typography>
                </Box>

                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Box>
                        <Button
                            href={`/post/${postID}`}
                            target="_blank"
                            sx={{ display: "block", mb: 1 }}
                            size="small"
                            variant="outlined"
                        >
                            Reported Post
                        </Button>
                        <Button
                            href={`/profile/${reportedBy}`}
                            target="_blank"
                            size="small"
                            variant="outlined"
                        >
                            Reported By
                        </Button>
                    </Box>

                    {!data.solved && 
                        <Box>
                            <Button
                                sx={{ display: "block", mb: 1 }}
                                size="small"
                                variant="contained"
                                color="error"
                                onClick={() => handleResolve("delete_post")}
                            >
                                Delete post 
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={() => handleResolve("keep_post")}
                            >
                                Keep post
                            </Button>
                        </Box>
                    }

                </Box>

                <Box mt={4} mb={2}>
                    {data.solved
                        ? (
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography>{data.solvedComment}</Typography>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Typography>Resolved by:</Typography>
                                    {data.solvedByUserID && <UserBadge userID={data.solvedByUserID} hideImg />}
                                </Box>
                            </Box>
                        )
                        : <TextField 
                            value={data.solvedComment} 
                            onChange={(e) => setData((prev) => ({...prev, solvedComment: e.target.value }))}
                            error={data.errMsg !== ""}
                            helperText={data.errMsg}
                            fullWidth
                            size="small"
                            label="Enter comment before resolving"
                          />
                    }
                </Box>

            </Box>
        )}
    </Box>
  );
};