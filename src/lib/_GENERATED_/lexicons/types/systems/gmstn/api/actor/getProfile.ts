import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";
import * as ComAtprotoLabelDefs from "@atcute/atproto/types/label/defs";

const _mainSchema = /*#__PURE__*/ v.query(
  "systems.gmstn.api.actor.getProfile",
  {
    params: /*#__PURE__*/ v.object({
      /**
       * Handle or DID of the account to fetch profile of.
       */
      identifier: /*#__PURE__*/ v.actorIdentifierString(),
    }),
    output: {
      type: "lex",
      get schema() {
        return profileViewSchema;
      },
    },
  },
);
const _profileViewSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.api.actor.getProfile#profileView"),
  ),
  /**
   * URL of the avatar image.
   */
  avatar: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.genericUriString()),
  /**
   * URL of the banner image.
   */
  banner: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.genericUriString()),
  /**
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
  did: /*#__PURE__*/ v.didString(),
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
  handle: /*#__PURE__*/ v.handleString(),
  /**
   * Timestamp of when Prism indexed this profile.
   */
  indexedAt: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.datetimeString()),
  get labels() {
    return /*#__PURE__*/ v.optional(
      /*#__PURE__*/ v.array(ComAtprotoLabelDefs.labelSchema),
    );
  },
  /**
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
});

type main$schematype = typeof _mainSchema;
type profileView$schematype = typeof _profileViewSchema;

export interface mainSchema extends main$schematype {}
export interface profileViewSchema extends profileView$schematype {}

export const mainSchema = _mainSchema as mainSchema;
export const profileViewSchema = _profileViewSchema as profileViewSchema;

export interface ProfileView extends v.InferInput<typeof profileViewSchema> {}

export interface $params extends v.InferInput<mainSchema["params"]> {}
export type $output = v.InferXRPCBodyInput<mainSchema["output"]>;

declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "systems.gmstn.api.actor.getProfile": mainSchema;
  }
}
