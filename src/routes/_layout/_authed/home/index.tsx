import { MessageInput } from "@/components/Chat/MessageInput";
import { Loading } from "@/components/Misc/Loading";
import { HomeLayout } from "@/layouts/HomeLayout";
import { __DEV__channelRef } from "@/lib/consts";
import { useChannelMessages } from "@/lib/hooks/useChannelMessages";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_authed/home/")({
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Gemstone - Home" }],
    }),
});

function RouteComponent() {
    const { messages, send, isSending, sendError, isLoading } =
        useChannelMessages(__DEV__channelRef.uri);

    if (isLoading) return <Loading />;

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
                                className="bg-surface0 text-text max-w-2xl rounded-lg px-3 py-2 data-[pending=true]:opacity-60"
                                data-pending={message.status === "pending"}
                            >
                                <p className="break-words whitespace-pre-wrap">
                                    {message.content}
                                </p>
                                <p className="text-overlay1 mt-1 text-xs break-all">
                                    {message.did} · {message.status}
                                </p>
                            </div>
                        ))
                    )}
                </div>
                <MessageInput
                    onSend={send}
                    isPending={isSending}
                    error={sendError}
                />
            </div>
        </HomeLayout>
    );
}
