"use client";

import { Button } from "@/components/ui/button";

import { Check } from "lucide-react";
import { ThemeSelector } from "@/features/ThemeSelector";

import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useUserPreferencesStore } from "../userPreferencesStore";
import { BookmarksSettings } from "./BookmarksSettings";

export function GeneralSettingsContent() {
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
