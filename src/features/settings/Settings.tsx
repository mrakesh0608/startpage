"use client";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, CircleX, Settings as SettingsIcon } from "lucide-react";
import { ThemeSelector } from "@/features/ThemeSelector";

import { BookmarksSettings } from "./BookmarksSettings";
import { Switch } from "@/components/ui/switch";
import { useUserPreferencesStore } from "./userPreferencesStore";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { PopoverClose } from "@radix-ui/react-popover";

export function Settings() {
    const {
        userPreferences: { openLinksInNewTab, weatherCity },
        toggleOpenLinksInNewTab,
        setWeatherCity,
    } = useUserPreferencesStore();

    const [city, setCity] = useState(weatherCity);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <SettingsIcon />
            </PopoverTrigger>
            <PopoverContent className="w-96 space-y-6" collisionPadding={32} sideOffset={10}>
                <div className="flex w-full justify-between">
                    <h3 className="font-bold leading-none">Settings</h3>
                    <PopoverClose className="hover:opacity-80">
                        <CircleX />
                    </PopoverClose>
                </div>

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
                <div className="grid gap-4">
                    <div className="flex items-center justify-between space-y-2">
                        <h4 className="font-medium leading-none">Open Links in New Tab</h4>
                        <Switch
                            checked={openLinksInNewTab}
                            onCheckedChange={toggleOpenLinksInNewTab}
                        />
                    </div>
                </div>
                <ThemeSelector />
                <BookmarksSettings />
            </PopoverContent>
        </Popover>
    );
}
