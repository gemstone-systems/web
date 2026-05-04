import { useRouter } from "@tanstack/react-router";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import type { ReactNode } from "react";
import {
    BrowserOAuthClient,
    type OAuthSession,
} from "@atproto/oauth-client-browser";
import {
    HANDLE_RESOLVER_URL,
    __DEV__loopbackOAuthMetadata,
} from "@/lib/consts";

const OAuthContext = createContext<{
    client: BrowserOAuthClient | null;
    session: OAuthSession | null;
    callbackHandler: (arg0: URLSearchParams) => void;
    handle: string | null;
    setHandle: (arg0: string) => void;
    signOut: () => void;
} | null>(null);

export const OAuthProvider = ({ children }: { children: ReactNode }) => {
    const [client, setClient] = useState<BrowserOAuthClient | null>(null);
    const [session, setSession] = useState<OAuthSession | null>(null);
    const [handle, setHandle] = useState<string | null>(null);
    const callbackHandler = useCallback(
        (params: URLSearchParams) => {
            if (!client)
                throw new Error(
                    "OAuth client was not initialised. Could not perform callback.",
                );
            setClient((prevClient) => {
                if (!prevClient)
                    throw new Error(
                        "OAuth client was not initialised. Could not perform callback.",
                    );
                prevClient.callback(params);
                return Object.assign(
                    Object.create(Object.getPrototypeOf(prevClient)),
                    prevClient,
                );
            });
        },
        [client],
    );

    // when we move this to a package, remove this.
    const router = useRouter();

    const signOut = () => {
        if (!session)
            throw new Error(
                "No OAuth session found. You should be careful about the ordering of your calls. Ensure that the client and the session is loaded before attempting to call `signOut` on the OAuth provider.",
            );

        session.signOut();
        setSession(null);
    };

    // When we release the package, we need to remove this and replace it with a prop that takes in any effectful function and runs it here.
    // For now, we just perform the effect.

    useEffect(() => {
        router.invalidate();
    }, [session]);

    useEffect(() => {
        const oAuthClient = new BrowserOAuthClient({
            // @ts-expect-error fuck it we ball
            clientMetadata: __DEV__loopbackOAuthMetadata,
            handleResolver: HANDLE_RESOLVER_URL,
        });
        const initOAuth = async () => {
            const oAuthInit = await oAuthClient.init();
            setClient(oAuthClient);

            if (oAuthInit) {
                const { session: restoredSess, state: authState } = oAuthInit;
                if (authState != null) {
                    console.log(
                        `${restoredSess.sub} was successfully authenticated (state: ${authState})`,
                    );
                } else {
                    console.log(
                        `${restoredSess.sub} was restored (last active session)`,
                    );
                }
                setSession(restoredSess);
            }
        };

        const handleFromStorage = localStorage.getItem("handle");
        setHandle(handleFromStorage);

        initOAuth().catch((e: unknown) => {
            console.error("Could not init OAuth client");
            console.error(e);
        });
    }, []);

    const contextValue = {
        client,
        session,
        callbackHandler,
        handle,
        setHandle,
        signOut,
    };

    return <OAuthContext value={contextValue}>{children}</OAuthContext>;
};

export const useOAuth = () => {
    const ctx = useContext(OAuthContext);
    if (!ctx) throw new Error("useOAuth must be used within an AuthProvider");
    return ctx;
};

export const useOAuthClient = () => {
    const { client } = useOAuth();
    return client;
};

export const useOAuthSession = () => {
    const { session } = useOAuth();
    return session;
};
