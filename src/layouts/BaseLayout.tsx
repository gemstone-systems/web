import { NavBar } from "@/components/Nav/NavBar";
import type { ReactNode } from "react";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavBar />
            <div className="w-screen flex flex-col min-h-screen">
                {children}
            </div>
        </>
    );
};
