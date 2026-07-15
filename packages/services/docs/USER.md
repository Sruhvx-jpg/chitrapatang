# User Service

The `UserService` is responsible for handling all user-related business logic, database queries (via Drizzle ORM), and token management.

## File Structure

- **`index.ts`**: The main service class implementation (`UserService`).
- **`model.ts`**: Zod models and TypeScript types for input and output validation.

---

## Service Class: `UserService`

The class uses a separation of concerns, dividing internal database queries (private methods) from external-facing actions (public methods).

### Private Methods (Database Operations)

- **`findUserByEmail(email: string)`**:
  Queries the `usersTable` to check if a user with the given email already exists.
- **`createUser(user)`**:
  Inserts a new user record into `usersTable` and returns the created user.
- **`saveRefreshToken(token)`**:
  Saves the user's refresh/access tokens and expiration date in `refreshTokensTable` for session persistence.

### Public Methods (Business Logic API)

- **`registerUser(payload: registerUserInputType)`**:
  1. Validates the input payload using `registerUserInputModel.parse()`.
  2. Ensures the email is not already registered.
  3. Hashes the plain text password using `@repo/utils`'s `hashPass()`.
  4. Inserts the user into the database.
  5. Generates an Access Token and a Refresh Token using `@repo/utils`.
  6. Saves the refresh token to the database with a 30-day expiration.
  7. Returns the user object, access token, and refresh token.

---

## Validation Models (`model.ts`)

Strict inputs and outputs are defined using Zod schemas to ensure type-safe interfaces:

### `registerUserInputModel`
```typescript
export const registerUserInputModel = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
```

### `registerUserOutputModel`
```typescript
export const registerUserOutputModel = z.object({
  user: z.object({
    id: z.string().uuid(),
    fullName: z.string(),
    email: z.string(),
  }),
  accessToken: z.string(),
  refreshToken: z.string(),
});
```
