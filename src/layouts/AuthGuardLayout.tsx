import { useNavigate } from "@tanstack/react-router";
import { Loading } from "@/components/Misc/Loading";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useOAuth } from "@/lib/providers/oauth";

export const AuthGuardLayout = ({ children }: { children: ReactNode }) => {
    const { session, isInitialised } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialised && !session) {
            navigate({ to: "/login" });
        }
    }, [isInitialised, session]);

    if (!isInitialised) return <Loading />;

    return <>{children}</>;
};
