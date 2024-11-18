"use client";

import { useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { AddBookmark } from "./AddBookmark";
import { useBookmarkStore } from "./bookmarksStore";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUserPreferencesStore } from "./userPreferencesStore";

export function Bookmarks() {
    const { bookmarks, removeBookmark } = useBookmarkStore();

    const openLinksInNewTab = useUserPreferencesStore((s) => s.userPreferences.openLinksInNewTab);

    const anchorTarget = useMemo(
        () => (openLinksInNewTab ? "_blank" : "_self"),
        [openLinksInNewTab],
    );

    const BookmarkGrid = useCallback(
        ({ category }: { category: "social" | "work" }) => (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {bookmarks
                    .filter((bookmark) => bookmark.category === category)
                    .map((bookmark, index) => (
                        <Card
                            key={index}
                            className="relative cursor-pointer transition-shadow hover:shadow-lg">
                            <a href={bookmark.url} target={anchorTarget} rel="noopener noreferrer">
                                <CardContent className="flex h-full items-center justify-between gap-3 p-4">
                                    <div />
                                    <div className="flex items-center gap-2">
                                        <Image
                                            width={32}
                                            height={32}
                                            src={
                                                bookmark.icon ||
                                                `https://www.google.com/s2/favicons?${new URLSearchParams(
                                                    {
                                                        domain: bookmark.url,
                                                        sz: "128",
                                                    },
                                                )}`
                                            }
                                            alt="icon"
                                        />
                                        <strong className="line-clamp-1">{bookmark.name}</strong>
                                    </div>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <EllipsisVertical />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>Bookmark Settings</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => removeBookmark(bookmark)}>
                                                <Trash2 className="h-4 w-4" />
                                                <span>Remove</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => alert("Coming Soon")}>
                                                <Pencil className="h-4 w-4" />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardContent>
                            </a>
                        </Card>
                    ))}
                <AddBookmark />
            </div>
        ),
        [anchorTarget, bookmarks, removeBookmark],
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
