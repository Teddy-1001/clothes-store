import pool from "@/lib/db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export async function POST(request) {
    try {
        const body = await request.json();

        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return Response.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return Response.json(
                {
                    success: false,
                    message: "Please provide a valid email address.",
                },
                { status: 400 }
            );
        }

        if (name.length > 100) {
            return Response.json(
                {
                    success: false,
                    message: "Name is too long.",
                },
                { status: 400 }
            );
        }

        if (subject.length > 150) {
            return Response.json(
                {
                    success: false,
                    message: "Subject is too long.",
                },
                { status: 400 }
            );
        }

        if (message.length > 5000) {
            return Response.json(
                {
                    success: false,
                    message: "Message is too long.",
                },
                { status: 400 }
            );
        }

        // Save message to database
        const result = await pool.query(
            `
                INSERT INTO contact_messages (
                    name,
                    email,
                    subject,
                    message
                )
                VALUES ($1, $2, $3, $4)
                RETURNING id, created_at
            `,
            [
                name.trim(),
                email.trim().toLowerCase(),
                subject.trim(),
                message.trim(),
            ]
        );

        const savedMessage = result.rows[0];

        // Send email to customer service Gmail
        const info = await transporter.sendMail({
            from: `"Masangala Wears" <${process.env.GMAIL_USER}>`,
            to: process.env.CONTACT_EMAIL,
            replyTo: email.trim(),
            subject: `Contact Form: ${subject.trim()}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { font-family: Arial, sans-serif; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px; }
                        .header { background-color: #1a1a1a; color: white; padding: 15px; border-radius: 4px 4px 0 0; text-align: center; }
                        .content { background-color: white; padding: 20px; }
                        .field { margin-bottom: 15px; }
                        .label { font-weight: bold; color: #555; margin-bottom: 5px; }
                        .value { padding: 10px; background-color: #f5f5f5; border-left: 3px solid #333; padding-left: 10px; }
                        .footer { font-size: 12px; color: #999; margin-top: 20px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h2>New Contact Form Submission</h2>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">From:</div>
                                <div class="value">${escapeHtml(name)}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email:</div>
                                <div class="value">${escapeHtml(email)}</div>
                            </div>
                            <div class="field">
                                <div class="label">Subject:</div>
                                <div class="value">${escapeHtml(subject)}</div>
                            </div>
                            <div class="field">
                                <div class="label">Message:</div>
                                <div class="value">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Message ID: ${savedMessage.id} | Received: ${savedMessage.created_at}</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        return Response.json(
            {
                success: true,
                message: "Your message has been sent successfully.",
                id: savedMessage.id,
                emailId: info.messageId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("CONTACT API ERROR:", error);

        return Response.json(
            {
                success: false,
                message:
                    "Something went wrong. Please try again later.",
            },
            { status: 500 }
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