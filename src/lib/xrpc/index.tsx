import { Client } from "@atcute/client";
import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { useOAuthSession } from "@/lib/oauth";

const XrpcContext = createContext<Client | null>(null);

export const XrpcProvider = ({ children }: { children: ReactNode }) => {
    const session = useOAuthSession();

    const client = useMemo(() => {
        if (!session) return null;
        return new Client({ handler: session.fetchHandler.bind(session) });
    }, [session]);

    return <XrpcContext value={client}>{children}</XrpcContext>;
};

export const useXrpcClient = () => {
    const ctx = useContext(XrpcContext);
    if (ctx === undefined)
        throw new Error("useXrpcClient must be used within an XrpcProvider");
    return ctx;
};
