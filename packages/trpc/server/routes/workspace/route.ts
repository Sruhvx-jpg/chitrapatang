import { workspaceService } from "../../services";
import { checkUserWorkspaceOutputModel } from "@repo/services/workspace/model";
import { TokenBasedProcedure, router } from "../../trpc";
import { generatePath } from "../../server-utils/path-generator";
import { TRPCError } from "@trpc/server";

const TAGS = ["Workspace"];
const getPath = generatePath("/workspace");

export const workspaceRouter = router({
  checkUserWorkspace: TokenBasedProcedure
    .meta({ openapi: { method: "GET", path: getPath("/check-user-workspace"), tags: TAGS } })
    .output(checkUserWorkspaceOutputModel)
    .query(async ({ ctx }) => {
      try {
        const userId = ctx.user.sub;
        return await workspaceService.getUserWorkspaces(userId);
      } catch (error: any) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message || "Failed to check user workspace",
        });
      }
    }),
});
