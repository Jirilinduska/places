import { IconButton, Tooltip } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const ButtonOpenInNewTab = ({ href, title } : { href: string, title?: string }) => {
  return (
    <Tooltip title={title || "Open in new tab"}>
      <IconButton href={href} target="_blank">
        <OpenInNewIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
