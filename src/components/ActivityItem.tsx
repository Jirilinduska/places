
import { IActivityWithID } from "@/interfaces/interfaces"
import { Box, Button, Typography } from "@mui/material"
import { UserBadge } from "./UserBadge"
import { TimeAgo } from "./TimeAgo"

export const ActivityItem = ({ data } : { data: IActivityWithID }) => {

    const handleText = () => {
        let value: string
        switch (data.activity) {
            case "report_post":
                value = "Reported post"
                break;
            case "upload_post":
                value = "Uploaded new post"
                break;
            default:
                value = ""
                break;
        } 
        return value 
    }

    const handleButton = () => {
        if(data.activity === "report_post") {
            return (
                <Button
                    href={`/app-dashboard/reports/${data.reportID}`}
                    size="small"
                    target="_blank"
                    fullWidth
                >
                    Show report
                </Button> 
            )
        }
        if(data.activity === "upload_post") {
            return (
                <Button
                    href={`/post/${data.postID}`}
                    size="small"
                    target="_blank"
                    fullWidth
                >
                    Show post
                </Button> 
            )
        }
    }

  return (
    <Box display="flex" alignItems="center" gap={4} mb={0.5}>
        <Box width={200}>
            <UserBadge userID={data.userID} />
        </Box>
        <Typography width={200}>
            {handleText()}
        </Typography>
        <Box width={140}>
            {handleButton()}
        </Box>
        <TimeAgo date={data.createdAt} />
    </Box>
  );
};