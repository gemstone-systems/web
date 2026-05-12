import type { Client } from "@atcute/client";
import type { Did } from "@atproto/oauth-client-browser";

// TODO: retire this in favour of querying profiles from our appview
export const getProfilePds = async ({
    rpcClient,
    repo,
}: {
    rpcClient: Client;
    repo: Did;
}) => {
    return await rpcClient.get("com.atproto.repo.getRecord", {
        params: {
            repo,
            collection: "systems.gmstn.actor.profile",
            rkey: "self",
        },
    });
};
