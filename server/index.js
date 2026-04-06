import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Esta es la API de backend. Usa http://localhost:5173 para la UI.');
});

app.post('/api/submit', async (req, res) => {
  const { firstName, lastName, email, phone, passport, birthDate, turno } = req.body;

  if (!firstName || !lastName || !email || !phone || !passport || !birthDate || !turno) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  //const turnoLabel = turno === 'express' ? 'Turno Express' : 'Turno Regular';

  const message = `
Nuevo envío de formulario:

Nombre: ${firstName}
Apellido: ${lastName}
Correo: ${email}
Teléfono: ${phone}
Pasaporte: ${passport}
Fecha de nacimiento: ${birthDate}
${/* Servicio: ${turnoLabel} */ ''}
`;

  try {
    let transporter;
    let isTestAccount = false;
    let smtpUser = process.env.SMTP_USER;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('No SMTP configurado. Se usa cuenta Ethereal temporal (test) para emular envío.');
      const testAccount = await nodemailer.createTestAccount();
      smtpUser = testAccount.user;
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      isTestAccount = true;
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    }

    const sent = await transporter.sendMail({
      from: `Formulário Tu Camino <${smtpUser}>`,
      to: 'gestoriaturnosytramites@gmail.com',
      subject: 'Nuevo registro: tu camino a alemania',
      text: message
    });

    if (isTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(sent);
      console.log('Ethereal test message URL:', previewUrl);
      return res.json({ message: 'Formulario recibido (demo). Verifica la URL de preview en consola.', preview: previewUrl });
    }

    return res.json({ message: 'Enviado al correo correctamente' });
  } catch (err) {
    console.error('Error al enviar el correo:', err);
    return res.status(500).json({ message: 'Error en el servidor al enviar correo' });
  }
});

const tryPorts = [PORT, 5002, 5003, 5004, 5005];

function startServer(portIndex = 0) {
  if (portIndex >= tryPorts.length) {
    console.error('No hay puertos libres en la lista:', tryPorts);
    process.exit(1);
  }

  const port = tryPorts[portIndex];
  const server = app.listen(port, () => {
    console.log(`Servidor backend arrancado en http://localhost:${port}`);
    if (port !== PORT) {
      console.log(`Nota: puerto inicialmente esperado ${PORT} ocupado, usando ${port}`);
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Puerto ${port} ocupado, probando siguiente...`);
      startServer(portIndex + 1);
    } else {
      console.error('Error del servidor:', err);
      process.exit(1);
    }
  });
}

startServer();
