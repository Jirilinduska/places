"use client";

import { ClerkProvider } from "@clerk/nextjs"
import { SnackbarProvider } from "notistack"

export const Providers = ({ children } : { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        {children}
      </SnackbarProvider>
    </ClerkProvider>
  );
};