export const passwordTokenEmail = (name, resetLink) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e8ff;">
        
        <div style="background: #2b3e6c; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Recuperación de Contraseña</h1>
        </div>

        <div style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">
            Hola <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #333;">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta.
            Para continuar y crear una nueva clave, hacé clic en el siguiente botón:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetLink}" 
              style="background: #2b3e6c; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
              Restablecer mi contraseña
            </a>
          </div>

          <p style="font-size: 14px; color: #555;">
            ⚠️ Este enlace tiene una validez limitada por motivos de seguridad.
          </p>

          <p style="font-size: 14px; color: #555;">
            Si no solicitaste este cambio, podés ignorar este correo tranquilamente. Tu contraseña actual seguirá funcionando y tu cuenta permanece segura.
          </p>
        </div>

        <div style="background: #2b3e6c; padding: 10px; text-align: center; color: white; font-size: 12px;">
          © 2025 Tu Plataforma de Noticias — Todos los derechos reservados.
        </div>

      </div>
    </div>
  `;
};