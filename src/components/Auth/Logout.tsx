import { useNavigate } from "@tanstack/react-router";
import { LucideLogOut } from "lucide-react";
import { Button } from "@/components/Animated/Button";
import { useOAuth } from "@/lib/providers/oauth";

export const LogoutButton = () => {
    const { signOut } = useOAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        navigate({ to: "/" });
    };

    return (
        <Button
            icon={<LucideLogOut height={16} width={16} />}
            label="Sign Out"
            className="hover:bg-surface1 cursor-pointer rounded-b-sm p-2 pl-4 transition-all"
            labelClassName="text-sm text-negative"
            onClick={handleSignOut}
            iconTransitions={{ duration: 0.2, ease: "easeInOut" }}
            iconVariants={{
                active: {
                    x: [0, 3, -3, 0],
                    opacity: [1, 0, 0, 1],
                },
            }}
            iconClassName="text-negative"
            underlineClassName="bg-negative"
        />
    );
};
