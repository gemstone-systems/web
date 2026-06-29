import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";

const _mainSchema = /*#__PURE__*/ v.record(
  /*#__PURE__*/ v.tidString(),
  /*#__PURE__*/ v.object({
    $type: /*#__PURE__*/ v.literal("systems.gmstn.chat.channel"),
    /**
     * The timestamp when this channel was created.
     */
    createdAt: /*#__PURE__*/ v.datetimeString(),
    /**
     * The name of the channel. While it can be any string, it is likely to be converted to kebab-case where necessary, particularly in client applications.
     * @minLength 1
     * @maxLength 1000
     * @minGraphemes 1
     * @maxGraphemes 100
     */
    name: /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
      /*#__PURE__*/ v.stringLength(1, 1000),
      /*#__PURE__*/ v.stringGraphemes(1, 100),
    ]),
    /**
     * (optional) The topic of the channel, similar to a sub-description.
     * @minLength 1
     * @maxLength 2000
     * @minGraphemes 1
     * @maxGraphemes 200
     */
    topic: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
        /*#__PURE__*/ v.stringLength(1, 2000),
        /*#__PURE__*/ v.stringGraphemes(1, 200),
      ]),
    ),
    workspace: /*#__PURE__*/ v.resourceUriString(),
  }),
);

type main$schematype = typeof _mainSchema;

export interface mainSchema extends main$schematype {}

export const mainSchema = _mainSchema as mainSchema;

export interface Main extends v.InferInput<typeof mainSchema> {}

declare module "@atcute/lexicons/ambient" {
  interface Records {
    "systems.gmstn.chat.channel": mainSchema;
  }
}
