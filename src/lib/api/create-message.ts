import type { Client } from "@atcute/client";
import type { Did } from "@atproto/oauth-client-browser";
import { __DEV__channelRef } from "@/lib/consts";
import {
    CHAT_MESSAGE_NSID,
    chatMessageRecordSchema,
} from "@/lib/lexicons/chat";

export const createMessage = async ({
    client,
    repo,
    content,
}: {
    client: Client;
    repo: Did;
    content: string;
}) => {
    const record = chatMessageRecordSchema.parse({
        $type: CHAT_MESSAGE_NSID,
        // TODO: change to use real channel data
        channel: __DEV__channelRef,
        content,
        createdAt: new Date().toISOString(),
    });

    const res = await client.post("com.atproto.repo.createRecord", {
        input: {
            repo,
            collection: CHAT_MESSAGE_NSID,
            record,
            validate: false,
        },
    });

    if (!res.ok) {
        throw new Error(res.data.message ?? res.data.error);
    }

    // `createdAt` is generated here, so hand it back for the optimistic entry
    // and the echo payload to keep their ordering consistent with the durable
    // copy that arrives later over the firehose.
    return {
        uri: res.data.uri,
        cid: res.data.cid,
        createdAt: record.createdAt,
    };
};
