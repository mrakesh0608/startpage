"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TNote = {
    _id: string;
    text: string;
    isChecked: boolean;
};

type BookmarkStore = {
    notes: TNote[];
    resetNotes: (notes: TNote[]) => void;
    addNote: (note: TNote) => void;
    removeNoteByID: (noteId: TNote["_id"]) => void;
    updateNote: (note: TNote) => void;
};

export const useNotesStore = create<BookmarkStore>()(
    persist(
        (set) => ({
            notes: [],
            resetNotes: (notes) => set(() => ({ notes })),
            addNote: (bookmark) => set((state) => ({ notes: [...state.notes, bookmark] })),
            removeNoteByID: (noteId) =>
                set((state) => ({
                    notes: state.notes.filter((item) => item._id !== noteId),
                })),
            updateNote: (updateNote) =>
                set((state) => {
                    const noteIdx = state.notes.findIndex((note) => note._id === updateNote._id);

                    if (noteIdx > -1) {
                        state.notes[noteIdx] = updateNote;
                        return { notes: state.notes };
                    }

                    return { notes: [...state.notes, updateNote] };
                }),
        }),
        {
            name: "notes-storage",
        },
    ),
);
