import pool from "@/lib/db";
import { getManagerUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import ManagerShell from "@/components/manager/ManagerShell";

export default async function ProtectedManagerLayout({ children }) {
    const session = await getManagerUser();

    if (!session) {
        redirect("/manager/login");
    }

    const result = await pool.query(
        `SELECT id, name, email, role FROM users WHERE id = $1 LIMIT 1`,
        [session.id],
    );

    const user = result.rows[0];

    if (!user) {
        redirect("/manager/login");
    }

    return <ManagerShell user={user}>{children}</ManagerShell>;
}
