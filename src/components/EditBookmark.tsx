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
import { Upload } from "lucide-react";
import { useBookmarkStore } from "./bookmarksStore";
import { convertImageToBase64 } from "./convertImageToBase64";

type Bookmark = {
    name: string;
    icon: string;
    url: string;
    category: "social" | "work";
};

export function EditBookmark({
    currentBookmark,
    isAddModalOpen,
    setIsAddModalOpen,
}: {
    currentBookmark: Bookmark;
    isAddModalOpen: boolean;
    setIsAddModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const [newBookmark, setNewBookmark] = useState<Bookmark>(currentBookmark);

    const { editBookmark } = useBookmarkStore();

    const handleAddBookmark = useCallback(() => {
        editBookmark(currentBookmark, newBookmark);
        setNewBookmark(newBookmark);
        setIsAddModalOpen(false);
    }, [currentBookmark, editBookmark, newBookmark, setIsAddModalOpen]);

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <span />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Bookmark</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
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
                            SITE
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
                        <Label htmlFor="url" className="text-right">
                            ICON
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
                                        className="flex cursor-pointer items-center justify-center rounded-lg opacity-75 transition">
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
                <Button onClick={handleAddBookmark}>Save</Button>
            </DialogContent>
        </Dialog>
    );
}
