import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_authed/home/")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone - Home" }],
    }),
});

function RouteComponent() {
    return <div>Hello "/_layout/home/"!</div>;
}
