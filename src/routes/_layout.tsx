import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Nav/Footer";
import { NavBar } from "@/components/Nav/NavBar";
import { BaseLayout } from "@/layouts/BaseLayout";

export const Route = createFileRoute("/_layout")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="flex min-w-screen flex-col items-center justify-center">
            <NavBar />
            <BaseLayout>
                <Outlet />
            </BaseLayout>
            <Footer />
        </div>
    );
}
