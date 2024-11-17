"use client";

import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Trash2 } from "lucide-react";
import { AddBookmark } from "./AddBookmark";
import { useBookmarkStore } from "./bookmarksStore";
import Image from "next/image";

export function Bookmarks() {
	const { bookmarks, removeBookmark } = useBookmarkStore();

	const BookmarkGrid = useCallback(
		({ category }: { category: "social" | "work" }) => (
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{bookmarks
					.filter((bookmark) => bookmark.category === category)
					.map((bookmark, index) => (
						<Card key={index} className="hover:shadow-lg transition-shadow relative cursor-pointer">
							<a href={bookmark.url} target="_blank" rel="noopener noreferrer">
								<CardContent className="p-4  h-full flex items-center justify-center flex-col gap-y-3">
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
									<span>{bookmark.name}</span>
									<Button
										variant="ghost"
										size="icon"
										className="absolute top-1 right-1 text-destructive"
										onClick={() => removeBookmark(bookmark)}
									>
										<Trash2 className="h-4 w-4" />
										<span className="sr-only">Remove bookmark</span>
									</Button>
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
