"use client";

import { AddEvent } from "./AddEvent";
import { EventList } from "./EventList";

export function EventsSettingsContent() {
    return (
        <div className="space-y-6">
            <AddEvent />

            {/* <div className="grid gap-4">
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
            </div> */}

            <div className="grid gap-4">
                <div className="space-y-4">
                    <strong className="text-lg font-bold leading-none">Your Events</strong>
                    <EventList />
                </div>
            </div>
        </div>
    );
}
