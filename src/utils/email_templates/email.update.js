export const emailChangedNotification = (name, newEmail, contactLink) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e8ff;">
        
        <div style="background: #2b3e6c; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Cambio de Email</h1>
        </div>

        <div style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">
            Hola <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #333;">
            Te escribimos para avisarte que la dirección de correo electrónico asociada a tu cuenta ha sido modificada correctamente.
          </p>

          <div style="background-color: #f8f9fa; border-left: 4px solid #2b3e6c; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-size: 14px; color: #555;">El nuevo correo asociado es:</p>
            <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold; color: #333;">${newEmail}</p>
          </div>
          
          <p style="font-size: 16px; color: #333;">
            A partir de ahora, deberás utilizar el nuevo correo para iniciar sesión y recibir notificaciones.
          </p>

          <hr style="border: 0; border-top: 1px solid #e0e8ff; margin: 25px 0;">

          <p style="font-size: 16px; color: #d9534f; font-weight: bold;">
            ¿No fuiste vos?
          </p>

          <p style="font-size: 14px; color: #555;">
            Si no reconocés este cambio, es muy importante que canceles esta acción inmediatamente, ya que alguien podría tener acceso a tu cuenta.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${contactLink}" 
              style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
              No fui yo - Recuperar cuenta
            </a>
          </div>
        </div>

        <div style="background: #2b3e6c; padding: 10px; text-align: center; color: white; font-size: 12px;">
          © 2025 Tu Plataforma de Noticias — Todos los derechos reservados.
        </div>

      </div>
    </div>
  `;
};