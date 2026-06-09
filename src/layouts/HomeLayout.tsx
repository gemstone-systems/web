import { NavBarAuthed } from "@/components/Nav/NavBarAuthed";
import type { ReactNode } from "react";
import { Group, Panel, Separator, useDefaultLayout } from "react-resizable-panels";

export const HomeLayout = ({ children }: { children: ReactNode }) => {
    const { defaultLayout, onLayoutChanged } = useDefaultLayout({ id: "base-layout-authed", storage: localStorage})

    return (
        <Group className="flex min-w-screen min-h-screen" defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
            <Panel defaultSize="20%" minSize="15%" maxSize="30%">
                <NavBarAuthed />
            </Panel>
            <Separator className="bg-overlay0 w-px data-[separator=hover]:bg-overlay1  transition-all"/> 
            <Panel>
                <div className="flex h-full flex-col">{children}</div>
            </Panel>
        </Group>
    );
};
