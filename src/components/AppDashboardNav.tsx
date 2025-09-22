"use client"

import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import ImageIcon from '@mui/icons-material/Image';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useRouter } from "next/navigation"

const navItems = [
  { id: 1, title: "App Dashboard", icon: <DashboardIcon/>, navPath: "/app-dashboard" },
  { id: 2, title: "Users", icon: <GroupIcon/>, navPath: "/app-dashboard/users" },
  { id: 3, title: "Posts", icon: <ImageIcon/>, navPath: "/app-dashboard/posts" },
  { id: 4, title: "Reports", icon: <ReportProblemIcon />, navPath: "/app-dashboard/reports" },
  { id: 5, title: "Error Logs", icon: <ErrorOutlineIcon/>, navPath: "/app-dashboard/errors" },
  { id: 6, title: "App Settings", icon: <SettingsApplicationsIcon/>, navPath: "/app-dashboard/settings" },
]

export default function AppDashboardNav() {

    const router = useRouter()

    const DrawerList = (
      <Box sx={{ width: 300, p: 4, color: "black" }} role="presentation">
        <List>
          {navItems.map((x) => (
            <ListItem key={x.id} disablePadding>
              <ListItemButton onClick={() => router.push(x.navPath)}>
                <ListItemIcon>
                  {x.icon}
                </ListItemIcon>
                <ListItemText primary={x.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  
    return (
      <Box>
        {DrawerList}
      </Box>
    );
  }