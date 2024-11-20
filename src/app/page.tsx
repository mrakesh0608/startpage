import { Bookmarks } from "@/features/bookmarks/Bookmarks";
import { CurrentTime } from "@/features/CurrentTime";

import { Quotes } from "@/features/Quotes";
import { Settings } from "@/features/settings/Settings";

import { Weather } from "@/features/Weather";
import { WeekNumber } from "@/features/WeekNumber";

export default function Home() {
    return (
        <div className="z-30 flex min-h-screen flex-col gap-y-4 bg-[url('/vivaldi-light.jpg')] bg-cover bg-no-repeat p-8 dark:bg-tallpoppy dark:bg-[url('/vivaldi-light.jpg')]">
            <Quotes />

            <Bookmarks />
            <div className="flex items-end justify-between">
                <Weather />
                <div className="flex flex-col items-center">
                    <CurrentTime />
                    <WeekNumber />
                </div>
                <Settings />
            </div>
        </div>
    );
}
