import { useNavigate } from "@tanstack/react-router";
import { useOAuth } from "@/lib/oauth";
import type { ReactNode } from "react";

export const AuthGuardLayout = ({ children }: { children: ReactNode }) => {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    if (!client && !session) {
        navigate({ to: "/login" });
    }

    return <>{children}</>;
};
