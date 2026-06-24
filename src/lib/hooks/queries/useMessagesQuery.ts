import { useQuery } from "@tanstack/react-query";
import { getMessages } from "@/lib/api/get-messages";
import { DEFAULT_STALE_TIME, __DEV__geodeUrl } from "@/lib/consts";

export const messagesQueryKey = (channel: string) => [
    "geode-messages",
    channel,
];

/** Newest-first message history for a channel from the configured geode shard. */
export const useMessagesQuery = (channel: string) =>
    useQuery({
        queryKey: messagesQueryKey(channel),
        queryFn: () => getMessages({ geodeUrl: __DEV__geodeUrl, channel }),
        staleTime: DEFAULT_STALE_TIME,
    });
