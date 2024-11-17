import { Bookmarks } from "@/components/Bookmarks";
import { CurrentTime } from "@/components/CurrentTime";
import { Quotes } from "@/components/Quotes";
import { ThemeSelector } from "@/components/ThemeSelector";

import { Weather } from "@/components/Weather";
import { WeekNumber } from "@/components/WeekNumber";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col gap-y-4 p-8 dark:bg-gray-900">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <Weather />
                <div className="flex flex-col items-center">
                    <CurrentTime />
                    <WeekNumber />
                </div>
                <ThemeSelector />
            </div>

            <Quotes />

            <Bookmarks />
        </div>
    );
}
