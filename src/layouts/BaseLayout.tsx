import type { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-screen flex flex-col min-h-screen">{children}</div>
    );
};
