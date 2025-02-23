import React, { useMemo } from "react";
import { format } from "date-fns";
import { Calendar, Trash2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RecurringEvent } from "./useEventStore";

export function EventItem({
    event,

    onDelete,
    onToggle,
}: {
    event: RecurringEvent;
    onEdit: (id: RecurringEvent["id"]) => void;
    onDelete: (id: RecurringEvent["id"]) => void;
    onToggle: (id: RecurringEvent["id"]) => void;
}) {
    const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

    const recurrenceText = useMemo(() => {
        const freq = event.frequency > 1 ? `${event.frequency} ${event.interval}s` : event.interval;

        switch (event.interval) {
            case "day":
                return `Every ${freq}`;
            case "week":
                return `Every ${freq} on ${event.selectedDays?.join(", ")}`;
            case "month":
                return `Every ${freq} on ${
                    event.monthlyOption === "day"
                        ? `day ${format(new Date(event.startDate), "d")}`
                        : `the ${format(new Date(event.startDate), "eeee")}`
                }`;
            case "year":
                return `Every ${freq}`;
            default:
                return "";
        }
    }, [event]);

    return (
        <Card
            className={`bg-gray-100 text-gray-500 dark:bg-black dark:text-white ${!event.isActive ? "opacity-60" : ""}`}>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Until {format(new Date(event.endDate), "MMM d, yyyy")}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={event.isActive}
                        onCheckedChange={() => onToggle(event.id)}
                        aria-label="Toggle event"
                    />
                    {/* <Button variant="ghost" size="icon" onClick={() => onEdit(event.id)}>
                        <Edit className="h-4 w-4" />
                    </Button> */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => setShowDeleteDialog(true)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {event.description && <p className="text-gray-600">{event.description}</p>}
                    <div className="flex gap-2">
                        <Badge variant="secondary">{recurrenceText}</Badge>
                        {!event.isActive && (
                            <Badge variant="outline" className="text-gray-500">
                                Inactive
                            </Badge>
                        )}
                    </div>
                </div>
            </CardContent>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Recurring Event</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this recurring event? This action cannot
                            be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => {
                                onDelete(event.id);
                                setShowDeleteDialog(false);
                            }}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
}
