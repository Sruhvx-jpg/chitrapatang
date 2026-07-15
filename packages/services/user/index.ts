import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import { usersTable, refreshTokensTable } from "@repo/database/schema";
import { hashPass, generateRefTok, generateAccTok } from "@repo/utils";
import { registerUserInputModel, registerUserInputType } from "./model";

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
}

export default UserService;
