import { z } from "zod";

export const checkUserWorkspaceOutputModel = z.object({
  inWorkspace: z.boolean(),
  workspaces: z.array(
    z.object({
      workspaceId: z.string().uuid(),
      ownerId: z.string().uuid(),
      role: z.string(),
      createdAt: z.date(),
    })
  ),
});

export type checkUserWorkspaceOutputType = z.infer<typeof checkUserWorkspaceOutputModel>;
