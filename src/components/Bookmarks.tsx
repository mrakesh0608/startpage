"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AddBookmark } from "./AddBookmark";
import { Bookmark, useBookmarkStore } from "./bookmarksStore";

import { BookmarkItem } from "./BookmarkItem";
import { DraggableContainer, DraggableItem } from "./draggable";

export function Bookmarks() {
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

function BookmarkGrid({ category }: { category: Bookmark["category"] }) {
    const { bookmarks, reorderBookmarks } = useBookmarkStore();

    const filterredBookmarks = bookmarks
        .filter((bookmark) => bookmark.category === category)
        .map((bookmark) => ({ ...bookmark, id: `${bookmark.url}-${bookmark.name}` }));

    return (
        <DraggableContainer
            items={filterredBookmarks}
            onChange={(items) => reorderBookmarks(items)}>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-8">
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
