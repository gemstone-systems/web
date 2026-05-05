import { SignIn } from "@/components/Auth/SignIn";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/login")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="border-overlay0 flex w-screen justify-center border-t pt-8">
            <SignIn />
        </div>
    );
}
