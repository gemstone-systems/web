import { HeadContent, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import "../styles.css";
import { RootLayout } from "@/layouts/RootLayout";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <HeadContent />
            <RootLayout>
                <Outlet />
                <TanStackDevtools
                    config={{
                        position: "bottom-right",
                    }}
                    plugins={[
                        {
                            name: "TanStack Router",
                            render: <TanStackRouterDevtoolsPanel />,
                        },
                        {
                            name: "TanStack Query",
                            render: <ReactQueryDevtoolsPanel />,
                        },
                    ]}
                />
            </RootLayout>
        </>
    );
}
