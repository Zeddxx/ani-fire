'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from "react";

// const queryClient = new QueryClient()

export const QueryProvider = ({ children } :{ children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient())
    return(
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}