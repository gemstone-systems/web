import { describe, expect, it } from "vitest";
import type { EchoPayload, MessageRow } from "@/lib/geode/frames";
import {
    fromEcho,
    fromRow,
    messageUri,
    sortMessages,
    upsert,
} from "@/lib/geode/messages";
import type { ChatMessage } from "@/lib/geode/messages";

const row = (over: Partial<MessageRow> = {}): MessageRow => ({
    seq: 1,
    member_did: "did:plc:alice",
    rkey: "3kabc",
    cid: "bafy-durable",
    channel_uri: "at://chan",
    created_at: "2026-06-22T15:04:05.000Z",
    content: "hi",
    ...over,
});

const echoPayload = (over: Partial<EchoPayload> = {}): EchoPayload => ({
    uri: "at://did:plc:alice/systems.gmstn.chat.message/3kabc",
    cid: "bafy-echo",
    did: "did:plc:alice",
    content: "hi",
    createdAt: "2026-06-22T15:04:05.000Z",
    ...over,
});

describe("messageUri", () => {
    it("builds the record at-uri from did and rkey", () => {
        expect(messageUri("did:plc:alice", "3kabc")).toBe(
            "at://did:plc:alice/systems.gmstn.chat.message/3kabc",
        );
    });
});

describe("fromRow / fromEcho", () => {
    it("maps a durable row to a durable message keyed by at-uri", () => {
        const msg = fromRow(row());
        expect(msg.uri).toBe(
            "at://did:plc:alice/systems.gmstn.chat.message/3kabc",
        );
        expect(msg.status).toBe("durable");
        expect(msg.did).toBe("did:plc:alice");
    });

    it("maps an echo payload to an echo message", () => {
        const msg = fromEcho(echoPayload());
        expect(msg.uri).toBe(
            "at://did:plc:alice/systems.gmstn.chat.message/3kabc",
        );
        expect(msg.status).toBe("echo");
    });

    it("a durable row and its echo resolve to the same uri", () => {
        expect(fromRow(row()).uri).toBe(fromEcho(echoPayload()).uri);
    });
});

describe("upsert", () => {
    const pending: ChatMessage = {
        uri: "at://u/1",
        did: "did:plc:alice",
        content: "hi",
        createdAt: "2026-06-22T15:04:05.000Z",
        status: "pending",
    };

    it("adds a message under a new uri", () => {
        const map = upsert(new Map(), pending);
        expect(map.get("at://u/1")?.status).toBe("pending");
    });

    it("durable replaces a same-uri echo", () => {
        let map = upsert(new Map(), { ...pending, status: "echo" });
        map = upsert(map, { ...pending, status: "durable", cid: "bafy" });
        expect(map.get("at://u/1")?.status).toBe("durable");
    });

    it("echo does not downgrade a same-uri durable", () => {
        let map = upsert(new Map(), { ...pending, status: "durable" });
        map = upsert(map, { ...pending, status: "echo" });
        expect(map.get("at://u/1")?.status).toBe("durable");
    });

    it("echo upgrades a same-uri pending", () => {
        let map = upsert(new Map(), pending);
        map = upsert(map, { ...pending, status: "echo" });
        expect(map.get("at://u/1")?.status).toBe("echo");
    });

    it("does not mutate the input map", () => {
        const original = new Map<string, ChatMessage>();
        upsert(original, pending);
        expect(original.size).toBe(0);
    });
});

describe("sortMessages", () => {
    it("orders by createdAt ascending, tie-breaking on uri", () => {
        const a: ChatMessage = {
            uri: "at://b",
            did: "d",
            content: "",
            createdAt: "2026-01-02T00:00:00.000Z",
            status: "durable",
        };
        const b: ChatMessage = {
            ...a,
            uri: "at://a",
            createdAt: "2026-01-01T00:00:00.000Z",
        };
        const c: ChatMessage = {
            ...a,
            uri: "at://a",
            createdAt: "2026-01-02T00:00:00.000Z",
        };
        const sorted = sortMessages([a, b, c]);
        expect(sorted.map((m) => m.uri)).toEqual([
            "at://a",
            "at://a",
            "at://b",
        ]);
        expect(sorted[1].createdAt).toBe("2026-01-02T00:00:00.000Z");
    });
});
