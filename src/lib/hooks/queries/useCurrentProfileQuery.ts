import { getProfilePds } from "@/lib/api/get-profile-pds";
import { useOAuth } from "@/lib/providers/oauth";
import { useXrpcClient } from "@/lib/providers/xrpc";
import type { Client } from "@atcute/client";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const currentProfileQueryKey = (did: string | null) => ["profile", did];

export const currentProfileQueryOptions = ({
    client,
    did,
    enabled,
}: {
    client: Client | null;
    did: `did:${string}:${string}` | null;
    enabled: boolean;
}) =>
    queryOptions({
        queryKey: currentProfileQueryKey(did),
        queryFn: async () => {
            if (!client || !did) return;
            // TODO: retire this in favour of resolving profiles via our appview
            return await getProfilePds({ rpcClient: client, repo: did });
        },
        enabled,
    });

export const useCurrentProfileQuery = () => {
    const { client, isInitialised } = useXrpcClient();
    const { session } = useOAuth();

    return useQuery(
        currentProfileQueryOptions({
            client,
            did: session ? session.did : null,
            enabled: isInitialised && !!client && !!session,
        }),
    );
};
