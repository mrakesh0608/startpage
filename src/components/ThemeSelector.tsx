"use client";

import * as React from "react";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export function ThemeSelector() {
    const { setTheme, theme } = useTheme();

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Theme</h4>
            </div>

            <Select value={theme} onValueChange={(value) => setTheme(value)}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="system">
                        <div className="flex gap-2">
                            <MonitorCog className="h-[1.2rem] w-[1.2rem] transition-all" />
                            System
                        </div>
                    </SelectItem>
                    <SelectItem value="light">
                        <div className="flex gap-2">
                            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
                            <span>Light</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="dark">
                        <div className="flex gap-2">
                            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
                            <span>Dark</span>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
