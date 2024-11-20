import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { AppProviders } from "@/providers/Providers";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Easy Start",
    description: "Created by ..",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-secondary custom-scrollbar antialiased`}>
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
