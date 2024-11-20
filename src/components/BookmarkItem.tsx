"use client";

import { HTMLAttributeAnchorTarget, useState } from "react";
import { Card } from "@/components/ui/card";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";

import { Bookmark, useBookmarkStore } from "./bookmarksStore";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { EditBookmark } from "./EditBookmark";

export function BookmarkItem({
    anchorTarget,
    bookmark,
}: {
    bookmark: Bookmark;
    anchorTarget: HTMLAttributeAnchorTarget;
}) {
    const { removeBookmark } = useBookmarkStore();

    const imgSrc =
        bookmark.icon ||
        `https://www.google.com/s2/favicons?${new URLSearchParams({
            domain: bookmark.url,
            sz: "128",
        })}`;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <a href={bookmark.url} target={anchorTarget}>
            <EditBookmark
                isAddModalOpen={isAddModalOpen}
                setIsAddModalOpen={setIsAddModalOpen}
                currentBookmark={bookmark}
            />
            <Card
                className={cn(
                    "group relative h-32 cursor-pointer overflow-hidden rounded-xl border border-transparent bg-white shadow-lg transition-shadow hover:shadow-lg dark:border-transparent dark:bg-white",
                    "hover:border-green-400 dark:hover:border-green-400",
                )}>
                <div className="absolute flex h-full w-full items-center justify-center">
                    <img
                        src={imgSrc}
                        alt="Placeholder"
                        className="max-h-28 rounded-lg object-cover"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="absolute right-0 top-0 z-20 hidden justify-end p-1 group-hover:flex">
                            <div className="rounded-full p-1 group-hover:bg-gray-700">
                                <EllipsisVertical className="text-white hover:opacity-80" />
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Bookmark Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => removeBookmark(bookmark)}>
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAddModalOpen(true)}>
                            <Pencil className="h-4 w-4" />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="group-hover:animate-slideUp absolute bottom-0 left-0 w-full translate-y-full transform bg-black bg-opacity-80 p-1 text-white transition-transform group-hover:translate-y-0">
                    <span className="line-clamp-1 text-center">{bookmark.name}</span>
                </div>
            </Card>
        </a>
    );
}
