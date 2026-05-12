import { Login } from "@/components/Auth/Login";
import { useOAuth } from "@/lib/oauth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_layout/login")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone - Log in" }],
    }),
});

function RouteComponent() {
    const { session, isInitialised } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isInitialised && session) {
            navigate({ to: "/" });
        }
    }, [isInitialised, session]);

    return (
        <div className="flex w-screen justify-center pt-8">
            <Login />
        </div>
    );
}
