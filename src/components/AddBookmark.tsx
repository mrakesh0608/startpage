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
import { Plus } from "lucide-react";
import { useBookmarkStore } from "./bookmarksStore";

type Bookmark = {
    name: string;
    icon: string;
    url: string;
    category: "social" | "work";
};

export function AddBookmark() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newBookmark, setNewBookmark] = useState<Bookmark>({
        name: "",
        icon: "",
        url: "",
        category: "social",
    });

    const { addBookmark } = useBookmarkStore();

    const handleAddBookmark = useCallback(() => {
        addBookmark(newBookmark);
        setNewBookmark({ name: "", icon: "Github", url: "", category: "social" });
        setIsAddModalOpen(false);
    }, [addBookmark, newBookmark]);

    return (
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
                <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                    <CardContent className="flex h-full items-center justify-center p-4">
                        <Plus className="h-8 w-8" />
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Bookmark</DialogTitle>
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
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">
                            ICON
                        </Label>
                        <Input
                            id="icon"
                            value={newBookmark.icon}
                            onChange={(e) =>
                                setNewBookmark({ ...newBookmark, icon: e.target.value })
                            }
                            className="col-span-3"
                            placeholder="https://example.com/icon.png"
                        />
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
                                <SelectItem value="social">Social</SelectItem>
                                <SelectItem value="work">Work</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Button onClick={handleAddBookmark}>Add Bookmark</Button>
            </DialogContent>
        </Dialog>
    );
}
