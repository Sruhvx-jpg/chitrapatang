import argon2 from "argon2";
import { env } from "../../env";



export async function hashPass(password: string): Promise<string> {
    if (!password) {
        throw new Error("Password is required for hashing");
    }
    return argon2.hash(password, {
        memoryCost: env.ARGON_MEMORY_COST,
        timeCost: env.ARGON_TIME_COST,
        hashLength: env.ARGON_HASH_LENGTH,
        parallelism: env.ARGON_PARALLELISM,
    }).catch(() => {
        throw new Error("Failed to hash password");
    });
}

export async function verifyPass(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
        throw new Error("Both password and hash are required for verification");
    }
    return argon2.verify(hash, password).catch(() => {
        throw new Error("Failed to verify password");
    });
}
