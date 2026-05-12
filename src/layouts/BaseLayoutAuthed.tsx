import type { ReactNode } from "react";

export const BaseLayoutAuthed = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-w-screen min-h-screen">
            <div className="flex flex-col">{children}</div>
        </div>
    );
};
