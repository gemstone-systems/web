import { BaseLayout } from "@/layouts/BaseLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({ component: Home });

function Home() {
    return (
        <BaseLayout>
                <h1 className="text-4xl font-bold">
                    Welcome to TanStack Start
                </h1>
                <p className="mt-4 text-lg">
                    Edit <code>src/routes/index.tsx</code> to get started.
                </p>
        </BaseLayout>
    );
}
