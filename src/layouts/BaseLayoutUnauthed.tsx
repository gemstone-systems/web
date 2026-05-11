import { NavBarUnauthed } from "@/components/Nav/NavBarUnauthed";
import type { ReactNode } from "react";

export const BaseLayoutUnauthed = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-w-screen flex-col items-center justify-center">
            <NavBarUnauthed />
            <div className="w-screen flex flex-col min-h-screen">
                {children}
            </div>
        </div>
    );
};
