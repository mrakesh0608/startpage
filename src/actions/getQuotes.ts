"use server";

import { TZENQOUTE } from "@/components/type";

export async function getQuotes() {
    const res = await fetch("https://zenquotes.io/api/quotes");

    const json = await res.json();

    return json as TZENQOUTE[];
}
