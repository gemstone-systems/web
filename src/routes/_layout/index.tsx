import { BaseLayout } from "@/layouts/BaseLayout";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({ component: Home });

function Home() {
    return (
        <BaseLayout>
            <div className="border-overlay0 flex w-screen justify-center border-t pt-8 flex-col items-center">
                <h1 className="text-4xl font-bold">
                    Welcome to TanStack Start
                </h1>
                <p className="mt-4 text-lg">log in :)</p>
                <Link to="/login">Log In</Link>
            </div>
        </BaseLayout>
    );
}
