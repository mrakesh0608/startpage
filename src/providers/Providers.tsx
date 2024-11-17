"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

import dynamic from "next/dynamic";

const TanStackQueryProvider = dynamic(() => import("../providers/TanStackQueryProvider"), {
    ssr: false,
});

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <TanStackQueryProvider>{children}</TanStackQueryProvider>
        </ThemeProvider>
    );
}
