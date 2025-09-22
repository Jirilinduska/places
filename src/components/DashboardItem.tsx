import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { ButtonOpenInNewTab } from "./ButtonOpenInNewTab"
import MapIcon from '@mui/icons-material/Map';


type Props = {
    title: string
    amount?: number
    pinColor: "red" | "black"
    href: string
    openButtonTitle?: string
    onTitleClick?:() => void
    wantClick?: boolean
}

export const DashboardItem = ({ title, amount, pinColor, href, openButtonTitle, onTitleClick, wantClick }: Props) => {

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">

      <Box display="flex" alignItems="center" gap={1}>
        <Box width={20} height={20}>
          <img 
            className="w-full h-full"
            alt="pin"
            src={pinColor === "black" ? "/images/black_pin.png" : "/images/red_pin.png"}
          />
        </Box>
        <Typography fontSize={16}>{title}</Typography>
      </Box>
    
      <Box display="flex" alignItems="center" gap={1}>
        {wantClick && (
          <Tooltip title="Show on map">
            <IconButton 
              onClick={() => {
                if(wantClick && onTitleClick) {
                  onTitleClick()
                }
              }}
            >
              <MapIcon />
            </IconButton>
          </Tooltip>
        )}
        {amount && <Typography fontSize={16}>{amount}</Typography>}
        <ButtonOpenInNewTab href={href} title={openButtonTitle} />
      </Box>
    </Box>
  )
}