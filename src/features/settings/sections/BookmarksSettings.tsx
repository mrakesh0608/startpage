"use client";

import { Button } from "@/components/ui/button";

import { Upload } from "lucide-react";

import { useBookmarkStore } from "../../bookmarks/bookmarksStore";
import { useCallback } from "react";

export function BookmarksSettings() {
    const { bookmarks } = useBookmarkStore();

    const downloadBookmarks = useCallback(() => {
        if (bookmarks.length === 0) {
            alert("You dont have any saved bookmarks.");
            return;
        }

        const file = new Blob([JSON.stringify({ bookmarks }, null, 4)], {
            type: "application/json",
        });

        const a = document.createElement("a");

        a.href = URL.createObjectURL(file);
        a.download = "easystart-bookmarks.json"; //fileName;
        a.click();
    }, [bookmarks]);

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Bookmarks</h4>
            </div>
            <Button variant="outline" onClick={downloadBookmarks}>
                <Upload /> Export
            </Button>
        </div>
    );
}
