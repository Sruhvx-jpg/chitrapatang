import argon2 from "argon2";


export async function hashPass(password: string): Promise<string> {
    if (!password) {
        throw new Error("Password is required for hashing");
    }
    return argon2.hash(password);
}

export async function verifyPass(password: string, hash: string): Promise<boolean> {
    if (!password || !hash) {
        throw new Error("Both password and hash are required for verification");
    }
    return argon2.verify(hash, password);
}
