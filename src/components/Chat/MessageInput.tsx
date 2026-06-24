import { LucideSendHorizontal } from "lucide-react";
import { useState } from "react";
import type { KeyboardEvent } from "react";

export const MessageInput = ({
    onSend,
    isPending = false,
    error,
}: {
    /** Send the message. Resolves on success (input clears), rejects on failure. */
    onSend: (content: string) => Promise<unknown>;
    isPending?: boolean;
    error?: unknown;
}) => {
    const [content, setContent] = useState("");

    const trimmed = content.trim();
    const canSend = trimmed.length > 0 && !isPending;

    const send = async () => {
        if (!canSend) return;
        try {
            await onSend(trimmed);
            setContent("");
        } catch {
            // Keep the text so the user can retry; `error` surfaces the reason.
        }
    };

    const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
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
                    onClick={() => void send()}
                    disabled={!canSend}
                    aria-label="Send message"
                    className="text-accent hover:bg-surface1 grid size-8 shrink-0 place-items-center rounded-md transition-all disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <LucideSendHorizontal size={18} />
                </button>
            </div>
            {error ? (
                <p className="text-negative text-sm">
                    {error instanceof Error
                        ? error.message
                        : "Failed to send message."}
                </p>
            ) : null}
        </div>
    );
};
