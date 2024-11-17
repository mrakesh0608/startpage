"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { AddBookmark } from "./AddBookmark";
import { useBookmarkStore } from "./bookmarksStore";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function Bookmarks() {
	const { bookmarks, removeBookmark } = useBookmarkStore();

	const BookmarkGrid = useCallback(
		({ category }: { category: "social" | "work" }) => (
			<div className="grid grid-cols-2 md:grid-cols-4  gap-4">
				{bookmarks
					.filter((bookmark) => bookmark.category === category)
					.map((bookmark, index) => (
						<Card key={index} className="hover:shadow-lg transition-shadow relative cursor-pointer">
							<a href={bookmark.url} target="_blank" rel="noopener noreferrer">
								<CardContent className="p-4  h-full flex items-center justify-between gap-3">
									<div />
									<div className="flex items-center gap-2">
										<Image
											width={32}
											height={32}
											src={
												bookmark.icon ||
												`https://www.google.com/s2/favicons?${new URLSearchParams({
													domain: bookmark.url,
													sz: "128",
												})}`
											}
											alt="icon"
										/>
										<strong className="line-clamp-1">{bookmark.name}</strong>
									</div>

									<DropdownMenu>
										<DropdownMenuTrigger>
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Bookmark Settings</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={() => removeBookmark(bookmark)}>
												<Trash2 className="h-4 w-4" />
												<span>Remove</span>
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => alert("Coming Soon")}>
												<Pencil className="h-4 w-4" />
												<span>Edit</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</CardContent>
							</a>
						</Card>
					))}
				<AddBookmark />
			</div>
		),
		[bookmarks, removeBookmark]
	);

	return (
		<div className="flex-grow">
			<Tabs defaultValue="social" className="w-full">
				<TabsList className="grid w-full grid-cols-2 mb-4">
					<TabsTrigger value="social">Social</TabsTrigger>
					<TabsTrigger value="work">Work</TabsTrigger>
				</TabsList>
				<TabsContent value="social">
					<BookmarkGrid category="social" />
				</TabsContent>
				<TabsContent value="work">
					<BookmarkGrid category="work" />
				</TabsContent>
			</Tabs>
		</div>
	);
}
