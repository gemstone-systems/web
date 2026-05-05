import { Link } from "@tanstack/react-router";

export const NavBarUnauthed = () => {
    return (
        <div className="bg-base flex w-full items-center justify-between py-6 px-80">
            <Link to="/">
                {/* eventual brand icon goes here */}
                <span className="text-lg font-semibold">Gemstone</span>
            </Link>
        </div>
    );
};
