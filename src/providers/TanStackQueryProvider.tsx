"use client";

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { TIME_10_MIN_IN_MILS } from "@/constans/time";

export default function TanStackQueryProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: TIME_10_MIN_IN_MILS,
                    },
                },
            }),
    );

    const [persister] = useState(() =>
        createSyncStoragePersister({
            storage: window.localStorage,
        }),
    );

    return (
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
            {children}
            <ReactQueryDevtools buttonPosition="top-right" />
        </PersistQueryClientProvider>
    );
}
