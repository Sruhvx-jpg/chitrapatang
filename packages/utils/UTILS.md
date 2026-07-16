# Shared Utilities (`@repo/utils`)

The `@repo/utils` package contains common utility modules shared across the monorepo, such as hashing, JWT operations, error handling, and third-party services integration (like Redis).

## Modules

### 1. Password Hashing (`src/etc/hashIT.ts`)
Uses **Argon2** for secure password hashing and verification.
- **`hashPass(password: string): Promise<string>`**:
  Hashes a password using Argon2. Parameters (parallelism, memoryCost, timeCost, hashLength) are configured via environment variables.
- **`verifyPass(password: string, hash: string): Promise<boolean>`**:
  Verifies a password against an Argon2 hash.

### 2. JWT Utilities (`src/etc/jwtUtils.ts`)
Handles JWT creation and validation using `jsonwebtoken`.
- **`generateAccTok(payload)`**: Generates an Access Token with a 15-minute expiration using `JWT_ACCESS_SECRET`.
- **`generateRefTok(payload)`**: Generates a Refresh Token with a 30-day expiration using `JWT_REFRESH_SECRET`.
- **`verifyAccTok(token)`** & **`verifyRefTok(token)`**: Validate the respective tokens and return the payload.

### 3. API Error (`src/api/apiErr.ts`)
A custom error class extending the built-in `Error` to handle HTTP errors consistently.
- **Properties**:
  - `statuscode`: HTTP status code representing the error.
  - `isOperational`: Boolean flag indicating if it's a known operational error.
- **Static Helpers**:
  - `apiErr.dataNotFound(message)` (404)
  - `apiErr.dataAlreadyExist(message)` (409-like statuscode setup)
  - `apiErr.unauthorizedAccess(message)` (401)
  - `apiErr.unknownErr(message)` (500)

### 4. Redis Client (`src/redis/initRedis.ts`)
Initializes the `ioredis` client.
- **`redis`**: Instantiated Redis client configured using `REDIS_URL` environment variable.

### 5. Email Service (`src/mail/`)
Handles sending emails using the **Resend** SDK.
- **`SendCodeViaMail(payload)`**:
  Sends a verification code email. The payload is validated using Zod.
  - **Payload Properties**:
    - `receiver`: The recipient's email address.
    - `subject`: The subject of the email (optional, defaults to `'mail from chitrapatang'`).
    - `code`: A 4 to 8 digit alphanumeric verification code.
    - `para`: The paragraph text to display in the email body.
    - `expiresAt`: The expiration time of the verification code (`Date`, `string`, or `number`).
- **`SendWelcomeMail(payload)`**:
  Sends a welcome email to a new user. The payload is validated using Zod.
  - **Payload Properties**:
    - `receiver`: The recipient's email address.
    - `subject`: The subject of the email (optional, defaults to `'Welcome to chitrapatang'`).
    - `username`: The username of the new user.


