"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Bookmark = {
    name: string;
    icon: string;
    url: string;
    category: "social" | "work";
};

type BookmarkStore = {
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void;
    removeBookmark: (bookmark: Bookmark) => void;
};

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set) => ({
            bookmarks: [],
            addBookmark: (bookmark) =>
                set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),
            removeBookmark: (bookmarkToRemove) =>
                set((state) => ({
                    bookmarks: state.bookmarks.filter((bookmark) => bookmark !== bookmarkToRemove),
                })),
        }),
        {
            name: "bookmark-storage",
        },
    ),
);
