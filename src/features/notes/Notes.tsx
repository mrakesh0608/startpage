"use client";
import React, { useEffect, useState } from "react";
import { makeOrdable, updateReorderdList, timeHourMin } from "./notes2";

import { TNote, useNotesStore } from "./notesStore";
import { cn } from "@/lib/utils";

const trashSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18">
        <path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z" />
    </svg>
);

const plusSVG = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
        <path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z" />
    </svg>
);

const copySVG = (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18">
        <path d="M180 975q-24 0-42-18t-18-42V312h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42V235q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Zm0-60h440V235H300v560Zm0 0V235v560Z" />
    </svg>
);

export function Notes() {
    const { notes, addNote } = useNotesStore();

    const [showAddForm, setShowAddForm] = useState(!!notes.length);

    useEffect(() => {
        window.onkeydown = function (e) {
            if (e.key.toLowerCase() === "q" && e.ctrlKey) {
                setShowAddForm((v) => !v);
            }
        };
    }, []);

    useEffect(() => {
        if (!notes.length) {
            return;
        }

        makeOrdable(document.getElementById("list"), updateReorderdList);
    }, [notes]);

    const [newNote, setNewNote] = useState("");

    async function handleNewNoteAdd() {
        const text = newNote;
        // document.getElementById('quoteText').innerHTML = newItem;
        if (!text) return;

        setNewNote("");

        const newNotes = {
            _id: timeHourMin(),
            text,
            isChecked: false,
        };

        addNote(newNotes);

        // const quote = document.getElementById("quoteText").innerHTML;
        // document.getElementById("quoteText").innerHTML = "New note added";
        // showSuccessEleColor(document.getElementById("quoteText"));

        // setTimeout(() => {
        //     document.getElementById("quoteText").innerHTML = quote;
        // }, 2000);
    }

    return (
        <div id="notesContainer">
            <div
                id="notesGrid"
                className={cn("grid", {
                    "grid-cols-[auto]": notes.length === 0,
                    "mr-3 grid-cols-5 gap-3": notes.length && showAddForm,
                })}>
                <div id="list-container">
                    <ul id="list">
                        {notes.map((note) => (
                            <NoteItem key={note._id} note={note} />
                        ))}
                    </ul>
                </div>
                <div
                    id="add-form"
                    className={cn("flex flex-col items-center", {
                        flex: showAddForm,
                        hidden: !showAddForm,
                    })}>
                    <textarea
                        id="new-note-text-area"
                        placeholder="New note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}></textarea>
                    <button
                        type="submit"
                        id="submit-btn"
                        className="btn-svg"
                        onClick={handleNewNoteAdd}>
                        {plusSVG}
                    </button>
                </div>
            </div>
        </div>
    );
}

function NoteItem({ note }: { note: TNote }) {
    const { updateNote, removeNoteByID } = useNotesStore();

    return (
        <li
            id={note._id}
            key={note._id}
            draggable={true}
            className="flex items-center justify-between">
            <input
                className="checkbox"
                type="checkbox"
                checked={note.isChecked}
                onChange={() => {
                    updateNote({
                        ...note,
                        isChecked: !note.isChecked,
                    });
                }}
            />
            <span className="li-content">{note.text}</span>
            <span className="li-time">{note._id}</span>
            <button
                className="btn-svg transition-all hover:fill-red-500"
                onClick={() => {
                    navigator.clipboard.writeText(note.text);
                }}>
                {copySVG}
            </button>
            <button className="btn-svg btn-close" onClick={() => removeNoteByID(note._id)}>
                {trashSVG}
            </button>
        </li>
    );
}
