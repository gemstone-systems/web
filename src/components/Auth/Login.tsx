import { Button } from "@/components/Animated/Button";
import { UnderlineLink } from "@/components/Animated/UnderlineLink";
import { Loading } from "@/components/Misc/Loading";
import { useOAuth } from "@/lib/oauth";
import {
    LucideAtSign,
    LucideCircleUserRound,
    LucideInfo,
    LucideLogIn,
} from "lucide-react";
import { useState } from "react";

export const Login = () => {
    const [handle, setHandle] = useState("");
    const isValidHandle = handle.includes(".");
    const { client, isInitialised } = useOAuth();

    if (!isInitialised) return <Loading />;

    const handleOAuthContinue = () => {
        localStorage.setItem("handle", handle);
        const doOAuth = async () => {
            if (!client) return;
            try {
                await client.signIn(handle, {
                    ui_locales: "en",
                    signal: new AbortController().signal,
                });

                console.log("Never executed");
            } catch (err) {
                console.error(err);
                console.log(
                    'The user aborted the authorization process by navigating "back"',
                );
            }
        };

        doOAuth().catch((e: unknown) => {
            console.error(
                "Something went wrong while trying to do OAuth handover.",
            );
            console.error(e);
        });
    };

    const loginIcon = <LucideLogIn height={16} width={16} />;

    return (
        <div className="bg-surface0 border-surface1 m-36 flex max-w-1/4 flex-col items-center rounded-lg border px-6 py-4">
            <LucideCircleUserRound
                height={24}
                width={24}
                className="mt-4 mb-1"
            />
            <h2 className="text-xl font-semibold tracking-wide">Sign In</h2>
            <p className="text-subtext m-4 min-w-64 justify-center flex gap-1">
                Sign in to the
                <UnderlineLink
                    href="https://atproto.com"
                    underlineColor="bg-blue"
                    className="text-sky"
                    target="_blank"
                    rel="noreferrer"
                >
                    Atmosphere
                </UnderlineLink>
            </p>{" "}
            <div className="w-full">
                <div className="flex items-center gap-0.5">
                    <p className="p-0.5">Handle</p>
                    <div className="group relative">
                        <LucideInfo
                            className="text-accent cursor-pointer"
                            height={14}
                            width={14}
                        />
                        <div className="bg-surface1 pointer-events-none absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-xl px-3 py-2 text-sm opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                            If you have a Bluesky, Blacksky, Tangled, or any
                            other ATProto account, you can use that account's
                            handle.
                            <div className="border-t-surface1 absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent" />
                        </div>
                    </div>
                </div>
                <div className="border-surface1 group has-focus:border-accent flex items-center overflow-hidden rounded-md border transition-all">
                    <LucideAtSign
                        className="text-subtext group-has-focus:text-accent h-full w-max px-2 transition-all"
                        height={16}
                        width={16}
                    />
                    <div className="bg-surface1 group-has-focus:bg-accent w-px self-stretch transition-all" />
                    <input
                        placeholder="arene.gmstn.systems"
                        className="peer w-full rounded-tr-sm rounded-br-sm p-1 py-2 pl-2 transition-all focus:outline-0"
                        onChange={(e) => setHandle(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleOAuthContinue()
                        }
                    />
                </div>
            </div>
            <Button
                label="Continue"
                icon={loginIcon}
                iconPosition="right"
                className="hover:bg-accent/90 hover:text-crust hover:disabled:bg-surface1 hover:disabled:text-text bg-accent text-crust disabled:bg-surface1 disabled:text-text m-2 mt-6 mb-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md p-2 transition-all disabled:cursor-not-allowed"
                disabled={!isValidHandle}
                labelClassName=""
                iconClassName=""
                underlineClassName="bg-crust"
                onClick={handleOAuthContinue}
                iconTransitions={{ duration: 0.2, ease: "easeInOut" }}
                iconVariants={{
                    active: {
                        x: [0, 5, -5, 0],
                        opacity: [1, 0, 0, 1],
                    },
                }}
            />
        </div>
    );
};
