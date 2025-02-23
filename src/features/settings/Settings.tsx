"use client";

import { Bell, Info, Settings as SettingsIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/vertical-tabs";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { VisuallyHidden } from "@/components/ui/VisuallyHidden";
import { GeneralSettingsContent } from "./sections/GeneralSettingsContent";
import { AboutSettingsContent } from "./sections/AboutSettingsContent";
import { EventsSettingsContent } from "./sections/events/EventsSettingsContent";
import { EventNotifications } from "./sections/events/EventNotifications";

export function Settings() {
    return (
        <>
            <EventNotifications />
            <Dialog>
                <DialogTrigger asChild>
                    <div className="cursor-pointer hover:opacity-80">
                        <SettingsIcon />
                    </div>
                </DialogTrigger>
                <DialogContent className="h-2/3 overflow-hidden p-0 lg:max-w-3xl">
                    <VisuallyHidden>
                        <DialogHeader>
                            <DialogTitle>Settings</DialogTitle>
                        </DialogHeader>
                    </VisuallyHidden>
                    <div className="flex h-full flex-grow flex-col overflow-auto">
                        <SettingsContent />
                    </div>
                </DialogContent>
            </Dialog>
        </>
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
                    <TabsTrigger value="events">
                        <div className="flex items-center gap-4 py-2">
                            <Bell className="size-5" />
                            <h4 className="font-medium leading-none">Events</h4>
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
                <TabsContent value="events" className="w-full">
                    <EventsSettingsContent />
                </TabsContent>
                <TabsContent value="about" className="w-full">
                    <AboutSettingsContent />
                </TabsContent>
            </Tabs>
        </>
    );
}
