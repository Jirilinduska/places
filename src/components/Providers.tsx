"use client";

import { ClerkProvider } from "@clerk/nextjs"

export const Providers = ({ children } : { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
        {children}
    </ClerkProvider>
  );
};