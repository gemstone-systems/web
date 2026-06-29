import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";
import * as ComAtprotoRepoStrongRef from "@atcute/atproto/types/repo/strongRef";

const _mainSchema = /*#__PURE__*/ v.record(
  /*#__PURE__*/ v.tidString(),
  /*#__PURE__*/ v.object({
    $type: /*#__PURE__*/ v.literal("systems.gmstn.chat.channel.membership"),
    /**
     * The channel that the membership is describing. Must resolve to a systems.gmstn.chat.channel record on the channel owner's repository.
     */
    get channel() {
      return ComAtprotoRepoStrongRef.mainSchema;
    },
    /**
     * The timestamp when this membership was created.
     */
    createdAt: /*#__PURE__*/ v.datetimeString(),
    /**
     * The original invite record for the channel. Must resolve to a systems.gmstn.chat.channel.invite record on the channel owner's repository.
     */
    get invite() {
      return ComAtprotoRepoStrongRef.mainSchema;
    },
    /**
     * The current membership state.
     */
    state: /*#__PURE__*/ v.literalEnum(["accepted", "left", "rejected"]),
    /**
     * The timestamp when this membership was last updated.
     */
    updatedAt: /*#__PURE__*/ v.datetimeString(),
  }),
);

type main$schematype = typeof _mainSchema;

export interface mainSchema extends main$schematype {}

export const mainSchema = _mainSchema as mainSchema;

export interface Main extends v.InferInput<typeof mainSchema> {}

declare module "@atcute/lexicons/ambient" {
  interface Records {
    "systems.gmstn.chat.channel.membership": mainSchema;
  }
}
