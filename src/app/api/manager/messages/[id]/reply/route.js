import { getManagerUser } from "@/lib/auth";
import pool from "@/lib/db";
import { Resend } from "resend";
import nodemailer from "nodemailer";

// const resend = new Resend(process.env.RESEND_API_KEY);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(request, { params }) {
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
    const body = await request.json();
    const reply = body.reply?.trim();

    if (!reply) {
      return Response.json(
        {
          success: false,
          message: "Reply message is required.",
        },
        { status: 400 },
      );
    }

    if (reply.length > 5000) {
      return Response.json(
        {
          success: false,
          message: "Reply is too long.",
        },
        { status: 400 },
      );
    }

    const result = await pool.query(
      `SELECT id, name, email, subject, message, status FROM contact_messages WHERE id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found.",
        },
        { status: 404 },
      );
    }

    const customer = result.rows[0];

    //send reply
    const info = await transporter.sendMail({
      from: `"Masangala Wears" <${process.env.GMAIL_USER}>`,
      to: [customer.email],
      replyTo: process.env.CONTACT_EMAIL,
      subject: `Re: ${customer.subject}`,
      html: `
                <div style="
                    margin: 0;
                    padding: 0;
                    background-color: #f7f7f5;
                    font-family: Arial, Helvetica, sans-serif;
                    color: #111111;
                ">
                    <div style="
                        max-width: 640px;
                        margin: 0 auto;
                        padding: 40px 20px;
                    ">

                        <!-- Header -->
                        <div style="
                            background-color: #111111;
                            padding: 32px 36px;
                            text-align: center;
                        ">
                            <p style="
                                margin: 0;
                                color: #ffffff;
                                font-size: 12px;
                                font-weight: 600;
                                letter-spacing: 4px;
                                text-transform: uppercase;
                            ">
                                MASANGALA WEARS
                            </p>
                        </div>

                        <!-- Content -->
                        <div style="
                            background-color: #ffffff;
                            padding: 42px 36px;
                            border-left: 1px solid #e5e5e5;
                            border-right: 1px solid #e5e5e5;
                        ">

                            <p style="
                                margin: 0 0 10px;
                                color: #777777;
                                font-size: 11px;
                                font-weight: 600;
                                letter-spacing: 2px;
                                text-transform: uppercase;
                            ">
                                Customer Service
                            </p>

                            <h1 style="
                                margin: 0 0 28px;
                                color: #111111;
                                font-size: 30px;
                                line-height: 1.2;
                                font-weight: 500;
                            ">
                                Hello ${escapeHtml(customer.name)}
                            </h1>

                            <p style="
                                margin: 0 0 28px;
                                color: #666666;
                                font-size: 14px;
                                line-height: 1.8;
                            ">
                                Thank you for contacting Masangala Wears.
                                Please find our response below.
                            </p>

                            <!-- Original Subject -->
                            <div style="
                                border-top: 1px solid #e5e5e5;
                                border-bottom: 1px solid #e5e5e5;
                                padding: 20px 0;
                            ">
                                <p style="
                                    margin: 0 0 6px;
                                    color: #999999;
                                    font-size: 10px;
                                    font-weight: 600;
                                    letter-spacing: 1.5px;
                                    text-transform: uppercase;
                                ">
                                    Subject
                                </p>

                                <p style="
                                    margin: 0;
                                    color: #111111;
                                    font-size: 14px;
                                ">
                                    ${escapeHtml(customer.subject)}
                                </p>
                            </div>

                            <!-- Reply -->
                            <div style="padding-top: 30px;">
                                <p style="
                                    margin: 0 0 12px;
                                    color: #999999;
                                    font-size: 10px;
                                    font-weight: 600;
                                    letter-spacing: 1.5px;
                                    text-transform: uppercase;
                                ">
                                    Response
                                </p>

                                <div style="
                                    background-color: #f7f7f5;
                                    border-left: 3px solid #111111;
                                    padding: 20px 22px;
                                ">
                                    <p style="
                                        margin: 0;
                                        color: #333333;
                                        font-size: 14px;
                                        line-height: 1.8;
                                    ">
                                        ${escapeHtml(reply).replace(/\n/g, "<br />")}
                                    </p>
                                </div>
                            </div>

                            <p style="
                                margin: 32px 0 0;
                                color: #666666;
                                font-size: 13px;
                                line-height: 1.7;
                            ">
                                If you have any further questions, simply reply
                                to this email and our team will be happy to help.
                            </p>

                        </div>

                        <!-- Footer -->
                        <div style="
                            background-color: #111111;
                            padding: 26px 36px;
                            text-align: center;
                        ">
                            <p style="
                                margin: 0 0 8px;
                                color: #ffffff;
                                font-size: 11px;
                                font-weight: 600;
                                letter-spacing: 2px;
                                text-transform: uppercase;
                            ">
                                MASANGALA WEARS
                            </p>

                            <p style="
                                margin: 0;
                                color: #888888;
                                font-size: 11px;
                                line-height: 1.6;
                            ">
                                Customer Support
                            </p>
                        </div>

                    </div>
                </div>
            `,
    });

   

    //mark original mesasge as replied
    const updated = await pool.query(
      `
            UPDATE contact_messages
            SET status = 'replied',
            updated_at = NOW()
            WHERE id = $1
            RETURNING
                id,
                name,
                email,
                subject,
                message,
                status,
                created_at,
                updated_at
            `,
      [id],
    );

    return Response.json({
      success: true,
      message: "Reply sent successfully.",
      emailId: info.messageId || null,
      updatedMessage: updated.rows[0],
    });
  } catch (error) {
    console.error("REPLY API ERROR:", error);

    return Response.json(
      {
        success: false,
        message:
          error.message || "Something went wrong while sending the reply.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
