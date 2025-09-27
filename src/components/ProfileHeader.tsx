"use client";

import { borderRadius } from "@/constants/constants"
import { isContentMine } from "@/helpers/isContentMine"
import { Box, Typography } from "@mui/material"
import { ModalChangeProfileBg } from "./ModalChangeProfileBg"
import { useState } from "react"

type Props = {
    backgroundImg: string
    profileImg: string
    username: string
    profileID: string
    userID: string
    appBgImages: string[]
}

export const ProfileHeader = ({ backgroundImg, profileImg, username, profileID, userID, appBgImages } : Props) => {

    const [currentBG, setCurrentBG] = useState<string>(backgroundImg)
    const handleSetCurrentBG = (newImgUrl: string) => setCurrentBG(newImgUrl) 

  return (
    <Box
      height="500px"
      bgcolor="blue"
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "rgba(0,0,0,0.4)",
        backgroundBlendMode: "darken",
      }}
    >
        <Box
          width={200}
          height={200}
          borderRadius="50%"
          overflow="hidden"
          position="relative"
          sx={{
            boxShadow: "0 0 20px rgba(255,255,255,0.6)",
            border: "4px solid white",
          }}
        >
          <img
            src={profileImg}
            alt={username}
            className="w-full h-full rounded-full object-cover"
          />
        </Box>

      {username && <Typography
          bgcolor="black"
          p={1}
          borderRadius={borderRadius}
          textAlign="center"
          fontWeight={600}
          fontSize="20px"
          my={2}
        >
          @{username}
        </Typography>}

      {isContentMine(userID, profileID) && (
        <Box className="cursor-pointer absolute bottom-4 right-4">
            <ModalChangeProfileBg 
                userId={userID} 
                bgImages={appBgImages}
                currentBG={currentBG}
                handleSetCurrentBG={handleSetCurrentBG}
            />
        </Box>
      )}
    </Box>
  );
};
