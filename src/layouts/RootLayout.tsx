import type { ReactNode } from "react";

export const RootLayout = ({ children }: { children: ReactNode }) => {
    return <div className="bg-crust text-text min-h-screen">{children}</div>;
};
