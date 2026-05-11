import { NavBarAuthed } from "@/components/Nav/NavBarAuthed";
import type { ReactNode } from "react";

export const BaseLayoutAuthed = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavBarAuthed />
            <div className="w-screen flex flex-col min-h-screen">
                {children}
            </div>
        </>
    );
};
