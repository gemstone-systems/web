import { z } from "zod";

// Wire shapes for the geode socket/history surface. These are NOT the PDS
// lexicon record (see @/lib/lexicons/chat) — geode denormalises stored messages
// into snake_case `MessageRow`s and tags live frames with a `type` field.

/** A stored message as geode returns it from history and over the socket. */
export const messageRowSchema = z.object({
    seq: z.number(),
    member_did: z.string(),
    rkey: z.string(),
    cid: z.string(),
    channel_uri: z.string(),
    created_at: z.string(),
    content: z.string(),
});
export type MessageRow = z.infer<typeof messageRowSchema>;

/** The payload we attach to an echo. Both ends of the echo are this app, so we
 * define the shape: enough identity to dedup against the durable copy by uri. */
export const echoPayloadSchema = z.object({
    uri: z.string(),
    cid: z.string(),
    did: z.string(),
    content: z.string(),
    createdAt: z.string(),
});
export type EchoPayload = z.infer<typeof echoPayloadSchema>;

/** A durable message fanned out over the socket. */
export const messageFrameSchema = messageRowSchema.extend({
    type: z.literal("message"),
});

/** An ephemeral echo relayed from another client. */
export const echoFrameSchema = z.object({
    type: z.literal("echo"),
    channel: z.string(),
    payload: echoPayloadSchema,
});

/** Anything geode sends down the socket. */
export const inboundFrameSchema = z.discriminatedUnion("type", [
    messageFrameSchema,
    echoFrameSchema,
]);
export type InboundFrame = z.infer<typeof inboundFrameSchema>;

/** Response shape of `GET /messages`. */
export const messagesResponseSchema = z.object({
    messages: z.array(messageRowSchema),
    cursor: z.number().nullable(),
});
export type MessagesResponse = z.infer<typeof messagesResponseSchema>;
