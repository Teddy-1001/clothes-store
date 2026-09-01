import { getManagerUser } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  try {
    const user = await getManagerUser();

    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const result = await pool.query(`
        SELECT id, name, email, subject, message, status, created_at, updated_at FROM contact_messages ORDER BY created_at DESC
        `);

    const unreadResult = await pool.query(
      `SELECT COUNT(*)::int AS count FROM contact_messages WHERE status = 'unread'`,
    );

    return Response.json({
      success: true,
      messages: result.rows,
      unreadCount: unreadResult.rows[0].count,
    });
  } catch (error) {
    console.error("GET MESSAGES ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Failed to load messages",
        code: error.code || null,
        detail: error.detail || null,
      },
      { status: 500 },
    );
  }
}
