import { db } from "@repo/database";
import { eq, and, inArray } from "drizzle-orm";
import { workspacesTable, employeesTable } from "@repo/database/schema";

class WorkspaceService {
  //--------------------------- private method --------------------------------------

  private async findOwnedWorkspaces(userId: string) {
    return await db
      .select()
      .from(workspacesTable)
      .where(eq(workspacesTable.ownerId, userId));
  }

  private async findMemberWorkspaces(userId: string) {
    const employeeRecords = await db
      .select({
        workspaceId: employeesTable.workspaceId,
        role: employeesTable.role,
      })
      .from(employeesTable)
      .where(
        and(
          eq(employeesTable.userId, userId),
          eq(employeesTable.status, "active")
        )
      );

    if (employeeRecords.length === 0) {
      return { memberWorkspaces: [], employeeRecords: [] };
    }

    const employeeWorkspaceIds = employeeRecords.map((r) => r.workspaceId);

    const memberWorkspaces = await db
      .select()
      .from(workspacesTable)
      .where(inArray(workspacesTable.workspaceId, employeeWorkspaceIds));

    return { memberWorkspaces, employeeRecords };
  }

  //--------------------------- public method --------------------------------------

  public async getUserWorkspaces(userId: string) {
    try {
      const owned = await this.findOwnedWorkspaces(userId);
      const { memberWorkspaces, employeeRecords } = await this.findMemberWorkspaces(userId);

      const map = new Map<
        string,
        { workspaceId: string; ownerId: string; role: string; createdAt: Date }
      >();

      for (const w of owned) {
        map.set(w.workspaceId, {
          workspaceId: w.workspaceId,
          ownerId: w.ownerId,
          role: "Owner",
          createdAt: w.createdAt,
        });
      }

      for (const w of memberWorkspaces) {
        if (!map.has(w.workspaceId)) {
          const emp = employeeRecords.find((r) => r.workspaceId === w.workspaceId);
          map.set(w.workspaceId, {
            workspaceId: w.workspaceId,
            ownerId: w.ownerId,
            role: emp?.role || "Member",
            createdAt: w.createdAt,
          });
        }
      }

      const workspaces = Array.from(map.values());

      return {
        inWorkspace: workspaces.length > 0,
        workspaces,
      };
    } catch (error: any) {
      throw new Error(error.message || "Failed to fetch user workspaces");
    }
  }
}

export default WorkspaceService;
