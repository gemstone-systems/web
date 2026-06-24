import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { createMessage } from "@/lib/api/create-message";
import { __DEV__geodeUrl } from "@/lib/consts";
import { fromEcho, fromRow, sortMessages, upsert } from "@/lib/geode/messages";
import type { ChatMessage } from "@/lib/geode/messages";
import { createGeodeSocket } from "@/lib/geode/subscribe";
import type { GeodeSocket } from "@/lib/geode/subscribe";
import { useMessagesQuery } from "@/lib/hooks/queries/useMessagesQuery";
import { useOAuth } from "@/lib/providers/oauth";
import { useXrpcClient } from "@/lib/providers/xrpc";

/**
 * Live view of a channel: durable history (React Query) merged with messages
 * and echoes arriving over the geode socket, deduplicated by record at-uri.
 * `send` writes the durable record, optimistically inserts it, and relays an
 * echo so other clients see it before the firehose catches up.
 */
export const useChannelMessages = (channelUri: string) => {
    const { client } = useXrpcClient();
    const { session } = useOAuth();
    const history = useMessagesQuery(channelUri);

    // Messages seen over the socket plus our own optimistic sends. History is
    // merged in separately so a refetch can't clobber live state.
    const [live, setLive] = useState<ReadonlyMap<string, ChatMessage>>(
        () => new Map(),
    );
    const socketRef = useRef<GeodeSocket | null>(null);

    useEffect(() => {
        const socket = createGeodeSocket({
            geodeUrl: __DEV__geodeUrl,
            channel: channelUri,
            onMessage: (row) => setLive((prev) => upsert(prev, fromRow(row))),
            onEcho: (payload) =>
                setLive((prev) => upsert(prev, fromEcho(payload))),
        });
        socketRef.current = socket;
        return () => {
            socket.close();
            socketRef.current = null;
        };
    }, [channelUri]);

    const messages = useMemo(() => {
        let map = new Map<string, ChatMessage>();
        for (const row of history.data?.messages ?? []) {
            map = upsert(map, fromRow(row));
        }
        for (const msg of live.values()) {
            map = upsert(map, msg);
        }
        return sortMessages(map.values());
    }, [history.data, live]);

    const sendMutation = useMutation({
        mutationFn: async (content: string) => {
            if (!client || !session) throw new Error("Not signed in.");
            const did = session.did;
            const { uri, cid, createdAt } = await createMessage({
                client,
                repo: did,
                content,
            });
            // Optimistic until the firehose copy upgrades it to "durable".
            setLive((prev) =>
                upsert(prev, {
                    uri,
                    cid,
                    did,
                    content,
                    createdAt,
                    status: "pending",
                }),
            );
            socketRef.current?.sendEcho({
                channel: channelUri,
                payload: { uri, cid, did, content, createdAt },
            });
        },
    });

    return {
        messages,
        send: sendMutation.mutateAsync,
        isSending: sendMutation.isPending,
        sendError: sendMutation.error,
        isLoading: history.isLoading,
        error: history.error,
    };
};
