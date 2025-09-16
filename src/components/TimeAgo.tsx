import { Typography } from "@mui/material"
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const TimeAgo = ({ date } : { date: Date }) => {
    dayjs.extend(relativeTime)
    return <Typography fontSize={12}>{dayjs().to(date)}</Typography>
}