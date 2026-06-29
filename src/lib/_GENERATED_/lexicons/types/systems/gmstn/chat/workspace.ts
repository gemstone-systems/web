import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";

const _mainSchema = /*#__PURE__*/ v.record(
  /*#__PURE__*/ v.tidString(),
  /*#__PURE__*/ v.object({
    $type: /*#__PURE__*/ v.literal("systems.gmstn.chat.workspace"),
    createdAt: /*#__PURE__*/ v.datetimeString(),
    /**
     * @minLength 1
     * @maxLength 5000
     * @minGraphemes 1
     * @maxGraphemes 500
     */
    descriptionLong: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
        /*#__PURE__*/ v.stringLength(1, 5000),
        /*#__PURE__*/ v.stringGraphemes(1, 500),
      ]),
    ),
    /**
     * @minLength 1
     * @maxLength 2000
     * @minGraphemes 1
     * @maxGraphemes 200
     */
    descriptionShort: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
        /*#__PURE__*/ v.stringLength(1, 2000),
        /*#__PURE__*/ v.stringGraphemes(1, 200),
      ]),
    ),
    host: /*#__PURE__*/ v.resourceUriString(),
    /**
     * @minLength 1
     * @maxLength 1000
     * @minGraphemes 1
     * @maxGraphemes 100
     */
    name: /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
      /*#__PURE__*/ v.stringLength(1, 1000),
      /*#__PURE__*/ v.stringGraphemes(1, 100),
    ]),
  }),
);

type main$schematype = typeof _mainSchema;

export interface mainSchema extends main$schematype {}

export const mainSchema = _mainSchema as mainSchema;

export interface Main extends v.InferInput<typeof mainSchema> {}

declare module "@atcute/lexicons/ambient" {
  interface Records {
    "systems.gmstn.chat.workspace": mainSchema;
  }
}
