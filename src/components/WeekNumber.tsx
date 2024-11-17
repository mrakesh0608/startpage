"use client";

import { useMemo } from "react";

function getWeekNumber(d: Date) {
	d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

export function WeekNumber() {
	const weekNumber = useMemo(() => getWeekNumber(new Date()), []);

	return <div>Week {weekNumber}</div>;
}
