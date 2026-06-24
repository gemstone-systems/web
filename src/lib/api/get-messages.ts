import { messagesResponseSchema } from "@/lib/geode/frames";

/** Fetch newest-first message history for a channel from a geode shard. */
export const getMessages = async ({
    geodeUrl,
    channel,
    limit,
    cursor,
}: {
    geodeUrl: string;
    channel: string;
    limit?: number;
    cursor?: number;
}) => {
    const url = new URL("/messages", geodeUrl);
    url.searchParams.set("channel", channel);
    if (limit != null) url.searchParams.set("limit", String(limit));
    if (cursor != null) url.searchParams.set("cursor", String(cursor));

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`geode /messages responded ${res.status}`);
    }
    return messagesResponseSchema.parse(await res.json());
};
