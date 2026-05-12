import { OAuthProvider } from "@/lib/providers/oauth";
import { XrpcProvider } from "@/lib/providers/xrpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <OAuthProvider>
                <XrpcProvider>
                    <div className="bg-base text-text">{children}</div>
                </XrpcProvider>
            </OAuthProvider>
        </QueryClientProvider>
    );
};
