"use client"

import { Box, Typography } from "@mui/material"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react"
import { getUsernameFromClerk } from "@/app/actions"

type Props = {
    stars: number
    canClick?: boolean
    setStars?: (stars: number) => void
    createdByUserID?: string
}

export const Stars = ({ stars, canClick, setStars, createdByUserID } : Props) => {

    const [userName, setUserName] = useState("")

    const handleClick = (starsNumber: number) => {
        if(canClick && setStars) {
            setStars(starsNumber)
        } else {
            return
        }
    }

    useEffect(() => {
        if(canClick || !createdByUserID || stars === 0) return
        const fetchUser = async() => {
            const result = await getUsernameFromClerk(createdByUserID)
            if(result.success) {
                setUserName(result.username)
            }
        }
        fetchUser()
    }, [])

  return (
    <Box>
        <Typography fontSize="12px">
            {canClick
                ? "Place rating"
                : (
                <>
                    <Typography component="span" fontSize="12px" fontWeight={600}>{userName}</Typography> rated this place
                </>
                )
            }
        </Typography>

        {stars >= 1 
            ? <StarIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(0)} /> 
            : <StarBorderIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(1)} />
        }
        {stars >= 2 
            ? <StarIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(0)} /> 
            : <StarBorderIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(2)} />
        }
        {stars >= 3
            ? <StarIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(0)} /> 
            : <StarBorderIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(3)} />
        }
        {stars >= 4
            ? <StarIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }}onClick={() => handleClick(0)} /> 
            : <StarBorderIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(4)} />
        }
        {stars >= 5
            ? <StarIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }}onClick={() => handleClick(0)} /> 
            : <StarBorderIcon color="warning" sx={{ cursor: canClick ? "pointer" : "" }} onClick={() => handleClick(5)} />
        }
    </Box>
  );
};