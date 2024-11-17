"use client";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Settings as SettingsIcon, Upload } from "lucide-react";
import { ThemeSelector } from "./ThemeSelector";
import { useBookmarkStore } from "./bookmarksStore";
import { useCallback } from "react";

export function Settings() {
    const { bookmarks } = useBookmarkStore();

    const downloadBookmarks = useCallback(() => {
        const file = new Blob([JSON.stringify(bookmarks, null, 4)], { type: "application/json" });

        const a = document.createElement("a");

        a.href = URL.createObjectURL(file);
        a.download = "easystart-bookmarks.json"; //fileName;
        a.click();
    }, [bookmarks]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                    <SettingsIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-8">
                <ThemeSelector />
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Bookmarks</h4>
                    </div>
                    <Button variant="outline" onClick={downloadBookmarks}>
                        <Upload /> Export
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
