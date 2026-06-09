import { z } from "zod";

// TODO: HELPPPPPPP this should not be done like this at all
// we should look at whatever type magic atcute uses

export const CHAT_MESSAGE_NSID = "systems.gmstn.chat.message";

export const strongRefSchema = z.object({
    $type: z.literal("com.atproto.repo.strongRef").optional(),
    uri: z.string().min(1),
    cid: z.string().min(1),
});
export type StrongRef = z.infer<typeof strongRefSchema>;

export const chatMessageRecordSchema = z.object({
    $type: z.literal(CHAT_MESSAGE_NSID),
    channel: strongRefSchema,
    content: z.string().min(1).max(50000),
    createdAt: z.string().min(1),
});
export type ChatMessageRecord = z.infer<typeof chatMessageRecordSchema>;
