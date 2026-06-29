import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";

const _mainSchema = /*#__PURE__*/ v.query(
  "systems.gmstn.api.chat.getGeodeWorkspaces",
  {
    params: /*#__PURE__*/ v.object({
      /**
       * Domain of the Geode in question, e.g. "geode.gmstn.systems"
       */
      host: /*#__PURE__*/ v.string(),
    }),
    output: {
      type: "lex",
      get schema() {
        return workspacesSchema;
      },
    },
  },
);
const _workspaceSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal(
      "systems.gmstn.api.chat.getGeodeWorkspaces#workspace",
    ),
  ),
  createdAt: /*#__PURE__*/ v.string(),
  descriptionLong: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.string()),
  descriptionShort: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.string()),
  isAdmin: /*#__PURE__*/ v.boolean(),
  isOwner: /*#__PURE__*/ v.boolean(),
  name: /*#__PURE__*/ v.string(),
  uri: /*#__PURE__*/ v.resourceUriString(),
});
const _workspacesSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal(
      "systems.gmstn.api.chat.getGeodeWorkspaces#workspaces",
    ),
  ),
  count: /*#__PURE__*/ v.integer(),
  get workspaces() {
    return /*#__PURE__*/ v.array(workspaceSchema);
  },
});

type main$schematype = typeof _mainSchema;
type workspace$schematype = typeof _workspaceSchema;
type workspaces$schematype = typeof _workspacesSchema;

export interface mainSchema extends main$schematype {}
export interface workspaceSchema extends workspace$schematype {}
export interface workspacesSchema extends workspaces$schematype {}

export const mainSchema = _mainSchema as mainSchema;
export const workspaceSchema = _workspaceSchema as workspaceSchema;
export const workspacesSchema = _workspacesSchema as workspacesSchema;

export interface Workspace extends v.InferInput<typeof workspaceSchema> {}
export interface Workspaces extends v.InferInput<typeof workspacesSchema> {}

export interface $params extends v.InferInput<mainSchema["params"]> {}
export type $output = v.InferXRPCBodyInput<mainSchema["output"]>;

declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "systems.gmstn.api.chat.getGeodeWorkspaces": mainSchema;
  }
}
