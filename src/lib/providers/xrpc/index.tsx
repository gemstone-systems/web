import { Client } from "@atcute/client";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useOAuth } from "@/lib/providers/oauth";
import { } from "@atcute/atproto";

const XrpcContext = createContext<{
    client: Client | null;
    isInitialised: boolean;
} | null>(null);

export const XrpcProvider = ({ children }: { children: ReactNode }) => {
    const { session, isInitialised } = useOAuth();

    const client = useMemo(() => {
        if (!session) return null;
        return new Client({ handler: session.fetchHandler.bind(session) });
    }, [session]);

    return (
        <XrpcContext value={{ client, isInitialised }}>{children}</XrpcContext>
    );
};

export const useXrpcClient = () => {
    const ctx = useContext(XrpcContext);
    if (!ctx)
        throw new Error("useXrpcClient must be used within an XrpcProvider");
    return ctx;
};
