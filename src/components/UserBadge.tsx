"use client"

import { Box, Skeleton } from "@mui/material"
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
}

export const UserBadge = ({ userID, showLocation, lat, lon, placeName, county, municipality } : Props) => {

    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({
      imageUrl: "",
      username: ""
    })
  
    useEffect(() => {
      const fetchUser = async() => {
        setLoading(true)
        const { imageUrl, username } = await getUserFromClerk(userID)
        setUserData({ username: username || "user", imageUrl })
        setLoading(false)
      }
      fetchUser()
    }, [])

  return (
    <Box display="flex" alignItems="center" gap={1}>

        <Link href={`/profile/${userID}`} target="_blank">
            {loading
                ? <Skeleton variant="circular" width={40} height={40} />
                : (
                    <Box width={40} height={40} borderRadius="50%">
                        <img
                            src={userData.imageUrl || "/images/default_avatar.png"}
                            alt={userData.username}
                            className="rounded-full"
                        />
                    </Box> 
                )
            
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