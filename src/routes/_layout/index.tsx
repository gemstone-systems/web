import { BaseLayout } from "@/layouts/BaseLayout";
import { useOAuth } from "@/lib/oauth";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({ component: Home });

function Home() {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    if (client && session) {
        navigate({ to: "/home" });
    }

    return (
        <BaseLayout>
            <div className="flex w-screen justify-center pt-8 flex-col items-center">
                <h1 className="text-4xl font-bold">
                    Welcome to TanStack Start
                </h1>
                <p className="mt-4 text-lg">log in :)</p>
                <Link to="/login">Log In</Link>
            </div>
        </BaseLayout>
    );
}
