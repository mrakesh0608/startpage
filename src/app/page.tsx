import { Bookmarks } from "@/components/Bookmarks";
import { CurrentTime } from "@/components/CurrentTime";
import { Quotes } from "@/components/Quotes";

import { Separator } from "@/components/ui/separator";
import { Weather } from "@/components/Weather";
import { WeekNumber } from "@/components/WeekNumber";

export default function Home() {
	return (
		<div className="min-h-screen dark:bg-gray-900 flex flex-col p-8 gap-y-8">
			<CurrentTime />
			<Quotes />
			<Bookmarks />

			<Separator />

			<div className="flex justify-between text-gray-600 dark:text-gray-400  items-end">
				<Weather />
				<WeekNumber />
			</div>
		</div>
	);
}
