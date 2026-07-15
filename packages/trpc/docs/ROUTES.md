# tRPC Routes Structure

This document explains the structure and conventions for API routes built using tRPC.

## Route Architecture

All tRPC routes are defined in the `packages/trpc/server/routes` directory and grouped under logical subdirectories (e.g., `auth/route.ts`).

### Key Components of a Route

1. **Router & Procedure Definition**: 
   - Routes are grouped using the `router` function.
   - Procedures can be `publicProcedure` or authenticated/protected procedures.
   
2. **OpenAPI Integration**:
   - Every procedure uses `.meta({ openapi: { method, path, tags } })` to automatically generate OpenAPI documentation.
   
3. **Zod Validation**:
   - Inputs and outputs are strictly validated using Zod models.
   - Input/output schemas are typically imported from corresponding services (e.g., `@repo/services/user/model`).

4. **Context & Cookies**:
   - Handlers access the tRPC context `ctx` to manage HTTP headers, requests, responses, and cookies (e.g., setting JWT tokens).

---

## Example: Auth Router (`/authentication/register`)

```typescript
import { z } from "../../schema";
import { userService } from "../../services";
import { registerUserInputModel, registerUserOutputModel } from "@repo/services/user/model";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { setAuthToken } from "../../utils/cookie";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  register: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/register"), tags: TAGS } })
    .input(registerUserInputModel)
    .output(registerUserOutputModel)
    .mutation(async ({ input, ctx }) => {
      // 1. Invoke the business logic via the User Service
      const result = await userService.registerUser(input);
      
      // 2. Set the HTTP-only cookie with the access token
      setAuthToken(ctx, result.accessToken);
      
      return result;
    }),
});
```

## Adding a New Route

1. Define the service method and its input/output Zod schemas in `packages/services`.
2. Create or open the route file in `packages/trpc/server/routes/<feature>/route.ts`.
3. Add the procedure to the router, specifying the OpenAPI metadata, input schema, output schema, and handler function.
4. Merge the sub-router into the main app router in `packages/trpc/server/routes/index.ts` (or parent router).