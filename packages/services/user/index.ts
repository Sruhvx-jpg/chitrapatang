import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import { usersTable, refreshTokensTable } from "@repo/database/schema";
import { hashPass, generateRefTok, generateAccTok, verifyPass, encrypt, decrypt, redis, SendCodeViaMail } from "@repo/utils";
import { registerUserInputModel, registerUserInputType, loginUserInputModel, loginUserInputType, verifyEmailInputModel, verifyEmailInputType } from "./model";

class UserService {
    //--------------------------- private method --------------------------------------

    private async findUserByEmail(email: string) {
        const users = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
        return users[0] || null;
    }

    private async createUser(user: typeof usersTable.$inferInsert) {
        const users = await db
            .insert(usersTable)
            .values(user)
            .returning();
        return users[0];
    }

    private async saveRefreshToken(token: typeof refreshTokensTable.$inferInsert) {
        const tokens = await db
            .insert(refreshTokensTable)
            .values(token)
            .returning();
        return tokens[0];
    }

    private async verifyUserEmail(userId: string) {
        const users = await db
            .update(usersTable)
            .set({ emailVerified: true })
            .where(eq(usersTable.id, userId))
            .returning();
        return users[0];
    }

    //--------------------------- public method --------------------------------------

    public async registerUser(payload: registerUserInputType) {
        try {
            const parsedPayload = registerUserInputModel.parse(payload);

            const existingUser = await this.findUserByEmail(parsedPayload.email);
            if (existingUser) {
                throw new Error("User already exists");
            }

            const hashedPassword = await hashPass(parsedPayload.password);

            const user = await this.createUser({
                fullName: parsedPayload.fullName,
                email: parsedPayload.email,
                password: hashedPassword,
            });

            if (!user) {
                throw new Error("Failed to create user");
            }

            const accessToken = generateAccTok({ sub: user.id });
            const refreshToken = generateRefTok({ sub: user.id });

            const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

            await this.saveRefreshToken({
                userId: user.id,
                refreshToken,
                accessToken,
                expiresAt,
            });

            return {
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                },
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            throw new Error(error.message || "Failed to register user");
        }
    }

    public async loginUser(payload: loginUserInputType) {
        try {
            const parsedPayload = loginUserInputModel.parse(payload);
            const user = await this.findUserByEmail(parsedPayload.email);

            if (!user) {
                throw new Error("Invalid email or password");
            }

            const isPasswordCorrect = await verifyPass(parsedPayload.password, user.password);
            if (!isPasswordCorrect) {
                throw new Error("Invalid email or password");
            }

            if (user.emailVerified) {
                const accessToken = generateAccTok({ sub: user.id });
                const refreshToken = generateRefTok({ sub: user.id });

                const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

                await this.saveRefreshToken({
                    userId: user.id,
                    refreshToken,
                    accessToken,
                    expiresAt,
                });

                return {
                    emailVerified: true,
                    fullName: user.fullName,
                    email: user.email,
                    accessToken,
                    refreshToken,
                };
            } else {
                // Generate a 4-digit OTP
                const otp = Math.floor(1000 + Math.random() * 9000).toString();

                // Encrypt the OTP
                const encryptedOtp = encrypt(otp);

                // Store in Redis with expiration (10 minutes)
                const expirationTime = Date.now() + 10 * 60 * 1000;
                const redisValue = `${encryptedOtp}:${expirationTime}`;
                await redis.set(`otp:${user.email}`, redisValue, "EX", 10 * 60);

                // Send verification code email
                await SendCodeViaMail({
                    receiver: user.email,
                    subject: "Verify your email address",
                    code: otp,
                    para: "Please verify your email address using this 4-digit verification code.",
                    expiresAt: expirationTime,
                });

                return {
                    emailVerified: false,
                    fullName: user.fullName,
                    email: user.email,
                };
            }
        } catch (error: any) {
            throw new Error(error.message || "Failed to login user");
        }
    }

    public async verifyEmail(payload: verifyEmailInputType) {
        try {
            const parsedPayload = verifyEmailInputModel.parse(payload);
            const user = await this.findUserByEmail(parsedPayload.email);

            if (!user) {
                throw new Error("User not found");
            }

            const redisKey = `otp:${user.email}`;
            const storedValue = await redis.get(redisKey);

            if (!storedValue) {
                throw new Error("Verification code has expired or is invalid");
            }

            const lastColonIndex = storedValue.lastIndexOf(":");
            if (lastColonIndex === -1) {
                throw new Error("Invalid verification code storage format");
            }

            const encryptedOtp = storedValue.substring(0, lastColonIndex);
            const expirationTimestamp = storedValue.substring(lastColonIndex + 1);

            if (Date.now() > Number(expirationTimestamp)) {
                await redis.del(redisKey);
                throw new Error("Verification code has expired");
            }

            const decryptedOtp = decrypt(encryptedOtp);

            if (decryptedOtp !== parsedPayload.code) {
                throw new Error("Invalid verification code");
            }

            // Mark email as verified
            await this.verifyUserEmail(user.id);

            // Generate tokens
            const accessToken = generateAccTok({ sub: user.id });
            const refreshToken = generateRefTok({ sub: user.id });

            const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

            await this.saveRefreshToken({
                userId: user.id,
                refreshToken,
                accessToken,
                expiresAt,
            });

            // Delete OTP from Redis
            await redis.del(redisKey);

            return {
                fullName: user.fullName,
                email: user.email,
                accessToken,
                refreshToken,
            };
        } catch (error: any) {
            throw new Error(error.message || "Failed to verify email");
        }
    }
}

export default UserService;
