import { CHAT_MESSAGE_NSID } from "@/lib/lexicons/chat";
import type { EchoPayload, MessageRow } from "@/lib/geode/frames";

// A message as the UI sees it, reconciled across the three sources that can
// produce it: an optimistic local send (`pending`), an echo relayed from
// another client (`echo`), and the durable firehose copy (`durable`). All three
// share the record's at-uri, so that is the dedup key.

export type MessageStatus = "pending" | "echo" | "durable";

export type ChatMessage = {
    uri: string;
    cid?: string;
    did: string;
    content: string;
    createdAt: string;
    status: MessageStatus;
};

/** The at-uri of a chat message record, the identity all sources agree on. */
export const messageUri = (did: string, rkey: string) =>
    `at://${did}/${CHAT_MESSAGE_NSID}/${rkey}`;

export const fromRow = (row: MessageRow): ChatMessage => ({
    uri: messageUri(row.member_did, row.rkey),
    cid: row.cid,
    did: row.member_did,
    content: row.content,
    createdAt: row.created_at,
    status: "durable",
});

export const fromEcho = (payload: EchoPayload): ChatMessage => ({
    uri: payload.uri,
    cid: payload.cid,
    did: payload.did,
    content: payload.content,
    createdAt: payload.createdAt,
    status: "echo",
});

// Confirmation ranking: a more-confirmed status never loses to a less-confirmed
// one for the same uri.
const RANK: Record<MessageStatus, number> = {
    pending: 0,
    echo: 1,
    durable: 2,
};

/** Insert or merge `next` into a uri-keyed map, returning a new map. The
 * higher-ranked status wins; equal ranks take the incoming (newer) copy. */
export const upsert = (
    prev: ReadonlyMap<string, ChatMessage>,
    next: ChatMessage,
): Map<string, ChatMessage> => {
    const map = new Map(prev);
    const existing = map.get(next.uri);
    if (existing && RANK[existing.status] > RANK[next.status]) {
        return map;
    }
    map.set(next.uri, next);
    return map;
};

/** Chronological order for display; uri tie-breaks equal timestamps. */
export const sortMessages = (
    messages: Iterable<ChatMessage>,
): Array<ChatMessage> =>
    [...messages].sort((a, b) =>
        a.createdAt === b.createdAt
            ? a.uri.localeCompare(b.uri)
            : a.createdAt.localeCompare(b.createdAt),
    );
