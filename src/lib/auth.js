import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { isManagerRole, MANAGER_ROLES } from "@/lib/roles";

const JWT_SECRET = process.env.JWT_SECRET;

export { MANAGER_ROLES, isManagerRole };

export function createToken(user) {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "7d",
        },
    );
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

export async function getCurrentUser() {
    const cookieStore = await cookies();

    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
        return null;
    }

    return verifyToken(token);
}

export async function getManagerUser() {
    const user = await getCurrentUser();

    if (!user || !isManagerRole(user.role)) {
        return null;
    }

    return user;
}