"use client";

import { format } from "date-fns";

import { useEffect } from "react";
import { toast } from "sonner";
import { useEventStore } from "./useEventStore";

export function EventNotifications() {
    const getUpcomingEvents = useEventStore((state) => state.getUpcomingEvents);

    useEffect(() => {
        // Check for events when the component mounts
        const checkEvents = () => {
            const upcomingEvents = getUpcomingEvents();

            upcomingEvents.forEach((event) => {
                toast(event.title, {
                    description: `Recurring event for ${format(new Date(), "MMMM d, yyyy")}`,
                });
            });
        };

        const interval = setTimeout(checkEvents, 1000);

        return () => clearInterval(interval);
    }, [getUpcomingEvents]);

    return null;
}
