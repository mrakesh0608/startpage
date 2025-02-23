"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addDays, addWeeks, addMonths, addYears, isSameDay, startOfDay } from "date-fns";

export interface RecurringEvent {
    id: string;
    startDate: Date;
    frequency: number;
    interval: "day" | "week" | "month" | "year";
    selectedDays?: string[];
    monthlyOption?: "day" | "weekday";
    endDate: Date;
    title: string;
    description?: string;
    isActive: boolean;
}

interface EventStore {
    events: RecurringEvent[];
    addEvent: (event: Omit<RecurringEvent, "id">) => void;
    removeEvent: (id: string) => void;
    getUpcomingEvents: () => RecurringEvent[];
    toggleEvent: (id: string) => void;
    updateEvent: (id: string, updates: Partial<RecurringEvent>) => void;
}

export const useEventStore = create<EventStore>()(
    persist(
        (set, get) => ({
            events: [],
            addEvent: (event) =>
                set((state) => ({
                    events: [...state.events, { ...event, id: crypto.randomUUID() }],
                })),
            removeEvent: (id) =>
                set((state) => ({ events: state.events.filter((event) => event.id !== id) })),
            toggleEvent: (id) =>
                set((state) => ({
                    events: state.events.map((event) =>
                        event.id === id ? { ...event, isActive: !event.isActive } : event,
                    ),
                })),

            updateEvent: (id, updates) =>
                set((state) => ({
                    events: state.events.map((event) =>
                        event.id === id ? { ...event, ...updates } : event,
                    ),
                })),
            getUpcomingEvents: () => {
                const today = startOfDay(new Date());

                return get().events.filter((event) => {
                    if (!event.isActive || new Date(event.endDate) < today) return false;

                    const getNextOccurrence = (event: RecurringEvent): Date | null => {
                        let nextDate = new Date(event.startDate);

                        while (nextDate <= today) {
                            switch (event.interval) {
                                case "day":
                                    nextDate = addDays(nextDate, event.frequency);
                                    break;
                                case "week":
                                    nextDate = addWeeks(nextDate, event.frequency);
                                    break;
                                case "month":
                                    nextDate = addMonths(nextDate, event.frequency);
                                    break;
                                case "year":
                                    nextDate = addYears(nextDate, event.frequency);
                                    break;
                            }
                        }

                        return nextDate <= new Date(event.endDate) ? nextDate : null;
                    };

                    const nextOccurrence = getNextOccurrence(event);
                    return nextOccurrence && isSameDay(nextOccurrence, today);
                });
            },
        }),
        { name: "events" },
    ),
);
