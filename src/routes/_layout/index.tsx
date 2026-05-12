import { useOAuth } from "@/lib/oauth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
    LucideArrowRight,
    LucideBookOpen,
    LucideFolderKanban,
    LucideMessageSquare,
} from "lucide-react";
import { Button } from "@/components/Animated/Button";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { UnderlineLink } from "@/components/Animated/UnderlineLink";

export const Route = createFileRoute("/_layout/")({
    component: Home,
    head: () => ({
        meta: [{ title: "Gemstone - The better workspace stack." }],
    }),
});

function Home() {
    const { session, client } = useOAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (client && session) {
            navigate({ to: "/home" });
        }
    }, [client, session]);

    return (
        <>
            <div className="flex w-full flex-1 flex-col items-center px-6 pt-24 pb-16 bg-mantle">
                <h1 className="text-text text-center text-5xl font-bold tracking-tight">
                    The better workspace stack.
                </h1>
                <p className="text-subtext1 mt-4 max-w-lg text-center text-lg">
                    Chat, projects, and knowledge — unified on an open,
                    decentralised protocol. Own your data. Choose your server.
                    Stay connected to everyone.
                </p>

                <div className="mt-10">
                    <Button
                        label="Get started"
                        icon={<LucideArrowRight height={16} width={16} />}
                        iconPosition="right"
                        className="bg-accent text-crust hover:bg-accent/90 cursor-pointer rounded-md pr-4 pl-4 py-3 font-medium transition-all"
                        labelClassName=""
                        iconClassName=""
                        underlineClassName="bg-crust"
                        onClick={() => navigate({ to: "/login" })}
                        iconTransitions={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                        iconVariants={{
                            active: {
                                x: [0, 5, -5, 0],
                                opacity: [1, 0, 0, 1],
                            },
                        }}
                    />
                </div>

                <div className="mt-20 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
                    <FacetCard
                        icon={
                            <LucideMessageSquare
                                className="text-accent"
                                height={24}
                                width={24}
                            />
                        }
                        title="Chat"
                        description="Real-time messaging for your team. A decentralised alternative to Slack and Teams."
                        available
                    />
                    <FacetCard
                        icon={
                            <LucideFolderKanban
                                className="text-accent-alt"
                                height={24}
                                width={24}
                            />
                        }
                        title="Projects"
                        description="Track work from backlog to done. Built for teams who outgrow their issue tracker."
                    />
                    <FacetCard
                        icon={
                            <LucideBookOpen
                                className="text-lavender"
                                height={24}
                                width={24}
                            />
                        }
                        title="Knowledge"
                        description="Documentation and wikis that live alongside your work, not in a separate app."
                    />
                </div>

                <p className="text-overlay2 mt-16 text-sm">
                    Powered by the{" "}
                    <UnderlineLink
                        href="https://atproto.com"
                        target="_blank"
                        underlineColor="bg-sky"
                        rel="noreferrer"
                        className="text-sky"
                    >
                        AT Protocol
                    </UnderlineLink>
                </p>
            </div>
        </>
    );
}

function FacetCard({
    icon,
    title,
    description,
    available = false,
}: {
    icon: ReactNode;
    title: string;
    description: string;
    available?: boolean;
}) {
    return (
        <div className="bg-surface0 border-surface1 flex flex-col gap-3 rounded-lg border p-5">
            <div className="flex items-center gap-2">
                {icon}
                <h3 className="text-text text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-subtext0 text-sm leading-relaxed">
                {description}
            </p>
            {available ? (
                <span className="text-positive text-xs font-medium">
                    Available now
                </span>
            ) : (
                <span className="text-overlay2 text-xs">Coming soon</span>
            )}
        </div>
    );
}
