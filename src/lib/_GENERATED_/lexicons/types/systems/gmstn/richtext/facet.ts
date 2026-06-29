import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";

const _byteSliceSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.richtext.facet#byteSlice"),
  ),
  /**
   * The exclusive end byte offset.
   * @minimum 0
   */
  byteEnd: /*#__PURE__*/ v.integer(),
  /**
   * The inclusive start byte offset.
   * @minimum 0
   */
  byteStart: /*#__PURE__*/ v.integer(),
});
const _linkSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.richtext.facet#link"),
  ),
  /**
   * The URI being linked to.
   */
  uri: /*#__PURE__*/ v.string(),
});
const _mainSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.richtext.facet"),
  ),
  /**
   * The features applied to this byte range.
   */
  get features() {
    return /*#__PURE__*/ v.array(
      /*#__PURE__*/ v.variant([linkSchema, mentionSchema, tagSchema], true),
    );
  },
  /**
   * The byte range this facet applies to.
   */
  get index() {
    return byteSliceSchema;
  },
});
const _mentionSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.richtext.facet#mention"),
  ),
  /**
   * The DID of the mentioned user.
   */
  did: /*#__PURE__*/ v.didString(),
});
const _tagSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal("systems.gmstn.richtext.facet#tag"),
  ),
  /**
   * The tag value (without the leading #).
   * @maxLength 6400
   * @maxGraphemes 640
   */
  tag: /*#__PURE__*/ v.constrain(/*#__PURE__*/ v.string(), [
    /*#__PURE__*/ v.stringLength(0, 6400),
    /*#__PURE__*/ v.stringGraphemes(0, 640),
  ]),
});

type byteSlice$schematype = typeof _byteSliceSchema;
type link$schematype = typeof _linkSchema;
type main$schematype = typeof _mainSchema;
type mention$schematype = typeof _mentionSchema;
type tag$schematype = typeof _tagSchema;

export interface byteSliceSchema extends byteSlice$schematype {}
export interface linkSchema extends link$schematype {}
export interface mainSchema extends main$schematype {}
export interface mentionSchema extends mention$schematype {}
export interface tagSchema extends tag$schematype {}

export const byteSliceSchema = _byteSliceSchema as byteSliceSchema;
export const linkSchema = _linkSchema as linkSchema;
export const mainSchema = _mainSchema as mainSchema;
export const mentionSchema = _mentionSchema as mentionSchema;
export const tagSchema = _tagSchema as tagSchema;

export interface ByteSlice extends v.InferInput<typeof byteSliceSchema> {}
export interface Link extends v.InferInput<typeof linkSchema> {}
export interface Main extends v.InferInput<typeof mainSchema> {}
export interface Mention extends v.InferInput<typeof mentionSchema> {}
export interface Tag extends v.InferInput<typeof tagSchema> {}
