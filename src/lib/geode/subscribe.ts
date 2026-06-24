import logger from "@/lib/logger";
import { inboundFrameSchema } from "@/lib/geode/frames";
import type { EchoPayload, MessageRow } from "@/lib/geode/frames";

const INITIAL_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 30_000;

export type GeodeSocket = {
    /** Relay an ephemeral echo to the other connected clients. */
    sendEcho: (frame: { channel: string; payload: EchoPayload }) => void;
    /** Close the socket and stop reconnecting. */
    close: () => void;
};

/** Open a self-reconnecting websocket to a geode shard's `/subscribe` endpoint,
 * dispatching durable messages and echoes to the given callbacks. Mirrors
 * geode's own reconnect-with-backoff behaviour. */
export const createGeodeSocket = ({
    geodeUrl,
    channel,
    onMessage,
    onEcho,
}: {
    geodeUrl: string;
    channel: string;
    onMessage: (row: MessageRow) => void;
    onEcho: (payload: EchoPayload) => void;
}): GeodeSocket => {
    const url = new URL("/subscribe", geodeUrl);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    url.searchParams.set("channel", channel);

    let ws: WebSocket | null = null;
    let backoff = INITIAL_BACKOFF_MS;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let closed = false;

    const connect = () => {
        if (closed) return;
        ws = new WebSocket(url);

        ws.onopen = () => {
            backoff = INITIAL_BACKOFF_MS;
            logger.debug(`geode socket open (${channel})`);
        };

        ws.onmessage = (event) => {
            if (typeof event.data !== "string") return;
            let parsed: unknown;
            try {
                parsed = JSON.parse(event.data);
            } catch {
                logger.debug("ignoring non-JSON geode frame");
                return;
            }
            const frame = inboundFrameSchema.safeParse(parsed);
            if (!frame.success) {
                logger.debug("ignoring unrecognised geode frame");
                return;
            }
            if (frame.data.type === "message") {
                onMessage(frame.data);
            } else {
                onEcho(frame.data.payload);
            }
        };

        ws.onclose = () => {
            if (closed) return;
            reconnectTimer = setTimeout(connect, backoff);
            backoff = Math.min(backoff * 2, MAX_BACKOFF_MS);
        };

        // `onerror` is followed by `onclose`; let close drive reconnection.
        ws.onerror = () => ws?.close();
    };

    connect();

    return {
        sendEcho: (frame) => {
            if (ws?.readyState !== WebSocket.OPEN) {
                logger.debug("dropping echo: geode socket not open");
                return;
            }
            ws.send(JSON.stringify({ type: "echo", ...frame }));
        },
        close: () => {
            closed = true;
            if (reconnectTimer) clearTimeout(reconnectTimer);
            ws?.close();
        },
    };
};
