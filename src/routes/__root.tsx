import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles.css";
import { RootLayout } from "@/layouts/RootLayout";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <HeadContent />
            <RootLayout>
                <Outlet />
            </RootLayout>
            <TanStackDevtools
                config={{
                    position: "bottom-right",
                }}
                plugins={[
                    {
                        name: "TanStack Router",
                        render: <TanStackRouterDevtoolsPanel />,
                    },
                ]}
            />
        </>
    );
}
