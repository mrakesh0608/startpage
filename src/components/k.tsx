"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cloud, Sun, Github, Youtube, Mail, Calendar, Twitter, Linkedin, Slack, Figma, Plus, Trash2 } from "lucide-react";

type Bookmark = {
	name: string;
	icon: string;
	url: string;
	category: "social" | "work";
};

const iconMap = {
	Github,
	Youtube,
	Mail,
	Calendar,
	Twitter,
	Linkedin,
	Slack,
	Figma,
};

export function Startpage() {
	const [currentTime, setCurrentTime] = useState(new Date());
	const [weekNumber, setWeekNumber] = useState(1);
	const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newBookmark, setNewBookmark] = useState<Bookmark>({ name: "", icon: "Github", url: "", category: "social" });

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const getWeekNumber = (d: Date) => {
			d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
			d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
			const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
			return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
		};
		setWeekNumber(getWeekNumber(new Date()));
	}, []);

	useEffect(() => {
		const storedBookmarks = localStorage.getItem("bookmarks");
		if (storedBookmarks) {
			setBookmarks(JSON.parse(storedBookmarks));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}, [bookmarks]);

	const addBookmark = () => {
		setBookmarks([...bookmarks, newBookmark]);
		setNewBookmark({ name: "", icon: "Github", url: "", category: "social" });
		setIsAddModalOpen(false);
	};

	const removeBookmark = (bookmarkToRemove: Bookmark) => {
		setBookmarks(bookmarks.filter((bookmark) => bookmark !== bookmarkToRemove));
	};

	const BookmarkGrid = ({ category }: { category: "social" | "work" }) => (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{bookmarks
				.filter((bookmark) => bookmark.category === category)
				.map((bookmark, index) => (
					<Card key={index} className="hover:shadow-lg transition-shadow relative">
						<CardContent className="p-4">
							<Button variant="ghost" className="w-full h-full flex flex-col items-center justify-center space-y-2" asChild>
								<a href={bookmark.url} target="_blank" rel="noopener noreferrer">
									{iconMap[bookmark.icon] && iconMap[bookmark.icon]({ className: "h-6 w-6" })}
									<span>{bookmark.name}</span>
								</a>
							</Button>
							<Button variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive" onClick={() => removeBookmark(bookmark)}>
								<Trash2 className="h-4 w-4" />
								<span className="sr-only">Remove bookmark</span>
							</Button>
						</CardContent>
					</Card>
				))}
			<Card>
				<CardContent className="p-4">
					<Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
						<DialogTrigger asChild>
							<Button variant="ghost" className="w-full h-full flex flex-col items-center justify-center">
								<Plus className="h-6 w-6" />
								<span>Add Bookmark</span>
							</Button>
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
										onChange={(e) => setNewBookmark({ ...newBookmark, name: e.target.value })}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="url" className="text-right">
										URL
									</Label>
									<Input
										id="url"
										value={newBookmark.url}
										onChange={(e) => setNewBookmark({ ...newBookmark, url: e.target.value })}
										className="col-span-3"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="icon" className="text-right">
										Icon
									</Label>
									<Select value={newBookmark.icon} onValueChange={(value) => setNewBookmark({ ...newBookmark, icon: value })}>
										<SelectTrigger className="col-span-3">
											<SelectValue placeholder="Select an icon" />
										</SelectTrigger>
										<SelectContent>
											{Object.keys(iconMap).map((icon) => (
												<SelectItem key={icon} value={icon}>
													{icon}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="category" className="text-right">
										Category
									</Label>
									<Select
										value={newBookmark.category}
										onValueChange={(value: "social" | "work") => setNewBookmark({ ...newBookmark, category: value })}
									>
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
							<Button onClick={addBookmark}>Add Bookmark</Button>
						</DialogContent>
					</Dialog>
				</CardContent>
			</Card>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col p-8">
			<div className="text-center mb-12">
				<h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">{currentTime.toLocaleTimeString()}</h1>
			</div>

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

			<Separator className="my-8" />

			<div className="flex justify-between text-gray-600 dark:text-gray-400">
				<div className="flex items-center space-x-2">
					<Sun className="h-5 w-5" />
					<Cloud className="h-5 w-5" />
					<span>23°C</span>
				</div>
				<div>Week {weekNumber}</div>
			</div>
		</div>
	);
}
