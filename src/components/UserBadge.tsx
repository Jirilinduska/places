"use client"

import { Box, Skeleton, Typography } from "@mui/material"
import Link from "next/link"
import { PostLocation } from "./PostLocation"
import { useEffect, useState } from "react"
import { getUserFromClerk } from "@/app/actions"

type Props = {
    userID: string
    showLocation?: boolean
    lat?: number
    lon?: number
    placeName?: string
    county?: string
    municipality?: string
    hideImg?: boolean
    hideLink?: boolean
}

export const UserBadge = ({ userID, showLocation, lat, lon, placeName, county, municipality, hideImg, hideLink } : Props) => {

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
      imageUrl: "",
      username: ""
    })
  
    useEffect(() => {
      const fetchUser = async() => {
        setLoading(true)
        const result = await getUserFromClerk(userID)
        if(result.success) {
            setUserData({ username: result.username || "user", imageUrl: result.imageUrl })
            setLoading(false)
        }
      }
      fetchUser()
    }, [])

    if(hideLink) {
        return (
            <Box display="flex" alignItems="center" gap={1}>

            <Box>
    
                {loading 
                    ? <Skeleton variant="circular" width={40} height={40} />
                    : !hideImg 
                        ? (
                            <Box width={40} height={40} borderRadius="50%">
                                <img
                                    src={userData.imageUrl || "/images/default_avatar.png"}
                                    alt={userData.username}
                                    className="rounded-full cursor-pointer" 
                                />
                            </Box> 
                        )
                    : null
                
                }
            </Box>
            
            <Box>
                {loading 
                    ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    : <Typography className="font-bold cursor-pointer" fontWeight={600}>{userData.username}</Typography>
                }
                {showLocation && 
                    <PostLocation 
                        lat={lat!} 
                        lon={lon!} 
                        placeName={placeName || ""} 
                        county={county || ""} 
                        municipality={municipality || ""} 
                    />
                }
            </Box>
        </Box>
        )
    }

  return (
    <Box display="flex" alignItems="center" gap={1}>

        <Link href={`/profile/${userID}`} target="_blank">

            {loading 
                ? <Skeleton variant="circular" width={40} height={40} />
                : !hideImg 
                    ? (
                        <Box width={40} height={40} borderRadius="50%">
                            <img
                                src={userData.imageUrl || "/images/default_avatar.png"}
                                alt={userData.username}
                                className="rounded-full"
                            />
                        </Box> 
                    )
                : null
            
            }
        </Link>
        
        <Box>
            {loading 
                ? <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                : <Link className="font-bold hover:underline" href={`/profile/${userID}`} target="_blank">{userData.username}</Link>
            }
            {showLocation && 
                <PostLocation 
                    lat={lat!} 
                    lon={lon!} 
                    placeName={placeName || ""} 
                    county={county || ""} 
                    municipality={municipality || ""} 
                />
            }
        </Box>
    </Box>
  );
};