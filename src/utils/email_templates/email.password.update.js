export const passwordUpdatedByAdminEmail = (name, password, adminName, contactLink) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e8ff;">
        
        <div style="background: #2b3e6c; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">🔐 Contraseña Actualizada por Administrador</h1>
        </div>

        <div style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">
            Hola <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #333;">
            Te informamos que <strong>${adminName}</strong> (Administrador) ha actualizado la contraseña de tu cuenta.
          </p>

          <div style="background: #f0f4ff; border-left: 4px solid #2b3e6c; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; font-size: 14px; color: #555;">
              <strong>Tu nueva contraseña temporal es:</strong>
            </p>
            <p style="margin: 10px 0 0 0; font-size: 20px; color: #2b3e6c; font-family: 'Courier New', monospace; font-weight: bold; letter-spacing: 2px;">
              ${password}
            </p>
          </div>

          <p style="font-size: 16px; color: #333;">
            Por razones de seguridad, te recomendamos que cambies esta contraseña temporal por una nueva apenas ingreses a tu cuenta.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="http://localhost:3001" 
              style="background: #2b3e6c; color: white; padding: 12px 25px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
              Iniciar Sesión
            </a>
          </div>

          <hr style="border: 0; border-top: 1px solid #e0e8ff; margin: 25px 0;">

          <p style="font-size: 16px; color: #d9534f; font-weight: bold;">
            ⚠️ ¿No solicitaste este cambio?
          </p>

          <p style="font-size: 14px; color: #555;">
            Si no reconocés esta actividad o no solicitaste el cambio de contraseña, contactá inmediatamente con el administrador <strong>${adminName}</strong> para proteger tu cuenta.
          </p>

          <div style="text-align: center; margin: 20px 0;">
            <a href="${contactLink}" 
              style="background: #d9534f; color: white; padding: 10px 20px; text-decoration: none; font-size: 14px; border-radius: 5px; display: inline-block;">
              Reportar Actividad Sospechosa
            </a>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; margin-top: 20px; border-radius: 5px;">
            <p style="margin: 0; font-size: 13px; color: #856404;">
              <strong>💡 Consejo de seguridad:</strong> Nunca compartas tu contraseña con nadie. Nuestro equipo nunca te pedirá tu contraseña por correo electrónico o teléfono.
            </p>
          </div>
        </div>

        <div style="background: #2b3e6c; padding: 10px; text-align: center; color: white; font-size: 12px;">
          © 2026 Tu Plataforma de Noticias — Todos los derechos reservados.
        </div>

      </div>
    </div>
  `;
}