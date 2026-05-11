import { NavBarAuthed } from "@/components/Nav/NavBarAuthed";
import { NavBarUnauthed } from "@/components/Nav/NavBarUnauthed";
import { useOAuth } from "@/lib/oauth";

export const NavBar = () => {
    const { session, client } = useOAuth();

    if (client && session) {
        return (
            <>
                <NavBarAuthed />
            </>
        );
    }

    return (
        <>
            <NavBarUnauthed />
        </>
    );
};
