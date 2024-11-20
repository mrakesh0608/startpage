"use client";
import React, { useCallback, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddBookmark } from "./AddBookmark";
import { Bookmark, useBookmarkStore } from "./bookmarksStore";

import { BookmarkItem } from "./BookmarkItem";
import { DraggableContainer, DraggableItem } from "@/components/draggable";
import { BringToFront, SendToBack } from "lucide-react";
import { MinimalToottip } from "@/components/MinimalToottip";

const tabsList = ["work", "social"];

export function Bookmarks() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTab, setActiveTab] = useState(0);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const { scrollLeft, clientWidth } = containerRef.current;
        const activeIndex = Math.round(scrollLeft / clientWidth);
        setActiveTab(activeIndex);
    }, []);

    const [enabledReorder, setEnabledReorder] = useState(false);

    return (
        <>
            <div className="mt-4 grid w-full grid-cols-[20vw_auto_20vw]">
                <div />
                <Tabs
                    defaultValue="work"
                    value={tabsList[activeTab]}
                    onValueChange={(e) => {
                        const idx = tabsList.findIndex((i) => i === e);
                        if (idx > -1) {
                            setActiveTab(idx);

                            containerRef.current?.scrollTo({
                                left: idx * window.innerWidth,
                                behavior: "smooth",
                            });
                        }
                    }}
                    className={"flex w-full justify-center"}>
                    <TabsList className="grid w-2/3 grid-cols-2">
                        <TabsTrigger value="work">
                            <strong>Work</strong>
                        </TabsTrigger>
                        <TabsTrigger value="social">
                            <strong>Social</strong>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex w-full items-center justify-end gap-4">
                    <div
                        className="cursor-pointer hover:opacity-80"
                        onClick={() => setEnabledReorder((v) => !v)}>
                        <MinimalToottip
                            content={enabledReorder ? "Enabled Reordering" : "Disabled Reordering"}>
                            {enabledReorder ? (
                                <SendToBack className="size-6 text-red-500" />
                            ) : (
                                <BringToFront className="size-6" />
                            )}
                        </MinimalToottip>
                    </div>
                    <AddBookmark />
                </div>
            </div>
            <div className="flex h-full w-full flex-grow items-center overflow-hidden">
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="hidden-scrollbar flex w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth"
                    style={{
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                    }}>
                    <div className="flex w-full flex-shrink-0 snap-center justify-center">
                        <BookmarkGrid category="work" enabledReorder={enabledReorder} />
                    </div>
                    <div className="flex w-full flex-shrink-0 snap-center justify-center">
                        <BookmarkGrid category="social" enabledReorder={enabledReorder} />
                    </div>
                </div>
            </div>
        </>
    );
}

function BookmarkGrid({
    category,
    enabledReorder,
}: {
    category: Bookmark["category"];
    enabledReorder: boolean;
}) {
    const { bookmarks, reorderBookmarks } = useBookmarkStore();

    const filterredBookmarks = bookmarks
        .filter((bookmark) => bookmark.category === category)
        .map((bookmark) => ({ ...bookmark, id: `${bookmark.url}-${bookmark.name}` }));

    return (
        <DraggableContainer
            items={filterredBookmarks}
            onChange={(items) => reorderBookmarks(items, category)}>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                {filterredBookmarks.map((bookmark) => (
                    <DraggableItem
                        key={bookmark.id}
                        id={bookmark.id}
                        enabledReorder={enabledReorder}>
                        <BookmarkItem
                            key={bookmark.id}
                            bookmark={bookmark}
                            enabledReorder={enabledReorder}
                        />
                    </DraggableItem>
                ))}
            </div>
        </DraggableContainer>
    );
}
