"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
 defaultOptions: {
  queries: {
   refetchOnWindowFocus: false,
   retry: false,
  },
 },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
 return (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
 );
}
