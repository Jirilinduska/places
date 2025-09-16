import { Box, Typography } from "@mui/material"
import { AppButton } from "./AppButton"
import { flexGap2 } from "@/styles/styles"
import Image from "next/image"
import { SignInButton, SignUpButton } from "@clerk/nextjs"


export const Home = () => {

  return (
    <Box height="100vh" display="flex" flexDirection={{ xs: "column-reverse", md: "row" }} alignItems="center" px={{ xs: 2, lg: 20 }}>

        <Box flex={1}>
            <Typography fontSize={{ xs: 40, md: 60, lg: 80 }} color="black" fontWeight={600}>Places Been</Typography>
            <Typography fontSize={{ xs: 14, md: 20 }} color="black">Track the places you have been, add pins, memories & photos.</Typography>

            <Box mt={6} sx={flexGap2()}>

                <SignInButton mode="modal">
                    <AppButton
                        size="medium"
                        text="Log In"
                    /> 
                </SignInButton>

                <SignUpButton mode="modal">
                    <AppButton
                        size="medium"
                        text="Register"
                    /> 
                </SignUpButton>

            </Box>
        </Box>

        <Box>
            <Image width={500} height={500} alt="places_been_logo" src="/images/earth_logo.png"></Image>
        </Box>

    </Box>
  );
};