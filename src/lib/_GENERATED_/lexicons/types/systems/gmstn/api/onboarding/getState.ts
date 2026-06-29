import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";

const _mainSchema = /*#__PURE__*/ v.query(
  "systems.gmstn.api.onboarding.getState",
  {
    params: null,
    output: {
      type: "lex",
      get schema() {
        return onboardingStateSchema;
      },
    },
  },
);
const _onboardingStateSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal(
      "systems.gmstn.api.onboarding.getState#onboardingState",
    ),
  ),
  get chat() {
    return /*#__PURE__*/ v.optional(onboardingStateObjectSchema);
  },
  get knowledge() {
    return /*#__PURE__*/ v.optional(onboardingStateObjectSchema);
  },
  get projects() {
    return /*#__PURE__*/ v.optional(onboardingStateObjectSchema);
  },
  updatedAt: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.datetimeString()),
});
const _onboardingStateObjectSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal(
      "systems.gmstn.api.onboarding.getState#onboardingStateObject",
    ),
  ),
  onboardedAt: /*#__PURE__*/ v.datetimeString(),
});

type main$schematype = typeof _mainSchema;
type onboardingState$schematype = typeof _onboardingStateSchema;
type onboardingStateObject$schematype = typeof _onboardingStateObjectSchema;

export interface mainSchema extends main$schematype {}
export interface onboardingStateSchema extends onboardingState$schematype {}
export interface onboardingStateObjectSchema extends onboardingStateObject$schematype {}

export const mainSchema = _mainSchema as mainSchema;
export const onboardingStateSchema =
  _onboardingStateSchema as onboardingStateSchema;
export const onboardingStateObjectSchema =
  _onboardingStateObjectSchema as onboardingStateObjectSchema;

export interface OnboardingState extends v.InferInput<
  typeof onboardingStateSchema
> {}
export interface OnboardingStateObject extends v.InferInput<
  typeof onboardingStateObjectSchema
> {}

export interface $params {}
export type $output = v.InferXRPCBodyInput<mainSchema["output"]>;

declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "systems.gmstn.api.onboarding.getState": mainSchema;
  }
}
