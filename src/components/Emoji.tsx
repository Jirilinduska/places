"use client";

import { Box, IconButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForestIcon from '@mui/icons-material/Forest';
import LandscapeIcon from '@mui/icons-material/Landscape';
import KayakingIcon from '@mui/icons-material/Kayaking';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

export const Emoji = () => {
  return (
    <Box my={2} display="flex" alignItems="center" gap={1}>

        <IconButton>
            <FavoriteIcon className="text-red-500" />
        </IconButton>

        <IconButton>
            <ForestIcon className="text-green-800"/>
        </IconButton>

        <IconButton>
            <LandscapeIcon className="text-gray-300" />
        </IconButton>

        <IconButton>
            <KayakingIcon className="text-blue-400" />
        </IconButton>

        <IconButton>
            <DirectionsBikeIcon className="text-orange-400" />
        </IconButton>

    </Box>
  );
};