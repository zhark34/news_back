import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error al conectar con el servidor SMTP:", error);
    } else {
        console.log("Servidor SMTP listo para enviar emails");
    }
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            to,
            subject,
            html
        });

        console.log("Email enviado:", info.messageId);
        return info;

    } catch (error) {
        console.error("Error al enviar email:", error);
        throw new Error("EMAIL_SEND_FAIL");
    }
};

export default transporter;