# Cookie Management & Factory Functions

This document outlines the cookie helpers and factory pattern used to manage cookies within tRPC request contexts.

## Factory Functions

To keep cookie logic decoupled from Express request/response objects, we use factory functions that generate context-bound cookie handlers:

1. **`createCookieFactory(res: Response)`**:
   Returns `createCookie(name, value, options)` bound to the current Express response.
   
2. **`getCookieFactory(req: Request)`**:
   Returns `getCookie(name)` bound to the current Express request to read signed/unsigned cookies.
   
3. **`deleteCookieFactory(res: Response)`**:
   Returns `deleteCookie(name)` bound to the current Express response to clear/delete cookies.

---

## Integration with tRPC Context

These factories are initialized in `packages/trpc/server/context.ts` when a new request context is built:

```typescript
export async function createContext({ req, res }: CreateExpressContextOptions): Promise<TRPCContext> {
    const ctx: TRPCContext = {
        req,
        res,
        createCookie: createCookieFactory(res),
        getCookie: getCookieFactory(req),
        deleteCookie: deleteCookieFactory(res),
    }
    return ctx;
}
```

---

## Auth Token Wrappers

For authentication tokens, we use helper functions that target the `"authentication_token"` cookie directly:

- **`setAuthToken(ctx, accessToken)`**:
  Saves the access token as an HTTP-only cookie.
  ```typescript
  setAuthToken(ctx, result.accessToken);
  ```
- **`getAuthToken(ctx)`**:
  Reads the token from incoming request cookies.
- **`deleteAuthToken(ctx)`**:
  Clears the token (used on logout).