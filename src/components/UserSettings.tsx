import { Box } from "@mui/material"
import { ChangeUserName } from "./ChangeUserName"
import { ChangeProfileImage } from "./ChangeProfileImage"

export const UserSettings = () => {

  return (
    <Box width={{ xs: "100%", sm: "70%", md: "30%" }} my={6}>
        <ChangeUserName />
        <ChangeProfileImage />
    </Box>
  );
};