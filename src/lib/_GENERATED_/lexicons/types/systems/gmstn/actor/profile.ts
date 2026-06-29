import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";
import * as ComAtprotoLabelDefs from "@atcute/atproto/types/label/defs";

const _mainSchema = /*#__PURE__*/ v.record(
  /*#__PURE__*/ v.literal("self"),
  /*#__PURE__*/ v.object({
    $type: /*#__PURE__*/ v.literal("systems.gmstn.actor.profile"),
    /**
     * Small image to be displayed next to posts from account. AKA, 'profile picture'
     * @accept image/png, image/jpeg
     * @maxSize 1000000
     */
    avatar: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.blob(), [
        /*#__PURE__*/ v.blobSize(1000000),
        /*#__PURE__*/ v.blobAccept(["image/png", "image/jpeg"]),
      ]),
    ),
    /**
     * Larger horizontal image to display behind profile view.
     * @accept image/png, image/jpeg
     * @maxSize 1000000
     */
    banner: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.blob(), [
        /*#__PURE__*/ v.blobSize(1000000),
        /*#__PURE__*/ v.blobAccept(["image/png", "image/jpeg"]),
      ]),
    ),
    /**
     * Free-form profile description text.
     * @maxLength 2560
     * @maxGraphemes 256
     */
    bio: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
        /*#__PURE__*/ v.stringLength(0, 2560),
        /*#__PURE__*/ v.stringGraphemes(0, 256),
      ]),
    ),
    createdAt: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.datetimeString()),
    /**
     * @maxLength 640
     * @maxGraphemes 64
     */
    displayName: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
        /*#__PURE__*/ v.stringLength(0, 640),
        /*#__PURE__*/ v.stringGraphemes(0, 64),
      ]),
    ),
    /**
     * Self-label values, specific to the Gemstone application, on the overall account.
     */
    get labels() {
      return /*#__PURE__*/ v.optional(
        /*#__PURE__*/ v.variant([ComAtprotoLabelDefs.selfLabelsSchema]),
      );
    },
    /**
     * Free-form pronouns text.
     * @maxLength 200
     * @maxGraphemes 20
     */
    pronouns: /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
        /*#__PURE__*/ v.stringLength(0, 200),
        /*#__PURE__*/ v.stringGraphemes(0, 20),
      ]),
    ),
    website: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.genericUriString()),
  }),
);

type main$schematype = typeof _mainSchema;

export interface mainSchema extends main$schematype {}

export const mainSchema = _mainSchema as mainSchema;

export interface Main extends v.InferInput<typeof mainSchema> {}

declare module "@atcute/lexicons/ambient" {
  interface Records {
    "systems.gmstn.actor.profile": mainSchema;
  }
}
