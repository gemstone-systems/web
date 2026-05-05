import { NavBarUnauthed } from "@/components/Nav/NavBarUnauthed";
import { BaseLayout } from "@/layouts/BaseLayout";
import { useOAuth } from "@/lib/oauth";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
    component: Home,
    head: () => ({
        meta: [{ title: "Gemstone - The better workspace stack." }],
    }),
});

function Home() {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    if (client && session) {
        navigate({ to: "/home" });
    }

    return (
        <BaseLayout>
            <NavBarUnauthed />
            <div className="flex w-screen justify-center pt-8 flex-col items-center">
                <p>The better workspace stack.</p>
            </div>
        </BaseLayout>
    );
}
