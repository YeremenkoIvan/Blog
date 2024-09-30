import { randomBytes } from "crypto";

export function generateToken(): string {
    const token = randomBytes(18).toString("hex");
    return token;
}
