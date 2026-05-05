import { Login } from "@/components/Auth/Login";
import { useOAuth } from "@/lib/oauth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/login")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone - Log in" }],
    }),
});

function RouteComponent() {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    if (client && session) {
        navigate({ to: "/" });
    }

    return (
        <div className="flex w-screen justify-center pt-8">
            <Login />
        </div>
    );
}
