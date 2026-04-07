import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  passport: '',
  birthDate: '',
  embajada: '',
  turno: 'regular',
  formularioVidex: false,
  cartaMotivacion: false,
  curriculumEuropass: false,
  todosDocumentos: false
};

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navContainer">
        <Link to="/" className="navLogo" onClick={closeMobileMenu}>
          <img src={logo} alt="tu camino" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="navLinks desktop-nav">
          <Link to="/" className="navLink">Inicio</Link>
          <Link to="/about" className="navLink">Servicios</Link>
          <Link to="/requirements" className="navLink">Requisitos</Link>
          <Link to="/contact" className="navLink">Contáctanos</Link>
          <Link to="/form" className="navLink navLinkPrimary">Regístrate</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Navigation */}
        <div className={`navLinks mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="navLink" onClick={closeMobileMenu}>Inicio</Link>
          <Link to="/about" className="navLink" onClick={closeMobileMenu}>Servicios</Link>
          <Link to="/requirements" className="navLink" onClick={closeMobileMenu}>Requisitos</Link>
          <Link to="/contact" className="navLink" onClick={closeMobileMenu}>Contáctanos</Link>
          <Link to="/form" className="navLink navLinkPrimary" onClick={closeMobileMenu}>Regístrate</Link>
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
        <section className="card cardP">
          <h2>Willkommen!</h2>

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
            asesoramiento personalizado adaptado a la situación de cada cliente. Trabajamos con todas las embajadas alemanas de latinoamerica. 📲 Seguinos en Instagram: <a className="serviceLink" href="https://www.instagram.com/camino_alemania2026/?hl=es" target="_blank" rel="noopener noreferrer">@camino_alemania2026</a> para tips, novedades y turnos disponibles.
          </p>

          <h3>Nuestros servicios</h3>
          <div className="contact-list services-list">
            <div className="contact-item">
              <div>
                <h3>Turno Regular</h3>
                <p>
                  Serás incluido en una lista de espera. El tiempo estimado para conseguir la asignación del turno con la embajada puede variar entre 2 semanas y 2 meses. Tené en cuenta que la fecha del turno en sí suele ser aproximadamente 2 meses después de haber sido asignado.
                </p>
              </div>
              <strong className="service-price">EUR 119</strong>
            </div>

            <div className="contact-item">
              <div>
                <h3>Turno Express</h3>
                <p>
                  Conseguimos el turno (la asignación de la cita) en un plazo estimado de 1 a 3 días, pudiendo extenderse hasta 2 semanas. Tené en cuenta que la fecha del turno en sí suele ser aproximadamente 2 meses después de haber sido asignado. Ideal para quienes necesitan una respuesta rápida o tienen fechas límite próximas.
                </p>
              </div>
              <strong className="service-price">EUR 199</strong>
            </div>

            <div className="contact-item">
              <div>
                <h3>Formulario Videx</h3>
                <p>
                  Te ayudamos a completar el formulario Videx, necesario para la mayoría de los trámites relacionados con Alemania.
                </p>
              </div>
              <strong className="service-price">EUR 20</strong>
            </div>

            <div className="contact-item">
              <div>
                <h3>Carta de motivación</h3>
                <p>
                  Te ayudamos a completar la carta de motivación, la cual es fundamental para explicar el propósito de tu viaje y demostrar tu interés genuino en Alemania.
                </p>
              </div>
              <strong className="service-price">EUR 10</strong>
            </div>

            <div className="contact-item">
              <div>
                <h3>Currículum con Europass</h3>
                <p>
                  Corroboramos tu currículum vitae y lo adaptamos al formato Europass, reconocido internacionalmente, para que puedas presentar tu experiencia de manera clara y profesional en tus trámites migratorios hacia Alemania.
                </p>
              </div>
              <strong className="service-price">EUR 10</strong>
            </div>

            <div className="contact-item">
              <div>
                <h3>Todos los documentos</h3>
                <p>
                  Asistencia completa con todos los documentos necesarios para tu trámite, incluyendo el formulario Videx, carta de motivación y currículum vitae en formato Europass, asegurando que tu solicitud esté completa y bien presentada.
                </p>
              </div>
              <strong className="service-price">EUR 35</strong>
            </div>
          </div>

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
        <section className="card cardR requirements-card">
          <h2>Requisitos</h2>

          <ul>
            <li>Contar con un pasaporte argentino válido y vigente al momento de la solicitud.</li>
            <li>Tener entre 18 y 30 años inclusive al momento de aplicar (si ya cumpliste 31 años, no podrás iniciar el trámite, aunque sí podrás ingresar si la visa fue otorgada antes).</li>
            <li>No haber utilizado anteriormente esta visa en Alemania, ya que solo se puede obtener una vez en la vida.</li>
            <li>Demostrar que se dispone de fondos suficientes para cubrir los gastos iniciales durante la estancia.</li>
            <li>Presentar un pasaje de ida a Alemania (requisito obligatorio).</li>
            <li>Contar con un pasaje de regreso o acreditar fondos adicionales para poder adquirirlo.</li>
            <li>No está permitido viajar con personas a cargo que no cuenten con su propia visa; cada acompañante debe gestionar su permiso de residencia por separado.</li>
            <li>Disponer de un seguro médico y de accidentes válido durante toda la estancia, con una cobertura mínima de 30.000 euros, incluyendo repatriación.</li>
            <li>Redactar una carta de motivación explicando el propósito del viaje.</li>
            <li>Presentar un currículum vitae actualizado.</li>
            <li>Aportar un certificado de antecedentes penales.</li>
            <li>Completar una declaración jurada sobre el domicilio en Alemania, el sistema de aportes y posibles viajes dentro del espacio Schengen.</li>
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
    const { name, type, value, checked } = e.target;
    setForm((prev) => {
      if (type !== 'checkbox') {
        return {
          ...prev,
          [name]: value
        };
      }

      if (name === 'todosDocumentos') {
        return {
          ...prev,
          todosDocumentos: checked,
          formularioVidex: checked ? false : prev.formularioVidex,
          cartaMotivacion: checked ? false : prev.cartaMotivacion,
          curriculumEuropass: checked ? false : prev.curriculumEuropass
        };
      }

      return {
        ...prev,
        [name]: checked,
        todosDocumentos: checked ? false : prev.todosDocumentos
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');

    try {
      // Store form data in localStorage (backup)
      const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
      const newSubmission = {
        ...form,
        timestamp: new Date().toISOString()
      };
      submissions.push(newSubmission);
      localStorage.setItem('formSubmissions', JSON.stringify(submissions));

      // Send to Formspree for email notification
      const FORMSPREE_ID = 'mjgpjqap';
      
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          passport: form.passport,
          birthDate: form.birthDate,
          embajada: form.embajada,
          turno: form.turno,
          formularioVidex: form.formularioVidex ? 'Sí' : 'No',
          cartaMotivacion: form.cartaMotivacion ? 'Sí' : 'No',
          curriculumEuropass: form.curriculumEuropass ? 'Sí' : 'No',
          todosDocumentos: form.todosDocumentos ? 'Sí' : 'No',
          _replyto: form.email,
        }),
      });

      console.log('Formspree response status:', response.status);
      console.log('Formspree response:', await response.text());

      if (response.ok) {
        setStatus('¡Formulario enviado exitosamente! Te vamos a contactar pronto.');
      } else {
        setStatus('Error al enviar, contactanos directamente a nuestro correo');
      }
      
      setForm(initialForm);
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error(error);
      setStatus('Error al enviar, contactanos directamente a nuestro correo');
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

            <label>
              Embajada (país o ciudad)
              <input
                name="embajada"
                value={form.embajada}
                onChange={handleChange}
                placeholder="Ej: Alemania, Madrid, Buenos Aires"
                required
              />
            </label>

            <label>
              Turno
              <select
                name="turno"
                value={form.turno}
                onChange={handleChange}
                required
              >
                <option value="regular">Regular (EUR 119)</option>
                <option value="express">Express (EUR 199)</option>
                <option value="ninguno">Ninguno</option>
              </select>
            </label>

            <div className="checkboxGroup">
              <strong>Servicios adicionales</strong>

              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="formularioVidex"
                  checked={form.formularioVidex}
                  onChange={handleChange}
                />
                Formulario Videx (EUR 20)
              </label>

              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="cartaMotivacion"
                  checked={form.cartaMotivacion}
                  onChange={handleChange}
                />
                Carta de motivación (EUR 10)
              </label>

              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="curriculumEuropass"
                  checked={form.curriculumEuropass}
                  onChange={handleChange}
                />
                Currículum con Europass (EUR 10)
              </label>

              <label className="checkboxLabel">
                <input
                  type="checkbox"
                  name="todosDocumentos"
                  checked={form.todosDocumentos}
                  onChange={handleChange}
                />
                Todos los documentos (EUR 35)
              </label>
            </div>

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

function AdminPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    setSubmissions(data);
  }, []);

  const handleDownload = () => {
    const dataStr = JSON.stringify(submissions, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `submissions_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar todos los envíos?')) {
      localStorage.setItem('formSubmissions', '[]');
      setSubmissions([]);
    }
  };

  return (
    <div className="page">
      <Navbar />
      <main>
        <section className="card cardR">
          <h2>📋 Panel de Envíos</h2>
          <p>Total de registros: <strong>{submissions.length}</strong></p>

          {submissions.length === 0 ? (
            <p>No hay envíos registrados aún.</p>
          ) : (
            <>
              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #333' }}>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Nombre</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Email</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Teléfono</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Pasaporte</th>
                      <th style={{ padding: '0.5rem', textAlign: 'left' }}>Fecha de Envío</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{ padding: '0.5rem' }}>{sub.firstName} {sub.lastName}</td>
                        <td style={{ padding: '0.5rem' }}>{sub.email}</td>
                        <td style={{ padding: '0.5rem' }}>{sub.phone}</td>
                        <td style={{ padding: '0.5rem' }}>{sub.passport}</td>
                        <td style={{ padding: '0.5rem' }}>{new Date(sub.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleDownload} className="primaryBtn">
                  💾 Descargar JSON
                </button>
                <button onClick={handleClear} className="primaryBtn" style={{ backgroundColor: '#d9534f' }}>
                  🗑️ Limpiar Todo
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function ContactPage() {
  const [copyStatus, setCopyStatus] = useState('');
  const [activeButton, setActiveButton] = useState(null);

  const handleCopy = async (text, buttonId) => {
    try {
      await navigator.clipboard.writeText(text);
      setActiveButton(buttonId);
      setCopyStatus(`Copiado: ${text}`);
      setTimeout(() => {
        setActiveButton(null);
        setCopyStatus('');
      }, 2000);
    } catch (error) {
      console.error('Error copying text:', error);
      setCopyStatus('No se pudo copiar. Intenta nuevamente.');
      setTimeout(() => setCopyStatus(''), 3000);
    }
  };

  return (
    <div className="page">
      <Navbar />

      <main>
        <section className="card cardR contact-card">
          <h2>Contactanos</h2>

          <p>
            <strong>¿Necesitas ayuda?</strong> Estamos aquí para ti.
          </p>

          <p>
            Puedes contactarnos de <strong>9:00 AM a 7:00 PM todos los días </strong>
            a través de los siguientes medios:
          </p>

          <div className="contact-list">
            <div className="contact-item">
              <div>
                <h3>📧 Correo Electrónico</h3>
                <p>
                  <a href="mailto:gestoriaturnosytramites@gmail.com">gestoriaturnosytramites@gmail.com</a>
                </p>
              </div>
              <button className={`copyBtn ${activeButton === 'email' ? 'active' : ''}`} onClick={() => handleCopy('gestoriaturnosytramites@gmail.com', 'email')} aria-label="Copiar correo electrónico">
                <span>Copiar</span>
                <span>✓</span>
              </button>
            </div>

            <div className="contact-item">
              <div>
                <h3>📱 Teléfono</h3>
                <p>
                  <a href="tel:+48 572 858 565">+48 572 858 565</a>
                </p>
              </div>
              <button className={`copyBtn ${activeButton === 'phone' ? 'active' : ''}`} onClick={() => handleCopy('+48 572 858 565', 'phone')} aria-label="Copiar teléfono">
                <span>Copiar</span>
                <span>✓</span>
              </button>
            </div>

            <div className="contact-item">
              <div>
                <h3>📲 Instagram</h3>
                <p>
                  <a href="https://www.instagram.com/camino_alemania2026/?hl=es" target="_blank" rel="noopener noreferrer">
                    @camino_alemania2026
                  </a>
                </p>
              </div>
              <button className={`copyBtn ${activeButton === 'instagram' ? 'active' : ''}`} onClick={() => handleCopy('https://www.instagram.com/camino_alemania2026/?hl=es', 'instagram')} aria-label="Copiar Instagram">
                <span>Copiar</span>
                <span>✓</span>
              </button>
            </div>
          </div>

          {copyStatus && <p className="copyStatus">{copyStatus}</p>}

          <p style={{ marginTop: '2rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
            Nos comprometemos a responder tus consultas en el menor tiempo posible.
          </p>
        </section>
      </main>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/requirements" element={<RequirementsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
