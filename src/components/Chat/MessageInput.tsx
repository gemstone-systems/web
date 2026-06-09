import { createMessage } from "@/lib/api/create-message";
import { useOAuth } from "@/lib/providers/oauth";
import { useXrpcClient } from "@/lib/providers/xrpc";
import { useMutation } from "@tanstack/react-query";
import { LucideSendHorizontal } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent } from "react";

export type SentMessage = { uri: string; cid: string };

export const MessageInput = ({
    onSent,
}: {
    onSent?: (result: SentMessage, content: string) => void;
}) => {
    const { client } = useXrpcClient();
    const { session } = useOAuth();
    const [content, setContent] = useState("");

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (text: string) => {
            if (!client || !session) {
                throw new Error("Not signed in.");
            }
            return await createMessage({
                client,
                repo: session.did,
                content: text,
            });
        },
        onSuccess: (result, text) => {
            setContent("");
            onSent?.(result, text);
        },
    });

    const trimmed = content.trim();
    const canSend = trimmed.length > 0 && !isPending && !!client && !!session;

    const send = () => {
        if (!canSend) return;
        mutate(trimmed);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
        }
    };

    return (
        <div className="bg-base border-overlay0 flex flex-col gap-2 border-t p-3">
            <div className="bg-surface0 focus-within:ring-accent/60 flex items-center gap-2 rounded-lg p-2 transition-all focus-within:ring-2">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Send a message…"
                    rows={1}
                    disabled={isPending}
                    className="text-text placeholder:text-overlay1 max-h-40 min-h-6 flex-1 resize-none bg-transparent leading-6 outline-none [field-sizing:content] disabled:opacity-60"
                />
                <button
                    type="button"
                    onClick={send}
                    disabled={!canSend}
                    aria-label="Send message"
                    className="text-accent hover:bg-surface1 grid size-8 shrink-0 place-items-center rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <LucideSendHorizontal size={18} />
                </button>
            </div>
            {error ? (
                <p className="text-negative text-sm">
                    {error instanceof Error ? error.message : "Failed to send message."}
                </p>
            ) : null}
        </div>
    );
};
