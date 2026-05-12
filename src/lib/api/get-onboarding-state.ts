import type { BrowserOAuthClient } from "@atproto/oauth-client-browser";

// NOTE: this is explicitly a non-xrpc api request.
// there are a limited number of these exposed by our appview.

// @ts-expect-error temporary until we remove the stub implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/require-await, no-unused-vars -- temporary until we remove the stub implementation.
export const getOnboardingState = async (client: BrowserOAuthClient) => {
    // const APPVIEW_URL = new URL("https://api.gmstn.systems");
    // const req = new Request(`${APPVIEW_URL}/api/onboarding/`, {
    //     method: "GET",
    //     headers: { Accept: "application/json" },
    // });
    //
    // const res = await fetch(req)
    // const data: unknown = await res.json();
    //
    // const parseResult = schema.safeParse(data);
    // if(!parseResult.ok) {
    //     console.error(parseResult.error);
    //     throw new Error("did not get back valid response from api. check the response.");
    // }
    //
    // return parseResult.data;

    const stubImplResult: OnboardingState = {};

    return stubImplResult;
};

interface OnboardingState {
    updatedAt?: Date;
    projects?: {
        onboardedAt: Date;
    };
    knowledge?: {
        onboardedAt: Date;
    };
    chat?: {
        onboardedAt: Date;
    };
}
