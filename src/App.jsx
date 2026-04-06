import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  passport: '',
  birthDate: '',
  turno: 'regular'
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navContainer">
        <Link to="/" className="navLogo">
          <img src={logo} alt="tu camino" />
        </Link>
        <div className="navLinks">
          <Link to="/" className="navLink">Inicio</Link>
          <Link to="/about" className="navLink">Servicios</Link>
          <Link to="/requirements" className="navLink">Requisitos</Link>
          <Link to="/form" className="navLink navLinkPrimary">Regístrate</Link>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="card">
          <h2>Herzlich Willkommen!</h2>

          <p>
            En <strong>Tu camino a Alemania</strong> te acompañamos en cada paso de tu proceso migratorio.
            Nos especializamos en trámites vinculados a Alemania: ciudadanía, pasaportes, visas de estudio,
            Working Holiday y gestión de turnos consulares.
            <br /><br />
            Nuestro equipo combina experiencia en documentación internacional con un enfoque práctico y personalizado.
            Sabemos que emigrar puede ser complejo, por eso simplificamos cada etapa para que puedas avanzar con claridad y seguridad.
            <br /><br />
            Trabajamos con clientes de Argentina y de todo el mundo, brindando asesoramiento claro, respuestas rápidas
            y seguimiento constante hasta completar tu objetivo.
          </p>

          <p style={{ marginTop: '1.5rem' }}>
            Empezá hoy y recibí orientación profesional adaptada a tu caso. No pierdas tiempo, los turnos son limitados y la demanda es alta. ¡Tu camino a Alemania comienza aquí!
          </p>

          <Link to="/about" className="primaryBtn">
            Más información →
          </Link>
        </section>
      </main>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="card cardR">
          <h2>Sobre Tu camino a Alemania</h2>

          <p>
            <strong>Tu camino a Alemania</strong> nace con el objetivo de hacer que los procesos migratorios
            sean más simples, claros y accesibles. Sabemos que cada caso es distinto, por eso ofrecemos
            asesoramiento personalizado adaptado a la situación de cada cliente.
          </p>


<h3>Nuestros servicios</h3>
<ul>
  <li>
    <strong>Turno Regular (EUR 79)</strong><br />
    Serás incluido en una lista de espera. El tiempo estimado para conseguir el turno con la embajada puede variar entre 2 semanas y 2 meses.
  </li>
  <br />
  <li>
    <strong>Turno Express (EUR 119)</strong><br />
    Conseguimos el turno en un plazo estimado de 1 a 3 días, pudiendo extenderse hasta 2 semanas. Ideal para quienes necesitan una respuesta rápida o tienen fechas límite próximas.
  </li>
</ul>

          <h3>¿Por qué elegirnos?</h3>
          <ul>
            <li>Atención personalizada en cada caso</li>
            <li>Experiencia en procesos migratorios hacia Alemania</li>
            <li>Comunicación clara y sin tecnicismos innecesarios</li>
            <li>Acompañamiento paso a paso</li>
            <li>Enfoque práctico orientado a resultados</li>
          </ul>

          <p style={{ marginTop: '2rem' }}>
            Nuestro objetivo es que puedas avanzar con confianza, evitando errores comunes y ahorrando tiempo
            en cada gestión.
          </p>

          <p>
            <Link to="/requirements" className="primaryBtn">
              Ver requisitos
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}

function RequirementsPage() {
  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="card cardR">
          <h2>Requisitos</h2>

          <ul>
            <li>Contar con pasaporte argentino válido y en vigencia al momento de la solicitud.</li>
            <li>Tener entre 18 y 30 años inclusive al aplicar (si ya cumpliste 31, no podés iniciar el trámite, aunque sí ingresar si la visa fue otorgada antes).</li>
            <li>No haber utilizado anteriormente esta visa en Alemania, ya que solo se puede obtener una vez en la vida.</li>
            <li>Demostrar que disponés de fondos suficientes para cubrir tus gastos iniciales durante la estadía.</li>
            <li>Presentar un pasaje de ida a Alemania (requisito obligatorio).</li>
            <li>Contar con un pasaje de regreso o acreditar dinero adicional para poder comprarlo.</li>
            <li>No está permitido viajar con personas a cargo que no tengan su propia visa; cada acompañante debe gestionar su permiso de residencia por separado.</li>
            <li>Disponer de un seguro médico y de accidentes válido durante toda la estadía, con una cobertura mínima de 30.000 euros, incluyendo repatriación.</li>
            <li>Redactar una carta de motivación explicando el propósito del viaje.</li>
            <li>Presentar un currículum vitae actualizado.</li>
            <li>Aportar un certificado de antecedentes penales.</li>
            <li>Completar una declaración jurada sobre domicilio en Alemania, sistema de aportes y posibles viajes dentro del espacio Schengen.</li>
            <li>Presentar un comprobante de alojamiento o, en su defecto, una carta de invitación.</li>
            <li>El viaje debe declararse como de carácter principalmente turístico, aunque durante la vigencia de la visa se permite trabajar sin restricciones dentro del período autorizado.</li>
          </ul>

          <Link to="/form" className="primaryBtn">
            Registrate
          </Link>
        </section>
      </main>
    </div>
  );
}

function FormPage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      const res = await axios.post('/api/submit', form);
      setStatus(res?.data?.message || '¡Formulario enviado! Revisa tu correo.');
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      setStatus('Error al enviar. Revisa la consola');
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="card cardF">
          <h2>Registro</h2>

          <form onSubmit={handleSubmit} className="form">
            <label>
              Nombre
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Apellido
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Correo Electrónico
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
              />
            </label>

            <label>
              Teléfono
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                type="tel"
                required
              />
            </label>

            <label>
              Número de Pasaporte
              <input
                name="passport"
                value={form.passport}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Fecha de nacimiento
              <input
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                type="date"
                required
              />
            </label>

            <button
              type="submit"
              className="primaryBtn"
              style={{ width: '100%' }}
            >
              Enviar
            </button>
          </form>

          <p className="status">{status}</p>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/requirements" element={<RequirementsPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  );
}