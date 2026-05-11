import { AuthGuardLayout } from "@/layouts/AuthGuardLayout";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_authed")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <AuthGuardLayout>
            <Outlet />
        </AuthGuardLayout>
    );
}
