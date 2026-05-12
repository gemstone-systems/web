import { Loading } from "@/components/Misc/Loading";
import { HomeLayout } from "@/layouts/HomeLayout";
import { useXrpcClient } from "@/lib/providers/xrpc";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_authed/home/")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone - Home" }],
    }),
});

function RouteComponent() {
    const { client } = useXrpcClient();

    if (!client) return <Loading />;

    return (
        <HomeLayout>
            <div>Heh</div>
        </HomeLayout>
    );
}
