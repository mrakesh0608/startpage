"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { useBookmarkStore } from "./bookmarksStore";
import { convertImageToBase64 } from "@/lib/convertImageToBase64";
import { BookmarkPreviewItem } from "./BookmarkItem";

type Bookmark = {
    name: string;
    icon: string;
    url: string;
    category: "social" | "work";
};

const defaultBookmarkValues: Bookmark = {
    name: "",
    icon: "",
    url: "",
    category: "work",
};

export function AddBookmark() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 rounded-xl bg-white p-2 transition-shadow hover:opacity-80 dark:bg-charade">
                    <Plus className="size-4" />
                    <span className="text-[10px] lg:text-xs">Add Bookmark</span>
                </div>
            </DialogTrigger>
            <DialogContent className="lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Bookmark</DialogTitle>
                </DialogHeader>
                <AddBookmarkForm onAddSuccess={() => setIsAddModalOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

function AddBookmarkForm({ onAddSuccess }: { onAddSuccess: () => void }) {
    const [newBookmark, setNewBookmark] = useState<Bookmark>(defaultBookmarkValues);

    const { addBookmark } = useBookmarkStore();

    const handleAddBookmark = useCallback(() => {
        addBookmark(newBookmark);
        setNewBookmark(defaultBookmarkValues);
        onAddSuccess();
    }, [addBookmark, newBookmark, onAddSuccess]);

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col justify-center gap-2">
                    <BookmarkPreviewItem bookmark={newBookmark} />
                    <strong>Preview</strong>
                </div>
                <div className="col-span-2 grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            URL
                        </Label>
                        <Input
                            id="url"
                            value={newBookmark.url}
                            onChange={(e) => {
                                const url = e.target.value;

                                // if (url) {
                                //     if (newBookmark.name || newBookmark.icon) return;

                                //     try {
                                //         const urlS = new URL(url);

                                //         console.log({ urlS });

                                //         const hosts = urlS.host.split(".").join(" ");

                                //         if (hosts.length) {
                                //             setNewBookmark({
                                //                 ...newBookmark,
                                //                 url: url,
                                //                 name: hosts,
                                //             });
                                //             return;
                                //         }
                                //     } catch (error) {
                                //         console.error(error);
                                //     }
                                // }

                                setNewBookmark({ ...newBookmark, url: url });
                            }}
                            className="col-span-3"
                            placeholder="https://youtube.com"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={newBookmark.name}
                            onChange={(e) =>
                                setNewBookmark({ ...newBookmark, name: e.target.value })
                            }
                            className="col-span-3"
                            placeholder="Youtube"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            Icon
                        </Label>
                        <div className="col-span-3 flex w-full gap-2">
                            <Input
                                id="icon"
                                value={newBookmark.icon}
                                onChange={(e) =>
                                    setNewBookmark({ ...newBookmark, icon: e.target.value })
                                }
                                className="w-full"
                                placeholder="https://youtube.com/icon.png"
                            />
                            <div>
                                <Button variant="outline" size="icon">
                                    <label
                                        htmlFor="fileInput"
                                        className="flex h-full w-full cursor-pointer items-center justify-center rounded-lg opacity-75 transition">
                                        <Upload />
                                    </label>
                                </Button>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    onChange={async (e) => {
                                        console.log({ e });

                                        const file = e?.target?.files?.[0];

                                        if (file) {
                                            const base64 = (await convertImageToBase64(
                                                file,
                                            )) as string;
                                            setNewBookmark({ ...newBookmark, icon: base64 });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                            Category
                        </Label>
                        <Select
                            value={newBookmark.category}
                            onValueChange={(value: "social" | "work") =>
                                setNewBookmark({ ...newBookmark, category: value })
                            }>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="work">Work</SelectItem>
                                <SelectItem value="social">Social</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <Button onClick={handleAddBookmark} className="font-bold">
                    Add Bookmark
                </Button>
            </div>
        </>
    );
}
