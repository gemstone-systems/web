import { Outlet, createFileRoute } from "@tanstack/react-router";

import { BaseLayout } from "@/layouts/BaseLayout";

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-w-screen flex-col items-center justify-center">
            <BaseLayout>
                <Outlet />
            </BaseLayout>
        </div>
    );
}
