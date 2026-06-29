import type {} from "@atcute/lexicons";
import * as v from "@atcute/lexicons/validations";
import type {} from "@atcute/lexicons/ambient";
import * as SystemsGmstnApiActorGetProfile from "../../actor/getProfile.js";

const _mainSchema = /*#__PURE__*/ v.query(
  "systems.gmstn.api.chat.workspace.getMembers",
  {
    params: /*#__PURE__*/ v.object({
      /**
       * Optional cursor for pagination.
       */
      cursor: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.string()),
      /**
       * Array of workspace AT-uris.
       * @minLength 1
       * @maxLength 20
       */
      identifier: /*#__PURE__*/ v.constrain(
        /*#__PURE__*/ v.array(/*#__PURE__*/ v.resourceUriString()),
        [/*#__PURE__*/ v.arrayLength(1, 20)],
      ),
    }),
    output: {
      type: "lex",
      get schema() {
        return workspacesSchema;
      },
    },
  },
);
const _workspaceWithMembersSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal(
      "systems.gmstn.api.chat.workspace.getMembers#workspaceWithMembers",
    ),
  ),
  get members() {
    return /*#__PURE__*/ v.array(
      SystemsGmstnApiActorGetProfile.profileViewSchema,
    );
  },
  workspace: /*#__PURE__*/ v.resourceUriString(),
});
const _workspacesSchema = /*#__PURE__*/ v.object({
  $type: /*#__PURE__*/ v.optional(
    /*#__PURE__*/ v.literal(
      "systems.gmstn.api.chat.workspace.getMembers#workspaces",
    ),
  ),
  cursor: /*#__PURE__*/ v.optional(/*#__PURE__*/ v.string()),
  get workspaces() {
    return /*#__PURE__*/ v.array(workspaceWithMembersSchema);
  },
  workspacesCount: /*#__PURE__*/ v.integer(),
});

type main$schematype = typeof _mainSchema;
type workspaceWithMembers$schematype = typeof _workspaceWithMembersSchema;
type workspaces$schematype = typeof _workspacesSchema;

export interface mainSchema extends main$schematype {}
export interface workspaceWithMembersSchema extends workspaceWithMembers$schematype {}
export interface workspacesSchema extends workspaces$schematype {}

export const mainSchema = _mainSchema as mainSchema;
export const workspaceWithMembersSchema =
  _workspaceWithMembersSchema as workspaceWithMembersSchema;
export const workspacesSchema = _workspacesSchema as workspacesSchema;

export interface WorkspaceWithMembers extends v.InferInput<
  typeof workspaceWithMembersSchema
> {}
export interface Workspaces extends v.InferInput<typeof workspacesSchema> {}

export interface $params extends v.InferInput<mainSchema["params"]> {}
export type $output = v.InferXRPCBodyInput<mainSchema["output"]>;

declare module "@atcute/lexicons/ambient" {
  interface XRPCQueries {
    "systems.gmstn.api.chat.workspace.getMembers": mainSchema;
  }
}
