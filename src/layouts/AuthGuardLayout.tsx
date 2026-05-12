import { useNavigate } from "@tanstack/react-router";
import { useOAuth } from "@/lib/oauth";
import { useEffect } from "react";
import type { ReactNode } from "react";

export const AuthGuardLayout = ({ children }: { children: ReactNode }) => {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!client && !session) {
            navigate({ to: "/login" });
        }
    }, [client, session]);

    return <>{children}</>;
};
