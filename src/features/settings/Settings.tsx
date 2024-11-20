"use client";

import { Button } from "@/components/ui/button";

import { Check, Info, Settings as SettingsIcon } from "lucide-react";
import { ThemeSelector } from "@/features/ThemeSelector";

import { BookmarksSettings } from "./BookmarksSettings";
import { Switch } from "@/components/ui/switch";
import { useUserPreferencesStore } from "./userPreferencesStore";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/vertical-tabs";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { VisuallyHidden } from "@/components/ui/VisuallyHidden";

export function Settings() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="cursor-pointer hover:opacity-80">
                    <SettingsIcon />
                </div>
            </DialogTrigger>
            <DialogContent className="h-2/3 overflow-hidden p-0 lg:max-w-3xl">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>Add Bookmark</DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                <div className="flex h-full flex-grow flex-col overflow-auto">
                    <SettingsContent />
                </div>
            </DialogContent>
        </Dialog>
    );
}

function SettingsContent() {
    return (
        <>
            <Tabs defaultValue="general" className="h-full">
                <TabsList>
                    <TabsTrigger value="general">
                        <div className="flex items-center gap-4 py-2">
                            <SettingsIcon className="size-5" />
                            <h4 className="font-medium leading-none">General</h4>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="about">
                        <div className="flex items-center gap-4 py-2">
                            <Info className="size-5" />
                            <h4 className="font-medium leading-none">About</h4>
                        </div>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="w-full">
                    <GeneralSettingsContent />
                </TabsContent>
                <TabsContent value="about" className="w-full">
                    <AboutSettingsContent />
                </TabsContent>
            </Tabs>
        </>
    );
}

function GeneralSettingsContent() {
    const {
        userPreferences: { openLinksInNewTab, weatherCity },
        toggleOpenLinksInNewTab,
        setWeatherCity,
    } = useUserPreferencesStore();

    const [city, setCity] = useState(weatherCity);

    return (
        <div className="space-y-6">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Weather City</h4>
                </div>
                <div className="flex gap-2">
                    <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="col-span-3"
                        placeholder="Mumbai"
                        autoFocus={false}
                    />
                    <Button
                        variant="outline"
                        onClick={() => {
                            setWeatherCity(city);
                        }}>
                        <Check />
                    </Button>
                </div>
            </div>
            <ThemeSelector />
            <div className="grid gap-4">
                <div className="flex items-center justify-between space-y-2">
                    <h4 className="font-medium leading-none">Open Links in New Tab</h4>
                    <Switch checked={openLinksInNewTab} onCheckedChange={toggleOpenLinksInNewTab} />
                </div>
            </div>
            <BookmarksSettings />
        </div>
    );
}

function AboutSettingsContent() {
    return (
        <div className="flex flex-col items-center gap-4">
            <Image src={"/android-chrome-512x512.png"} alt="logo" width={128} height={128} />
            <strong className="text-xl">Easy Start</strong>
            <div className="flex flex-col items-center">
                <span className="text-zinc-400">Version</span>
                <span>0.1.2</span>
            </div>
        </div>
    );
}
