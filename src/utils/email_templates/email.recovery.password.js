export const passwordChangedEmail = (name, contactLink) => {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e8ff;">
        
        <div style="background: #2b3e6c; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Contraseña Actualizada</h1>
        </div>

        <div style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">
            Hola <strong>${name}</strong>,
          </p>

          <p style="font-size: 16px; color: #333;">
            Te informamos que la contraseña de tu cuenta ha sido modificada correctamente hace unos instantes.
          </p>
          
          <p style="font-size: 16px; color: #333;">
            Si fuiste vos quien realizó este cambio, no es necesario que hagas nada más. Ya podés ingresar con tu nueva clave.
          </p>

          <hr style="border: 0; border-top: 1px solid #e0e8ff; margin: 25px 0;">

          <p style="font-size: 16px; color: #d9534f; font-weight: bold;">
            ¿No fuiste vos?
          </p>

          <p style="font-size: 14px; color: #555;">
            Si no reconocés esta actividad, es posible que alguien haya accedido a tu cuenta. Por favor, asegurá tu cuenta de inmediato haciendo clic abajo:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${contactLink}" 
              style="background: #d9534f; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
              No fui yo - Proteger cuenta
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