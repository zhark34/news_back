export const journalistWelcomeEmail = (name, email, password, loginLink) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e8ff;">
        
        <div style="background: #2b3e6c; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">¡Bienvenido, ${name}!</h1>
        </div>

        <div style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">
            Tu cuenta como <strong>periodista</strong> en nuestra plataforma ha sido creada correctamente.
          </p>

          <p style="font-size: 16px; color: #333;">
            Podés acceder a tu panel utilizando las siguientes credenciales:
          </p>

          <div style="background: #f0f6ff; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #d6e4ff;">
            <p style="margin: 5px 0; font-size: 15px;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0; font-size: 15px;"><strong>Contraseña temporal:</strong> ${password}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginLink}" 
              style="background: #2b3e6c; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
              Ingresar a mi cuenta
            </a>
          </div>

          <p style="font-size: 14px; color: #555;">
            ⚠️ Por seguridad, te recomendamos <strong>cambiar la contraseña</strong> una vez que ingreses.
          </p>

          <p style="font-size: 14px; color: #555;">
            Si no reconocés esta acción, por favor contactá con el administrador de inmediato.
          </p>
        </div>

        <div style="background: #2b3e6c; padding: 10px; text-align: center; color: white; font-size: 12px;">
          © 2025 Tu Plataforma de Noticias — Todos los derechos reservados.
        </div>

      </div>
    </div>
  `;
};
