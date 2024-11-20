"use client";
import React, { useCallback, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddBookmark } from "./AddBookmark";
import { Bookmark, useBookmarkStore } from "./bookmarksStore";

import { BookmarkItem } from "./BookmarkItem";
import { DraggableContainer, DraggableItem } from "./draggable";

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

    return (
        <div className="flex-grow">
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
                className="w-full">
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
            </Tabs>
            <div className="w-full overflow-hidden">
                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="custom-scrollbar flex w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth"
                    style={{
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch",
                    }}>
                    <div className="flex w-full flex-shrink-0 snap-center items-center justify-center">
                        <BookmarkGrid category="work" />
                    </div>
                    <div className="flex w-full flex-shrink-0 snap-center items-center justify-center">
                        <BookmarkGrid category="social" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookmarkGrid({ category }: { category: Bookmark["category"] }) {
    const { bookmarks, reorderBookmarks } = useBookmarkStore();

    const filterredBookmarks = bookmarks
        .filter((bookmark) => bookmark.category === category)
        .map((bookmark) => ({ ...bookmark, id: `${bookmark.url}-${bookmark.name}` }));

    return (
        <DraggableContainer
            items={filterredBookmarks}
            onChange={(items) => reorderBookmarks(items)}>
            <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
                {filterredBookmarks.map((bookmark) => (
                    <DraggableItem key={bookmark.id} id={bookmark.id}>
                        <BookmarkItem key={bookmark.id} bookmark={bookmark} />
                    </DraggableItem>
                ))}
                <AddBookmark />
            </div>
        </DraggableContainer>
    );
}
