"use client";

import { useCallback, useMemo } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddBookmark } from "./AddBookmark";
import { useBookmarkStore } from "./bookmarksStore";

import { useUserPreferencesStore } from "./userPreferencesStore";

import { BookmarkItem } from "./BookmarkItem";

export function Bookmarks() {
    const { bookmarks } = useBookmarkStore();

    const openLinksInNewTab = useUserPreferencesStore((s) => s.userPreferences.openLinksInNewTab);

    const anchorTarget = useMemo(
        () => (openLinksInNewTab ? "_blank" : "_self"),
        [openLinksInNewTab],
    );

    const BookmarkGrid = useCallback(
        ({ category }: { category: "social" | "work" }) => (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-8">
                {bookmarks
                    .filter((bookmark) => bookmark.category === category)
                    .map((bookmark) => (
                        <BookmarkItem
                            key={`${bookmark.url}-${bookmark.name}`}
                            bookmark={bookmark}
                            anchorTarget={anchorTarget}
                        />
                    ))}
                <AddBookmark />
            </div>
        ),
        [anchorTarget, bookmarks],
    );

    return (
        <div className="flex-grow">
            <Tabs defaultValue="work" className="w-full">
                <div className="flex items-center justify-center">
                    <TabsList className="mb-4 grid w-1/3 grid-cols-2">
                        <TabsTrigger value="work">
                            <strong>Work</strong>
                        </TabsTrigger>
                        <TabsTrigger value="social">
                            <strong>Social</strong>
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="work">
                    <BookmarkGrid category="work" />
                </TabsContent>
                <TabsContent value="social">
                    <BookmarkGrid category="social" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
