"use client";
import { getQuotes } from "@/actions/getQuotes";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Copy, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { TIME_24_HOURS_IN_MILS } from "@/constans/time";

export function Quotes() {
    const [currentDate] = useState(new Date().toDateString());

    const { data, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["quotes", currentDate],
        queryFn: getQuotes,
        staleTime: TIME_24_HOURS_IN_MILS,
        gcTime: TIME_24_HOURS_IN_MILS,
    });

    const quote = data?.[0];

    return (
        <Card className="w-full">
            <CardContent className="p-4 pb-0">
                <p className="text-center text-lg font-bold" id="quoteText">
                    {isLoading ? "Loading..." : quote?.q}
                </p>
            </CardContent>
            {quote ? (
                <CardFooter className="flex justify-end gap-x-4 pb-2">
                    <span className="text-sm">{quote.a}</span>
                    <CopyTextBtn text={quote.q} />
                    <RotateCw
                        className={cn("size-4 cursor-pointer hover:opacity-75", {
                            "scale-105 animate-spin": isFetching,
                        })}
                        onClick={() => refetch({ cancelRefetch: true })}
                    />
                </CardFooter>
            ) : null}
        </Card>
    );
}

function CopyTextBtn({ text }: { text: string }) {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        if (!isCopied) return;

        const timeout = setTimeout(() => {
            setIsCopied(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [isCopied]);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
        setIsCopied(true);
    }, [text]);

    return (
        <Copy
            className={cn("size-4 cursor-pointer transition-all hover:opacity-75", {
                "scale-125 text-green-400": isCopied,
            })}
            onClick={handleCopy}
        />
    );
}
