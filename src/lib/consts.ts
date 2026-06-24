const __DEV__oAuthCallbackUrl = "http://127.0.0.1:3000/oauth/callback";

const oAuthScopes = ["atproto", "repo:systems.gmstn.chat.message", "blob:*/*"];

const oAuthScopesString = oAuthScopes
    .reduce((prev, curr) => `${prev} ${curr}`)
    .trim();

export const __DEV__loopbackOAuthMetadata = {
    client_id: `http://localhost?redirect_uri=${encodeURIComponent(__DEV__oAuthCallbackUrl)}&scope=${encodeURIComponent(oAuthScopesString)}`,
    redirect_uris: [__DEV__oAuthCallbackUrl],
    scope: oAuthScopesString,
    token_endpoint_auth_method: "none",
    response_types: ["code"],
    grant_types: ["authorization_code", "refresh_token"],
    application_type: "web",
    dpop_bound_access_tokens: true,
    subject_type: "public",
    client_name: "Gemstone Web Localhost",
};

export const DEFAULT_STALE_TIME = 5 * 60 * 1000;

/**
 * Base URL of the geode shard for chat history + the live socket. Geode
 * defaults to :3000, which the web dev server already occupies, so run geode on
 * another port locally (or set VITE_GEODE_URL).
 */
export const __DEV__geodeUrl =
    import.meta.env.VITE_GEODE_URL ?? "http://127.0.0.1:3001";

/**
 * TODO: remove
 */
export const __DEV__workspaceUri =
    "at://did:plc:qxichs7jsycphrsmbujwqbfb/systems.gmstn.chat.workspace/3mmqwafkgq722";

/**
 * TODO: remove
 */
export const __DEV__channelRef = {
    $type: "com.atproto.repo.strongRef",
    uri: "at://did:plc:qxichs7jsycphrsmbujwqbfb/systems.gmstn.chat.channel/3mmqwb2c4k722",
    cid: "bafyreicyap4xwlo3rf2ccxogmtsbidsot6dvcjsiz3euaxrx2csbnjrnzq",
} as const;

export const CONSTELLATION_URL = new URL(
    "https://constellation.microcosm.blue/",
);

export const HANDLE_RESOLVER_URL = new URL("https://slingshot.microcosm.blue/");

export const SLINGSHOT_URL = new URL("https://slingshot.microcosm.blue/");

/**
 * Default Bluesky client URL. Use the base route, e.g. https://catsky.social/ or https://bsky.app/ or https://witchsky.app/
 * Configurable by client in the future.
 */
// export const DEFAULT_BSKY_CLIENT_URL = new URL("https://catsky.social/");

/**
 * Lodestone is a lightweight universal AT-URI resolver service.
 * See more here: https://github.com/gemstone-systems/lodestone/
 */
// export const LODESTONE_URL = new URL("https://lodestone.gmstn.systems/");
