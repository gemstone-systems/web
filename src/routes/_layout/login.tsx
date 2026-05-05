import { SignIn } from "@/components/Auth/SignIn";
import { useOAuth } from "@/lib/oauth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/login")({
    component: RouteComponent,
});

function RouteComponent() {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    if (client && session) {
        navigate({ to: "/" });
    }

    return (
        <div className="border-overlay0 flex w-screen justify-center border-t pt-8">
            <SignIn />
        </div>
    );
}
