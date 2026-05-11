import { Outlet, createFileRoute } from "@tanstack/react-router";

import { BaseLayoutUnauthed } from "@/layouts/BaseLayoutUnauthed";
import { useOAuth } from "@/lib/oauth";
import { BaseLayoutAuthed } from "@/layouts/BaseLayoutAuthed";

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone" }],
    }),
    beforeLoad: () => {
        if (
            import.meta.env.DEV &&
            typeof window !== "undefined" &&
            window.location.hostname === "localhost"
        ) {
            window.location.replace(
                window.location.href.replace("localhost", "127.0.0.1"),
            );
            throw new Error(
                "For OAuth purposes, do not use localhost. You must use the loopback IP address at 127.0.0.1. Redirecting now.",
            );
        }
    },
});

function RouteComponent() {
    const { session, client } = useOAuth();

    if (client && session) {
        return (
            <BaseLayoutAuthed>
                <Outlet />
            </BaseLayoutAuthed>
        );
    }

    return (
        <BaseLayoutUnauthed>
            <Outlet />
        </BaseLayoutUnauthed>
    );
}
