# tu camino a alemania

React + Vite frontend con backend Express + nodemailer para enviar formularios a inakipinke@gmail.com.

## Instalación rápida

```bash
npm install
cp .env.example .env
# Edita .env con tus credenciales SMTP (ver abajo)
npm run dev
```

Abre `http://localhost:5173`

## 📧 Configuración de Email

### Opción 1: Gmail (recomendado para desarrollo)

1. Ve a https://myaccount.google.com/apppasswords
2. Selecciona "Mail" y "Windows" (o tu dispositivo)
3. Google te genera una contraseña de 16 caracteres
4. Copia la contraseña y pégala en `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tu@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
```

### Opción 2: Otro proveedor SMTP

- SendGrid, Mailgun, Resend, o tu servidor SMTP corporativo
- Necesitas: host, puerto, usuario, contraseña
- Edita `.env` con tus datos

### Opción 3: Sin configurar (modo demo)

- Sin `.env`, el backend usa Ethereal (test account)
- Los emails se "envían" pero no llegan a inakipinke@gmail.com
- Útil solo para testing

## Producción

```bash
npm run build
npm start
```

## Estructura

- `src/App.jsx`: Rutas (homepage + form)
- `src/index.css`: Estilos modernos
- `server/index.js`: API + email
- `vite.config.js`: Proxy a backend

## API

`POST /api/submit` con JSON:
```json
{
  "firstName": "string",
  "lastName": "string",
  "phone": "string",
  "passport": "string",
  "birthDate": "YYYY-MM-DD"
}
```

Respuesta: `{ "message": "Enviado al correo correctamente" }`

