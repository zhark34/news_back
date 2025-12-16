export const loginAlertEmail = (name, loginLink, ip, country, province, city) => {
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f5f9ff; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #e0e8ff;">
        
        <div style="background: #2b3e6c; padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 24px;">Nuevo inicio de sesión</h1>
        </div>
  
        <div style="padding: 25px;">
          <p style="font-size: 16px; color: #333;">
            Hola <strong>${name}</strong>, hemos detectado un nuevo acceso a tu cuenta en nuestra plataforma.
          </p>
  
          <p style="font-size: 16px; color: #333;">
            A continuación te detallamos los datos del dispositivo conectado:
          </p>
  
          <div style="background: #f0f6ff; padding: 15px; border-radius: 8px; margin: 15px 0; border: 1px solid #d6e4ff;">
            <p style="margin: 5px 0; font-size: 15px;"><strong>Dirección IP:</strong> ${ip}</p>
            <p style="margin: 5px 0; font-size: 15px;"><strong>Ubicación:</strong> ${city}, ${province}, ${country}</p>
          </div>
  
          <div style="text-align: center; margin: 30px 0;">
            <a href="${loginLink}" 
              style="background: #2b3e6c; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
              Verificar mi actividad
            </a>
          </div>
  
          <p style="font-size: 14px; color: #555;">
            ✅ <strong>¿Fuiste vos?</strong> Si reconocés este acceso, podés ignorar este correo.
          </p>
  
          <p style="font-size: 14px; color: #d9534f;">
            ⚠️ <strong>¿No fuiste vos?</strong> Por favor, cambiá tu contraseña inmediatamente y contactá al soporte.
          </p>
        </div>
  
        <div style="background: #2b3e6c; padding: 10px; text-align: center; color: white; font-size: 12px;">
          © 2025 Tu Plataforma de Noticias — Seguridad de la cuenta.
        </div>
  
      </div>
    </div>
  `;
};