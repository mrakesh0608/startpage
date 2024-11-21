"use client";

import { Dispatch, SetStateAction, useCallback, useState } from "react";

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
import { Trash2, Upload } from "lucide-react";
import { useBookmarkStore } from "./bookmarksStore";
import { convertImageToBase64 } from "@/lib/convertImageToBase64";
import { BookmarkPreviewItem } from "./BookmarkItem";

type Bookmark = {
    name: string;
    icon: string;
    url: string;
    category: "social" | "work";
};

type EditBookmarkProps = {
    currentBookmark: Bookmark;
    isAddModalOpen: boolean;
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
};

export function EditBookmark(props: EditBookmarkProps) {
    const { isAddModalOpen, setIsAddModalOpen } = props;

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <span />
            </DialogTrigger>
            <DialogContent className="lg:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Bookmark</DialogTitle>
                </DialogHeader>
                <EditBookmarkForm {...props} />
            </DialogContent>
        </Dialog>
    );
}

function EditBookmarkForm({ currentBookmark, setIsAddModalOpen }: EditBookmarkProps) {
    const [newBookmark, setNewBookmark] = useState<Bookmark>(currentBookmark);

    const { editBookmark, removeBookmark } = useBookmarkStore();

    const handleUpdateBookmark = useCallback(() => {
        editBookmark(currentBookmark, newBookmark);
        setNewBookmark(newBookmark);
        setIsAddModalOpen(false);
    }, [currentBookmark, editBookmark, newBookmark, setIsAddModalOpen]);

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
                            onChange={(e) =>
                                setNewBookmark({ ...newBookmark, url: e.target.value })
                            }
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
            <div className="flex items-center justify-between">
                <div
                    onClick={() => removeBookmark(currentBookmark)}
                    className="flex cursor-pointer items-center gap-2 font-bold hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                    <span>Remove</span>
                </div>
                <Button onClick={handleUpdateBookmark} className="font-bold">
                    Save Changes
                </Button>
            </div>
        </>
    );
}
