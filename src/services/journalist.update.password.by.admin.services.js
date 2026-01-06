import Journalist from "../models/journalist.js";
import { sendEmail } from "../config/nodemailer.js"
import { generatePassword } from "../utils/generate.password.js";
import { passwordUpdatedByAdminEmail } from "../utils/email_templates/email.password.update.js";
import { hashPassword } from "../utils/hash.password.js";

export const updatePasswordByAdminServices = async (adminId, journalistId) => {

    const journalist = await Journalist.findOne({ where: { journalist_id: journalistId } });

    const admin = await Journalist.findOne({ where: { journalist_id: adminId } });

    if (!journalist) {
        throw new Error("NO_JOURNALIST_FOUND");
    }

    if (!admin) {
        throw new Error("NO_ADMIN_FOUND");
    }

    if (admin.role !== "admin") {
        throw new Error("USER_NO_AUTHORIZED");
    }

    const password = await generatePassword();

    const hashedPassword = await hashPassword(password);

    journalist.password = hashedPassword;

    await journalist.save();

    await sendEmail({
        to: journalist.email,
        subject: "Contraseña Actualizada",
        html: passwordUpdatedByAdminEmail(journalist.name, password, admin.name, "localhost:3001")
    });

    return "Contraseña actualizada correctamente";

}
