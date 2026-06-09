import { MessageInput } from "@/components/Chat/MessageInput";
import type { SentMessage } from "@/components/Chat/MessageInput";
import { Loading } from "@/components/Misc/Loading";
import { HomeLayout } from "@/layouts/HomeLayout";
import { useXrpcClient } from "@/lib/providers/xrpc";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_layout/_authed/home/")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone - Home" }],
    }),
});

type DisplayedMessage = SentMessage & { content: string };

function RouteComponent() {
    const { client } = useXrpcClient();
    const [messages, setMessages] = useState<Array<DisplayedMessage>>([]);

    if (!client) return <Loading />;

    return (
        <HomeLayout>
            <div className="flex h-full flex-col">
                <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
                    {messages.length === 0 ? (
                        <p className="text-overlay1 m-auto text-sm">
                            No messages yet. Say something!
                        </p>
                    ) : (
                        messages.map((message) => (
                            <div
                                key={message.uri}
                                className="bg-surface0 text-text max-w-2xl rounded-lg px-3 py-2"
                            >
                                <p className="break-words whitespace-pre-wrap">
                                    {message.content}
                                </p>
                                <p className="text-overlay1 mt-1 text-xs break-all">
                                    {message.uri}
                                </p>
                            </div>
                        ))
                    )}
                </div>
                <MessageInput
                    onSent={(result, content) =>
                        setMessages((prev) => [...prev, { ...result, content }])
                    }
                />
            </div>
        </HomeLayout>
    );
}
