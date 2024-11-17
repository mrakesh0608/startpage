"use client";

import { useEffect, useMemo, useState } from "react";

export function CurrentTime() {
	const [currentTime, setCurrentTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000);
		return () => clearInterval(timer);
	}, []);

	const timeInText = useMemo(() => {
		return new Date(currentTime).toLocaleString("en-US", {
			dateStyle: "medium",
			timeStyle: "short",
			timeZone: "Asia/Kolkata",
		});
	}, [currentTime]);

	return (
		<div>
			<h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center">{timeInText}</h1>
		</div>
	);
}
