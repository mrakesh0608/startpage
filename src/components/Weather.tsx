"use client";

import { getWeather } from "@/actions/getWeather";
import { useQuery } from "@tanstack/react-query";
import { Cloud } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useUserPreferencesStore } from "./userPreferencesStore";

const REFRESH_WEATHER_EVERY_10_MINS = 1000 * 60 * 10;

export function Weather() {
    const weatherCity = useUserPreferencesStore((s) => s.userPreferences.weatherCity);

    const { data, isLoading } = useQuery({
        queryKey: ["weather", weatherCity],
        queryFn: async () => await getWeather(weatherCity),
        refetchInterval: REFRESH_WEATHER_EVERY_10_MINS,
        enabled: weatherCity.length > 1,
    });

    return (
        <section className="space-y-2">
            <div className="flex flex-col space-x-1">
                {data ? (
                    <Image
                        width={48}
                        height={48}
                        src={data?.image}
                        alt="weather-img"
                        className="dark:invert"
                    />
                ) : (
                    <Cloud className="h-5 w-5" />
                )}
                <span>{isLoading ? "..." : data?.temp || "--"} &#8451;</span>
            </div>
        </section>
    );
}
