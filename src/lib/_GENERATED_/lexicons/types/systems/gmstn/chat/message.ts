import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";
import * as ComAtprotoRepoStrongRef from "@atcute/atproto/types/repo/strongRef";
import * as SystemsGmstnRichtextFacet from "../richtext/facet.js";

const _mainSchema = /*#__PURE__*/ v.record(
  /*#__PURE__*/ v.tidString(),
  /*#__PURE__*/ v.object({
    $type: /*#__PURE__*/ v.literal("systems.gmstn.chat.message"),
    /**
     * (optional) Attached media files.
     * @maxLength 10
     */
    attachments: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(
        /*#__PURE__*/ v.array(
          /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.blob(), [
            /*#__PURE__*/ v.blobSize(10000000),
            /*#__PURE__*/ v.blobAccept([
              "image/png",
              "image/jpeg",
              "image/gif",
              "video/mp4",
              "audio/mpeg",
            ]),
          ]),
        ),
        [/*#__PURE__*/ v.arrayLength(0, 10)],
      ),
    ),
    /**
     * The channel this message was sent to. Must resolve to a systems.gmstn.chat.channel record.
     */
    get channel() {
      return ComAtprotoRepoStrongRef.mainSchema;
    },
    /**
     * The text content of the message.
     * @minLength 1
     * @maxLength 50000
     * @minGraphemes 1
     * @maxGraphemes 5000
     */
    content: /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
      /*#__PURE__*/ v.stringLength(1, 50000),
      /*#__PURE__*/ v.stringGraphemes(1, 5000),
    ]),
    /**
     * The timestamp when this message was created.
     */
    createdAt: /*#__PURE__*/ v.datetimeString(),
    /**
     * (optional) Rich text annotations for the message content. Annotations are indexed by UTF-8 byte offsets into the content string.
     */
    get facets() {
      return /*#__PURE__*/ v.optional(
        /*#__PURE__*/ v.array(SystemsGmstnRichtextFacet.mainSchema),
      );
    },
    /**
     * (optional) A reference to another message, such as a quoted or forwarded message.
     */
    get messageRef() {
      return /*#__PURE__*/ v.optional(messageRefSchema);
    },
    /**
     * (optional) A reference to the message this is replying to.
     */
    get replyRef() {
      return /*#__PURE__*/ v.optional(replyRefSchema);
    },
  }),
);
const _messageRefSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.chat.message#messageRef"),
  ),
  /**
   * The referenced message. Must resolve to a systems.gmstn.chat.message record.
   */
  get message() {
    return ComAtprotoRepoStrongRef.mainSchema;
  },
});
const _replyRefSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.chat.message#replyRef"),
  ),
  /**
   * The direct parent message being replied to. Must resolve to a systems.gmstn.chat.message record.
   */
  get parent() {
    return ComAtprotoRepoStrongRef.mainSchema;
  },
  /**
   * The root message of the thread. Must resolve to a systems.gmstn.chat.message record.
   */
  get root() {
    return ComAtprotoRepoStrongRef.mainSchema;
  },
});

type main$schematype = typeof _mainSchema;
type messageRef$schematype = typeof _messageRefSchema;
type replyRef$schematype = typeof _replyRefSchema;

export interface mainSchema extends main$schematype {}
export interface messageRefSchema extends messageRef$schematype {}
export interface replyRefSchema extends replyRef$schematype {}

export const mainSchema = _mainSchema as mainSchema;
export const messageRefSchema = _messageRefSchema as messageRefSchema;
export const replyRefSchema = _replyRefSchema as replyRefSchema;

export interface Main extends v.InferInput<typeof mainSchema> {}
export interface MessageRef extends v.InferInput<typeof messageRefSchema> {}
export interface ReplyRef extends v.InferInput<typeof replyRefSchema> {}

declare module "@atcute/lexicons/ambient" {
  interface Records {
    "systems.gmstn.chat.message": mainSchema;
  }
}
