import { SignIn } from "@/components/Auth/SignIn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/login")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="border-overlay0 flex w-screen justify-center border-t pt-8">
            <div className="bg-surface0 border-surface1 m-36 flex max-w-1/4 flex-col items-center rounded-md border px-6 py-4">
                <SignIn />
            </div>
        </div>
    );
}
