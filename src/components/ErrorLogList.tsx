"use client"

import { IErrorLog } from "@/interfaces/interfaces"
import { Box, Button } from "@mui/material"
import { useState } from "react"
import { ErrorLogItem } from "./ErrorLogItem"
import { getErrorLogs } from "@/app/actions"
import { useSnackbar } from "notistack"


type Props = {
    initialErrors: IErrorLog[]
}

export const ErrorLogList = ({ initialErrors } : Props) => {

    const { enqueueSnackbar } = useSnackbar()
    const [errs, setErrs] = useState(initialErrors)
    const [skip, setSkip] = useState(initialErrors.length)
    const [loading, setLoading] = useState(false)
    const [noMore, setNoMore] = useState(false)

    const handleShowMore = async () => {
        setLoading(true)
        const result = await getErrorLogs(5, skip)
        if(!result.success) {
            enqueueSnackbar(result.errMsg, { variant: "error" })
            setLoading(false)
            return
        } else {
            if (result.errs.length === 0) {
                setLoading(false)
                setNoMore(true)
                return
            }
            setErrs(prev => [...prev, ...result.errs || []])
            setSkip(prev => prev + (result.errs.length || 0))
            setLoading(false)
        }
    }

  return (
    <Box>
        {errs.map(x => 
            <ErrorLogItem 
                key={x._id} 
                _id={x._id || ""}
                createdAt={x.createdAt}
                env={x.env}
                message={x.message}
                action={x.context.action}
                component={x.context.component}
                input={x.context.input}
                route={x.context.route}
                url={x.context.url}
                userID={x.context.userID}
                isSolved={x.isSolved}
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