"use client";

import { Box, IconButton, Skeleton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForestIcon from '@mui/icons-material/Forest';
import LandscapeIcon from '@mui/icons-material/Landscape';
import KayakingIcon from '@mui/icons-material/Kayaking';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { IReactions } from "@/interfaces/interfaces"
import { REACTION_BIKES, REACTION_HEARTS, REACTION_MOUNTAINS, REACTION_TREES, REACTION_WATER } from "@/constants/constants"

type Props = {
    postID: string
}

export const Emoji = ({ postID } : Props) => {

    const { userId } = useAuth()
    const [reactions, setReactions] = useState<IReactions | null>(null)

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await fetch(`/api/reactions/${postID}`, { method: "GET" })
                if(!res.ok) {} // TODO
                const data = await res.json()
                setReactions(data.reactions)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])


    const handleReaction = async(reactionType: string, wantRemove: boolean) => {
        try {
            const res = await fetch("/api/reactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ postID, reactionType, wantRemove })
            })
            if(!res.ok) {}// TODO 
            const data = await res.json()
            setReactions(data.reactions)
        } catch (error) {
            console.log(error)
        }
    }

    if(!reactions) {
        return (
            <Box display="flex" gap={2}>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
            </Box>
        )
    }

    if(userId) {
        return (
            <Box my={2} display="flex" alignItems="center" gap={1}>
        

                <IconButton onClick={() => handleReaction(REACTION_HEARTS, reactions.hearts.includes(userId))}>
                    <FavoriteIcon className={reactions.hearts.includes(userId) ? "text-red-500" : "text-black"} />
                </IconButton>
        
                <IconButton onClick={() => handleReaction(REACTION_TREES, reactions.trees.includes(userId))}>
                    <ForestIcon className={reactions.trees.includes(userId) ? "text-green-800" : "text-black"} />
                </IconButton>
        
                <IconButton onClick={() => handleReaction(REACTION_MOUNTAINS, reactions.mountains.includes(userId))}>
                    <LandscapeIcon className={reactions.mountains.includes(userId) ? "text-gray-300" : "text-black"} />
                </IconButton>
        
                <IconButton onClick={() => handleReaction(REACTION_WATER, reactions.water.includes(userId))}>
                    <KayakingIcon className={reactions.water.includes(userId) ? "text-blue-400" : "text-black"} />
                </IconButton>
        
                <IconButton onClick={() => handleReaction(REACTION_BIKES, reactions.bikes.includes(userId))}>
                    <DirectionsBikeIcon className={reactions.bikes.includes(userId) ? "text-orange-400" : "text-black"} />
                </IconButton>
        
            </Box>
        )
    }
};