import { useOAuth } from "@/lib/oauth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/home/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    if (!client && !session) {
        navigate({ to: "/login" });
    }

    return <div>Hello "/_layout/home/"!</div>;
}
