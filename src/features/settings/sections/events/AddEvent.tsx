"use client";

import { useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { RecurringEvent, useEventStore } from "./useEventStore";
import { Input } from "@/components/ui/input";

type days = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

const weekDays: { label: string; value: days }[] = [
    { label: "M", value: "MON" },
    { label: "T", value: "TUE" },
    { label: "W", value: "WED" },
    { label: "T", value: "THU" },
    { label: "F", value: "FRI" },
    { label: "S", value: "SAT" },
    { label: "S", value: "SUN" },
];

const endTimeDiff = 30 * 24 * 60 * 60 * 1000;

export function AddEvent() {
    const addEvent = useEventStore((state) => state.addEvent);

    const [isOpen, setIsOpen] = useState(false);

    const [title, setTitle] = useState("");

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(Date.now() + endTimeDiff));

    const [frequency, setFrequency] = useState("1");
    const [interval, setInterval] = useState<RecurringEvent["interval"]>("week");

    const [selectedDays, setSelectedDays] = useState<days[]>(["SUN"]);
    const [monthlyOption, setMonthlyOption] = useState<RecurringEvent["monthlyOption"]>("day");

    const handleSave = useCallback(() => {
        if (!title) return;

        addEvent({
            startDate,
            endDate,

            frequency: parseInt(frequency),
            interval: interval,

            selectedDays: interval === "week" ? selectedDays : undefined,
            monthlyOption: interval === "month" ? monthlyOption : undefined,

            title: title,
            isActive: true,
        });

        setIsOpen(false);
        toast.success("Event scheduled successfully");
    }, [addEvent, endDate, frequency, interval, monthlyOption, selectedDays, startDate, title]);

    const frequencyOptions = useMemo(() => {
        switch (interval) {
            case "day":
                return Array.from({ length: 7 }, (_, i) => i + 1);
            case "week":
            case "month":
                return Array.from({ length: 4 }, (_, i) => i + 1);
            case "year":
                return Array.from({ length: 2 }, (_, i) => i + 1);
            default:
                return [1];
        }
    }, [interval]);

    const toggleDay = useCallback(
        (day: days) => {
            if (selectedDays.includes(day)) setSelectedDays(selectedDays.filter((d) => d !== day));
            else setSelectedDays([...selectedDays, day]);
        },
        [selectedDays],
    );

    const untilText = useMemo(() => {
        const freqPluralText = parseInt(frequency) > 1 ? "s" : "";

        switch (interval) {
            case "day":
                return `Occurs every ${frequency} day${freqPluralText} until`;
            case "week":
                return `Occurs every ${frequency} week${freqPluralText} on ${selectedDays.join(", ")} until`;
            case "month":
                return `Occurs every ${frequency} month${freqPluralText} on ${monthlyOption === "day" ? `day ${format(startDate, "d")}` : `the ${format(startDate, "eeee")}`} until`;
            case "year":
                return `Occurs every ${frequency} year${freqPluralText} until`;
            default:
                return `Occurs every ..`;
        }
    }, [frequency, interval, monthlyOption, selectedDays, startDate]);

    const handleFrequencyChange = useCallback(
        (value: string) => {
            setFrequency(value);
            // Reset selected days if switching from a lower to higher frequency
            if (parseInt(value) > parseInt(frequency) && interval === "week") {
                setSelectedDays(["SUN"]);
            }
        },
        [frequency, interval],
    );

    const handleIntervalChange = useCallback((value: RecurringEvent["interval"]) => {
        setInterval(value);

        // Reset frequency if switching intervals
        setFrequency("1");

        // Reset selected days when switching from week
        if (value !== "week") setSelectedDays(["SUN"]);
    }, []);

    return (
        <>
            <div className="flex justify-end">
                <Button
                    variant="default"
                    className="bg-yellow-400 hover:bg-yellow-500"
                    onClick={() => setIsOpen(true)}>
                    Add Events
                </Button>
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Event</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required={true}
                            className="col-span-3"
                            placeholder="Title"
                            autoFocus={true}
                            minLength={1}
                        />

                        {/* Start Date */}
                        <div className="flex items-center gap-2">
                            <span className="min-w-16">Start</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal">
                                        <Calendar className="mr-2 size-4" />
                                        {format(startDate, "yyyy-MM-dd")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={startDate}
                                        onSelect={(date) => date && setStartDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Repeat Frequency */}
                        <div className="flex items-center gap-2">
                            <span className="min-w-16">Repeat every</span>
                            <Select value={frequency} onValueChange={handleFrequencyChange}>
                                <SelectTrigger className="w-20">
                                    <SelectValue>{frequency}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {frequencyOptions.map((num) => (
                                        <SelectItem key={num} value={num.toString()}>
                                            {num}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={interval} onValueChange={handleIntervalChange}>
                                <SelectTrigger className="w-32">
                                    <SelectValue>{interval}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">day</SelectItem>
                                    <SelectItem value="week">week</SelectItem>
                                    <SelectItem value="month">month</SelectItem>
                                    <SelectItem value="year">year</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Weekly Options */}
                        {interval === "week" && (
                            <div className="flex gap-2">
                                {weekDays.map((day) => (
                                    <Button
                                        key={day.value}
                                        className="size-10 p-0"
                                        variant={
                                            selectedDays.includes(day.value) ? "default" : "outline"
                                        }
                                        onClick={() => toggleDay(day.value)}>
                                        {day.label}
                                    </Button>
                                ))}
                            </div>
                        )}

                        {/* Monthly Options */}
                        {interval === "month" && (
                            <RadioGroup
                                value={monthlyOption}
                                onValueChange={setMonthlyOption as never}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="day" id="day" />
                                    <Label htmlFor="day">On day {format(startDate, "d")}</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="weekday" id="weekday" />
                                    <Label htmlFor="weekday">
                                        On the {format(startDate, "eeee")} of the month
                                    </Label>
                                </div>
                            </RadioGroup>
                        )}

                        {/* Description Text */}
                        <div className="text-sm text-gray-500">{untilText}</div>

                        {/* End Date */}
                        <div className="flex items-center gap-2">
                            <span className="min-w-16">End</span>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start font-normal">
                                        <Calendar className="mr-2 size-4" />
                                        {format(endDate, "MMM dd, yyyy")}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={endDate}
                                        onSelect={(date) => date && setEndDate(date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-end">
                            <Button
                                variant="default"
                                className="bg-yellow-400 hover:bg-yellow-500"
                                onClick={handleSave}>
                                Save
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
