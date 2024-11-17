"use client";
import { getQuotes } from "@/actions/getQuotes";
import { useQuery } from "@tanstack/react-query";

import { Card, CardContent, CardFooter } from "./ui/card";
import { Copy, RotateCcw } from "lucide-react";

export function Quotes() {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ["quotes"],
		queryFn: getQuotes,
	});

	const quote = data?.[0];

	return (
		<Card>
			<CardContent className="p-4">
				<p className="text-center text-xl">{isLoading ? "Loading" : quote?.q}</p>
			</CardContent>
			{quote ? (
				<CardFooter className=" justify-between  pb-1 px-4">
					<span>{quote.a}</span>
					<div className="  flex gap-x-4">
						<RotateCcw className="cursor-pointer  hover:opacity-75" size={18} onClick={() => refetch({ cancelRefetch: true })} />
						<Copy className="cursor-pointer  hover:opacity-75" size={18} onClick={() => navigator.clipboard.writeText(quote.q)} />
					</div>
				</CardFooter>
			) : null}
		</Card>
	);
}
