"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

import dynamic from "next/dynamic";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const TanStackQueryProvider = dynamic(() => import("../providers/TanStackQueryProvider"), {
    ssr: false,
});

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <TanStackQueryProvider>
                <TooltipProvider delayDuration={400}>
                    {children}
                    <Toaster />
                </TooltipProvider>
            </TanStackQueryProvider>
        </ThemeProvider>
    );
}
