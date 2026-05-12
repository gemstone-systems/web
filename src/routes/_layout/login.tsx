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
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (client && session) {
            navigate({ to: "/" });
        }
    }, [client, session]);

    return (
        <div className="flex w-screen justify-center pt-8">
            <Login />
        </div>
    );
}
