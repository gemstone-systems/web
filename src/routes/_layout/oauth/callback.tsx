import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useOAuthSession } from "@/lib/oauth";
import { Loading } from "@/components/Misc/Loading";

export const Route = createFileRoute("/_layout/oauth/callback")({
    component: RouteComponent,
        head: () => ({
        meta: [{ title: "Authenticating..." }],
    }),
});

function RouteComponent() {
    const session = useOAuthSession();

    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate({ to: "/" });
        }
    }, [session, navigate]);

    if (!session)
        return (
            <div>
                <Loading />
                <p>Wow your oauth callback is taking a while isn't it?</p>
                <p>omg easter egg??</p>
            </div>
        );

    return (
        <div>
            <p>Signed in as {session.did}</p>
            <p>Wow your oauth callback is taking a while isn't it?</p>
            <p>omg easter egg??</p>
        </div>
    );
}
