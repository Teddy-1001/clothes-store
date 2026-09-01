import { getManagerUser } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const user = await getManagerUser();
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const { id } = await params;
    const result = await pool.query(
      `SELECT id, name, email, subject, message, status, created_at, updated_at FROM contact_messages WHERE id = $1 `,
      [id],
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found",
        },
        { status: 404 },
      );
    }

    return Response.json({ success: true, message: result.rows[0] });
  } catch (error) {
    console.error("GET MESSAGE ERROR:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to load message",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await getManagerUser();
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const body = await request.json();

    const { status } = body;

    const allowedStatuses = ["unread", "read", "replied", "resolved"];
    if (!allowedStatuses.includes(status)) {
      return Response.json(
        { success: false, message: "Invalid status" },
        { status: 400 },
      );
    }
    const result = await pool.query(
      `
        UPDATE contact_messages SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, name, email, subject, message, status, created_at, updated_at `,
      [status, id],
    );

    if (result.rows.length === 0) {
      return Response.json(
        { success: false, message: "Message not found" },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      message: result.rows[0],
    });
  } catch (error) {
    console.error("UPDATE MESSAGE ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Failed to update message",
        code: error.code || null,
        detail: error.detail || null,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getManagerUser();
    if (!user) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    const { id } = await params;
    const result = await pool.query(
      ` DELETE FROM contact_messages WHERE id = $1 RETURNING id `,
      [id],
    );
    if (result.rows.length === 0) {
      return Response.json(
        { success: false, message: "Message not found" },
        { status: 404 },
      );
    }
    return Response.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("DELETE MESSAGE ERROR:", error);
    return Response.json(
      { success: false, message: "Failed to delete message" },
      { status: 500 },
    );
  }
}
