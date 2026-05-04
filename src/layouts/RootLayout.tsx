import { OAuthProvider } from "@/lib/oauth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <OAuthProvider>
                <div className="bg-base text-text">{children}</div>
            </OAuthProvider>
        </QueryClientProvider>
    );
};
