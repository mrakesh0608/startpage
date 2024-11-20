"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Bookmark = {
    name: string;
    icon: string;
    url: string;
    category: "social" | "work";
};

type BookmarkStore = {
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
    removeBookmark: (bookmark: Bookmark) => void;
    editBookmark: (oldBookmark: Bookmark, newBookmark: Bookmark) => void;
    reorderBookmarks: (bookmarks: Bookmark[]) => void;
};

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set) => ({
            bookmarks: [],

            addBookmark: (bookmark) =>
                set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
            removeBookmark: (bookmarkToRemove) =>
                set((state) => ({
                    bookmarks: state.bookmarks.filter(
                        (bookmark) => bookmark.name !== bookmarkToRemove.name,
                    ),
                })),
            editBookmark: (oldBookmark, newBookmark) =>
                set((state) => {
                    const bookmarkIdx = state.bookmarks.findIndex(
                        (i) => i.url === oldBookmark.url && i.name && oldBookmark.name,
                    );

                    if (bookmarkIdx > -1) {
                        state.bookmarks[bookmarkIdx] = newBookmark;
                        return { bookmarks: state.bookmarks };
                    }

                    return { bookmarks: [...state.bookmarks, newBookmark] };
                }),
            reorderBookmarks: (bookmarks) => set(() => ({ bookmarks })),
        }),
        {
            name: "bookmark-storage",
        },
    ),
);
