"use client";

import { IClerkUser } from "@/interfaces/interfaces"
import { Box, TextField } from "@mui/material"
import { useState } from "react"
import { UserItem } from "./UserItem"

export const UsersList = ({ initialUsers } : { initialUsers: IClerkUser[] }) => {

    // TODO - Show more :)
    const [usersArr, setUsersArr] = useState<IClerkUser[]>(initialUsers)

    const handleSearchUserIDMongo = async() => {}
    const handleSearchUserIDClerk = async() => {}
    const handleSearchUsernameClerk = async() => {}

    // const usersClerk = (await client.users.getUserList({
    //     limit: 5,
    //     offset: 5, // přeskočí prvních 5
    //   })).data
    const handleShowMore = async() => {}

  return (
    <Box>
        <Box display="flex" justifyContent="space-between" gap={4} my={4}>

            <TextField 
                fullWidth 
                size="small" 
                label="Username (clerk)" 
            />

            <TextField 
                fullWidth 
                size="small" 
                label="UserID (mongoDB)" 
            />

            <TextField 
                fullWidth 
                size="small" 
                label="UserID (clerk)" 
            />

        </Box>

        <Box>
            {usersArr.map(x => {
                return (
                <UserItem
                    key={x.id}
                    imgUrl={x.imageUrl}
                    username={x.username || ""}
                    banned={x.banned}
                    userIDClerk={x.id}
                    lastActiveAt={x.lastActiveAt}
                />
                )
            })}
        </Box>

    </Box>
  );
};