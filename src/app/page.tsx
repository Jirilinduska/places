import { SignedIn, SignedOut } from "@clerk/nextjs"
import { Home } from "../components/Home"
import { Box } from "@mui/material"
import { Dashboard } from "@/components/Dashboard"

export default function HomePage() {
  return (
    <Box bgcolor="white">

      <SignedOut>
        <Home />
      </SignedOut>

      <SignedIn>
        <Dashboard />
        {/* // TODO - feed od uživatelů */}
      </SignedIn>

    </Box>
  );
}
