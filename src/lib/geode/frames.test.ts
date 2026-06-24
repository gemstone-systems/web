import { describe, expect, it } from "vitest";
import {
    echoFrameSchema,
    inboundFrameSchema,
    messageFrameSchema,
    messagesResponseSchema,
} from "@/lib/geode/frames";

const messageRow = {
    seq: 42,
    member_did: "did:plc:alice",
    rkey: "3kabc",
    cid: "bafymsg",
    channel_uri: "at://did:plc:x/systems.gmstn.chat.channel/abc",
    created_at: "2026-06-22T15:04:05.123Z",
    content: "hi",
};

describe("geode wire frames", () => {
    it("parses a durable message frame", () => {
        const frame = messageFrameSchema.parse({
            type: "message",
            ...messageRow,
        });
        expect(frame.member_did).toBe("did:plc:alice");
        expect(frame.seq).toBe(42);
    });

    it("parses an echo frame with our payload shape", () => {
        const frame = echoFrameSchema.parse({
            type: "echo",
            channel: "at://did:plc:x/systems.gmstn.chat.channel/abc",
            payload: {
                uri: "at://did:plc:alice/systems.gmstn.chat.message/3kabc",
                cid: "bafymsg",
                did: "did:plc:alice",
                content: "hi",
                createdAt: "2026-06-22T15:04:05.123Z",
            },
        });
        expect(frame.payload.did).toBe("did:plc:alice");
    });

    it("discriminates inbound frames by type", () => {
        const msg = inboundFrameSchema.parse({
            type: "message",
            ...messageRow,
        });
        expect(msg.type).toBe("message");
    });

    it("rejects an unknown frame type", () => {
        expect(() =>
            inboundFrameSchema.parse({ type: "command", foo: 1 }),
        ).toThrow();
    });

    it("parses a /messages history response with a null cursor", () => {
        const res = messagesResponseSchema.parse({
            messages: [messageRow],
            cursor: null,
        });
        expect(res.messages).toHaveLength(1);
        expect(res.cursor).toBeNull();
    });
});
