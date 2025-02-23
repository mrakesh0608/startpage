import React from "react";

import { RecurringEvent, useEventStore } from "./useEventStore";
import { Card } from "@/components/ui/card";
import { EventItem } from "./EventItem";

export function EventList() {
    const { events, removeEvent } = useEventStore();
    const [editingEvent, setEditingEvent] = React.useState<RecurringEvent["id"] | null>(null);

    // Add these to your store.ts
    const toggleEvent = useEventStore((s) => s.toggleEvent);

    const handleEdit = (event: RecurringEvent["id"]) => {
        setEditingEvent(event);
        console.log(editingEvent);

        // Open your RecurringEventSelector with the event data
        // You'll need to modify it to handle editing mode
    };

    const handleDelete = (eventId: RecurringEvent["id"]) => {
        removeEvent(eventId);
    };

    const handleToggle = (eventId: RecurringEvent["id"]) => {
        toggleEvent(eventId);
    };

    if (events.length === 0) {
        return (
            <Card className="p-6 text-center text-gray-500">
                <p>No events found</p>
                {/* <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                        
                    }}>
                    Create your first event
                </Button> */}
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            {events.map((event) => (
                <EventItem
                    key={event.id}
                    event={event}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
}
