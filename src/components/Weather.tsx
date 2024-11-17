"use client";

import { getWeather } from "@/actions/getWeather";
import { useQuery } from "@tanstack/react-query";
import { Cloud } from "lucide-react";
import Image from "next/image";
import React from "react";

const REFRESH_WEATHER_EVERY_10_MINS = 1000 * 60 * 10;

export function Weather() {
    const city = "Thane";

    const { data, isLoading } = useQuery({
        queryKey: ["weather", city],
        queryFn: async () => await getWeather(city),
        refetchInterval: REFRESH_WEATHER_EVERY_10_MINS,
    });

    return (
        <section className="space-y-2">
            <div className="flex flex-col space-x-1">
                {data ? (
                    <Image width={40} height={40} src={data?.image} alt="weather-img" />
                ) : (
                    <Cloud className="h-5 w-5" />
                )}
                <span>{isLoading ? "..." : data?.temp || "--"} &#8451;</span>
            </div>
        </section>
    );
}
