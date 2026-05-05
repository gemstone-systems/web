import { SvgSpinnersPulseMultiple } from "@/components/Icons/SvgSpinnersPulseMultiple";
import { Loading } from "@/components/Misc/Loading";
import { useOAuthClient } from "@/lib/oauth";
import { useState } from "react";

export const SignIn = () => {
    const [handle, setHandle] = useState("");
    const isValidHandle = handle.includes(".");
    const client = useOAuthClient();

    if (!client) return <Loading />;

    const handleOAuthContinue = () => {
        localStorage.setItem("handle", handle);
        const doOAuth = async () => {
            try {
                await client.signIn(handle, {
                    ui_locales: "en",
                    signal: new AbortController().signal,
                });

                console.log("Never executed");
            } catch (err) {
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

    return <SvgSpinnersPulseMultiple className="text-green" />;
};
