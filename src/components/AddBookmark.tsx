"use client";

import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { convertImageToBase64 } from "./convertImageToBase64";

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
    const [newBookmark, setNewBookmark] = useState<Bookmark>(defaultBookmarkValues);

    const { addBookmark } = useBookmarkStore();

    const handleAddBookmark = useCallback(() => {
        addBookmark(newBookmark);
        setNewBookmark(defaultBookmarkValues);
        setIsAddModalOpen(false);
    }, [addBookmark, newBookmark]);

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                    <CardContent className="flex h-32 items-center justify-center p-4">
                        <Plus className="h-8 w-8" />
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Bookmark</DialogTitle>
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
                <Button onClick={handleAddBookmark}>Add Bookmark</Button>
            </DialogContent>
        </Dialog>
    );
}
