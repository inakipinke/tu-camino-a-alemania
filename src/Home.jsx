import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.png';

const services = [
  {
    title: 'Turno Regular',
    price: 'EUR 79',
    description:
      'Te conseguimos un turno en cualquier embajada alemana (excepto la de Buenos Aires) en un plazo estimado de 2 semanas.',
    cta: 'Solicitar turno regular',
    turno: 'otras_embajadas'
  },
  {
    title: 'Turno Regular Bs.As',
    price: 'EUR 99',
    description:
      'Te conseguimos un turno en la embajada de Buenos Aires en un plazo estimado de 2 semanas.',
    cta: 'Solicitar turno Bs.As',
    turno: 'buenos_aires_regular',
    featured: true
  },
  {
    title: 'Turno Express',
    price: 'EUR 149',
    description:
      'Conseguimos el turno en un plazo estimado de 1 a 3 dias en cualquier embajada, incluida la de Buenos Aires.',
    cta: 'Solicitar turno express',
    turno: 'buenos_aires_express',
    hot: true
  }
];

const steps = [
  {
    title: 'Te registras',
    text: 'Nos dejas tus datos y el tipo de turno que necesitas para tu Working Holiday.'
  },
  {
    title: 'Abonas el 20% del servicio',
      text: 'Pagas un adelanto para que empecemos a buscar tu turno. Si no conseguimos el turno, te devolvemos el dinero.'
  },
  {
    title: 'Confirmamos tu turno',
    text: 'Te avisamos cuando el turno queda asegurado, y te damos la oportunidad de confirmar que este todo en regla antes de abonar el resto del servicio.'
  },
  {
    title: 'Preparas tus documentos',
    text: 'Llegas al dia del turno con tus documentos en orden y con nuestro apoyo para cualquier duda de ultimo momento.'
  }
];

const reviews = [
  {
    name: 'Martina R.',
    text: 'Los chicos consiguieron mi turno en 5 dias y me prepararon todos los papeles, los super recomiendo'
  },
  {
    name: 'Joaquin S.',
    text: 'Venia buscando turno hace meses todos los dias, y ellos arreglaron todo. Gracias!!'
  },
  {
    name: 'Lucia P.',
    text: 'El precio es super razonable para el tiempo que me ahorre, y el proceso fue super claro. Muy recomendable! <3'
  }
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    ref,
    className: visible ? 'homeReveal homeReveal--visible' : 'homeReveal'
  };
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = isScrolled || isMenuOpen;

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

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (event, targetPath) => {
    if (pathname === targetPath) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    closeMenu();
  };

  return (
    <nav className={`navbar ${isActive ? 'navbar--scrolled' : ''}`}>
      <div className="navContainer">
        <Link to="/" className="navLogo" onClick={(event) => handleNavClick(event, '/')}>
          <img src={logo} alt="tu camino" />
        </Link>
        <div className="navLinks desktop-nav">
          <Link to="/" className="navLink" onClick={(event) => handleNavClick(event, '/')}>Inicio</Link>
          <Link to="/about" className="navLink" onClick={(event) => handleNavClick(event, '/about')}>Servicios</Link>
          <Link to="/requirements" className="navLink" onClick={(event) => handleNavClick(event, '/requirements')}>Requisitos</Link>
          <Link to="/contact" className="navLink" onClick={(event) => handleNavClick(event, '/contact')}>Contáctanos</Link>
          <Link to="/form" className="navLink navLinkPrimary" onClick={(event) => handleNavClick(event, '/form')}>Regístrate</Link>
        </div>
        <button
          className={`mobile-menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`navLinks mobile-nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="navLink" onClick={(event) => handleNavClick(event, '/')}>Inicio</Link>
          <Link to="/about" className="navLink" onClick={(event) => handleNavClick(event, '/about')}>Servicios</Link>
          <Link to="/requirements" className="navLink" onClick={(event) => handleNavClick(event, '/requirements')}>Requisitos</Link>
          <Link to="/contact" className="navLink" onClick={(event) => handleNavClick(event, '/contact')}>Contáctanos</Link>
          <Link to="/form" className="navLink navLinkPrimary" onClick={(event) => handleNavClick(event, '/form')}>Regístrate</Link>
        </div>
      </div>
    </nav>
  );
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="homeSectionHeader">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="homeHero" data-home-section>
      <div className="card homeHeroCard">
        <div className="homeHeroCopy">
          <h1>Consegui tu turno consular sin vivir refrescando la pagina.</h1>
          <p>
            Los turnos para la visa Working Holiday son limitados, la web de la embajada puede
            caerse y las fechas disponibles desaparecen rapido. Nosotros te ayudamos a buscar y
            asegurar el turno con un proceso claro, simple, y rapido.
          </p>
          <div className="homeHeroActions">
            <Link to="/form" className="primaryBtn homeBtn">
              Registrarme
            </Link>
            <Link to="/about" className="homeSecondaryBtn">
              Ver servicios
            </Link>
          </div>
          <small>Cupos limitados por alta demanda.</small>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const reveal = useReveal();

  return (
    <section className="homeSection homeSectionSoft" id="como-funciona" data-home-section>
      <div ref={reveal.ref} className={reveal.className}>
        <SectionHeader
          eyebrow="Proceso simple"
          title="Como funciona"
        >
          Mantenemos el proceso ordenado para que no tengas que pasar horas intentando conseguir
          una cita manualmente.
        </SectionHeader>

        <div className="homeSteps">
          {steps.map((step, index) => (
            <article key={step.title} className="homeStepCard">
              <div className="homeStepNumber">{index + 1}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const reveal = useReveal();

  return (
    <section className="homeSection" id="servicios" data-home-section>
      <div ref={reveal.ref} className={reveal.className}>
        <SectionHeader
          eyebrow="Servicios"
          title="Elegis el tipo de ayuda que necesitas"
        >
          Todos los servicios mantienen el mismo objetivo: ahorrarte tiempo, reducir la
          incertidumbre y ayudarte a avanzar con tu visa.
        </SectionHeader>

        <div className="homeServices">
          {services.map((service) => (
            <article
              key={service.title}
              className={`homeServiceCard ${service.featured ? 'homeServiceCard--featured' : ''} ${service.hot ? 'homeServiceCard--hot' : ''}`}
            >
              <div className="homeServiceHeader">
                <h3>{service.title}</h3>
                <div className="homeBadgeGroup">
                  {service.featured && <span className="homeBadge">Mas popular</span>}
                  {service.hot && <span className="homeBadge homeBadge--hot">MAS RAPIDO 🔥</span>}
                </div>
              </div>
              <p>{service.description}</p>
              <strong>{service.price}</strong>
              <Link to={`/form?turno=${service.turno}`} className="primaryBtn homeCardBtn">
                {service.cta}
              </Link>
            </article>
          ))}
        </div>

        <Link to="/about" className="homeServicesInfoBtn">Servicios</Link>
      </div>
    </section>
  );
}

function Reviews() {
  const reveal = useReveal();

  return (
    <section className="homeSection homeSectionSoft" id="opiniones" data-home-section>
      <div ref={reveal.ref} className={reveal.className}>
        <SectionHeader
          eyebrow="Opiniones"
          title="Personas que tambien estaban cansadas de seguir buscando"
        />

        <div className="homeReviews">
          {reviews.map((review) => (
            <article key={review.name} className="homeReviewCard">
              <div className="homeReviewHeader">
                <div className="homeAvatar">{review.name.charAt(0)}</div>
                <h3>{review.name}</h3>
              </div>
              <p>"{review.text}"</p>
            </article>
          ))}
        </div>

        <div className="homeReviewsAction">
          <Link to="/form" className="primaryBtn homeBtn">
            Empezar ahora
          </Link>
        </div>
      </div>
    </section>
  );
}

function FloatingNextArrow() {
  const handleClick = () => {
    const sections = Array.from(document.querySelectorAll('[data-home-section]'));
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const visibleHeight = window.innerHeight - navbarHeight;
    const visibleCenter = window.scrollY + navbarHeight + visibleHeight / 2;
    const nextSection = sections.find((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      return sectionTop > visibleCenter + 8;
    });

    const target = nextSection || sections[0];

    if (!target) {
      return;
    }

    const sectionTop = target.getBoundingClientRect().top + window.scrollY;
    const serviciosOffset = target.id === 'servicios' ? -40 : 0;
    const centeredTop = sectionTop - Math.max((visibleHeight - target.offsetHeight) / 2, 0) - navbarHeight - serviciosOffset;

    window.scrollTo({
      top: Math.max(centeredTop, 0),
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      className="homeFloatingArrow"
      onClick={handleClick}
      aria-label="Ir a la siguiente seccion"
    >
      <span />
    </button>
  );
}

export default function Home() {
  return (
    <div className="page homePage">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }

          .homePage {
            --home-scale: 1;
            color: var(--text);
            max-width: 100%;
            overflow-x: clip;
          }

          .homeMain {
            display: block;
            width: 100%;
            padding: 0 calc(1.5rem * var(--home-scale)) calc(4rem * var(--home-scale));
          }

          .homeHero {
            min-height: calc(100vh - 70px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: calc(3.5rem * var(--home-scale)) 0 calc(4rem * var(--home-scale));
          }

          .homeHeroCard {
            max-width: calc(900px * var(--home-scale));
            width: 100%;
            padding: calc(3rem * var(--home-scale));
          }

          .homeHeroCopy h1 {
            margin: 0;
            color: var(--g-black);
            font-size: calc(4.25rem * var(--home-scale));
            line-height: 1.05;
            font-weight: 900;
          }

          .homeHeroCopy p {
            max-width: calc(680px * var(--home-scale));
            margin: calc(1.3rem * var(--home-scale)) 0 0;
            color: var(--text-light);
            font-size: calc(1.18rem * var(--home-scale));
            line-height: 1.75;
          }

          .homeHeroActions {
            display: flex;
            align-items: center;
            gap: calc(1rem * var(--home-scale));
            margin-top: calc(2rem * var(--home-scale));
            flex-wrap: wrap;
          }

          .homeBtn {
            margin: 0;
            width: fit-content;
            min-width: calc(180px * var(--home-scale));
            text-align: center;
          }

          .homeSecondaryBtn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: calc(160px * var(--home-scale));
            border: 2px solid rgba(0, 0, 0, 0.12);
            border-radius: 10px;
            padding: calc(0.95rem * var(--home-scale)) calc(1.45rem * var(--home-scale));
            color: var(--g-black);
            background: rgba(255, 255, 255, 0.55);
            font-family: inherit;
            font-size: inherit;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .homeSecondaryBtn:hover {
            border-color: var(--g-gold);
            background: rgba(255, 204, 0, 0.16);
            transform: translateY(-2px);
          }

          .homeHeroCopy small {
            display: block;
            margin-top: calc(0.9rem * var(--home-scale));
            color: #444;
            font-weight: 700;
          }

          .homeFloatingArrow {
            position: fixed;
            right: calc(1.25rem * var(--home-scale));
            bottom: calc(1.25rem * var(--home-scale));
            z-index: 90;
            width: calc(58px * var(--home-scale));
            height: calc(58px * var(--home-scale));
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 50%;
            background: #fff;
            cursor: pointer;
            transition: all 0.25s ease;
          }

          .homeFloatingArrow:hover {
            background: #fff;
            transform: translateY(2px);
          }

          .homeFloatingArrow span {
            width: calc(14px * var(--home-scale));
            height: calc(14px * var(--home-scale));
            border-right: 3px solid var(--g-red);
            border-bottom: 3px solid var(--g-red);
            transform: rotate(45deg) translate(-2px, -2px);
          }

          .homeSection {
            max-width: calc(1120px * var(--home-scale));
            margin: 0 auto;
            padding: calc(4.5rem * var(--home-scale)) 0;
          }

          .homeSectionSoft {
            position: relative;
          }

          .homeSectionSoft::before {
            content: "";
            position: absolute;
            inset: calc(2rem * var(--home-scale)) calc(-1.5rem * var(--home-scale));
            z-index: -1;
            border-radius: 22px;
            background: rgba(61, 61, 61, 0.41);
            backdrop-filter: blur(2px);
          }

          .homeSectionHeader {
            max-width: calc(760px * var(--home-scale));
            margin: 0 auto calc(2rem * var(--home-scale));
            text-align: center;
          }

          .homeSectionHeader span {
            color: var(--g-gold);
            font-size: calc(1.4rem * var(--home-scale));
            font-weight: 900;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          }

          .homeSectionHeader h2 {
            margin: calc(0.6rem * var(--home-scale)) 0 0;
            color: white;
            font-size: calc(2.8rem * var(--home-scale));
            line-height: 1.12;
            font-weight: 900;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
          }

          .homeSectionHeader p {
            margin: calc(1rem * var(--home-scale)) auto 0;
            color: rgba(255, 255, 255);
            font-size: calc(1.15rem * var(--home-scale));
            line-height: 1.5;
            text-shadow: 0 2px 8px rgba(0, 0, 0, 0.95);
          }

          .homeSteps,
          .homeServices,
          .homeReviews {
            display: grid;
            gap: calc(1.25rem * var(--home-scale));
          }

          .homeSteps {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .homeServices,
          .homeReviews {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .homeStepCard,
          .homeServiceCard,
          .homeReviewCard {
            border-radius: 16px;
            padding: calc(1.5rem * var(--home-scale));
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: blur(4px);
            border: 2px solid rgba(255, 255, 255, 0.26);
            box-shadow: -8px 10px 30px rgba(0, 0, 0, 0.28);
          }

          .homeStepNumber {
            width: calc(42px * var(--home-scale));
            height: calc(42px * var(--home-scale));
            display: grid;
            place-items: center;
            margin-bottom: calc(1rem * var(--home-scale));
            border-radius: 50%;
            background: var(--g-black);
            color: var(--g-gold);
            font-weight: 900;
          }

          .homeStepCard h3,
          .homeServiceCard h3,
          .homeReviewCard h3 {
            margin: 0;
            color: var(--g-black);
            font-size: calc(1.2rem * var(--home-scale));
          }

          .homeStepCard p,
          .homeServiceCard p,
          .homeReviewCard p {
            margin: calc(0.75rem * var(--home-scale)) 0 0;
            color: var(--text-light);
            line-height: 1.65;
          }

          .homeServiceCard {
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 100%;
            transition: transform 0.25s ease, box-shadow 0.25s ease;
          }

          .homeServiceCard:hover {
            transform: translateY(-4px);
            box-shadow: -10px 14px 36px rgba(0, 0, 0, 0.34);
          }

          .homeServiceCard--featured {
            border-color: rgba(255, 204, 0, 0.58);
            background: rgba(255, 255, 255, 0.8);
          }

          .homeServiceCard--hot {
            border-color: rgba(221, 0, 0, 0.58);
            background: rgba(255, 255, 255, 0.8);
          }

          .homeServiceHeader {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: calc(0.85rem * var(--home-scale));
          }

          .homeServiceHeader h3 {
            min-width: 0;
          }

          .homeBadgeGroup {
            display: flex;
            flex-shrink: 0;
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: calc(0.45rem * var(--home-scale));
            max-width: 48%;
          }

          .homeBadge {
            width: fit-content;
            border-radius: 999px;
            padding: calc(0.45rem * var(--home-scale)) calc(0.8rem * var(--home-scale));
            background: var(--g-gold);
            color: var(--g-black);
            font-size: calc(0.75rem * var(--home-scale));
            font-weight: 900;
            text-transform: uppercase;
          }

          .homeBadge--hot {
            background: var(--g-red);
            color: white;
          }

          .homeServicesInfoBtn {
            display: flex;
            width: fit-content;
            margin: calc(4rem * var(--home-scale)) auto 0;
            border-radius: 999px;
            padding: calc(1rem * var(--home-scale)) calc(1.5rem * var(--home-scale));
            background: white;
            color: var(--g-red);
            font-size: calc(1.3rem * var(--home-scale));
            font-weight: 600;
            line-height: 1;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .homeServicesInfoBtn:hover {
            transform: translateY(-2px);
          }

          .homeServiceCard strong {
            display: block;
            margin: auto 0 calc(1.2rem * var(--home-scale));
            color: var(--g-red);
            font-size: calc(1.65rem * var(--home-scale));
            font-weight: 900;
          }

          .homeCardBtn {
            width: 100%;
            margin: 0;
            text-align: center;
          }

          .homeReviewHeader {
            display: flex;
            align-items: center;
            gap: calc(0.85rem * var(--home-scale));
          }

          .homeAvatar {
            width: calc(44px * var(--home-scale));
            height: calc(44px * var(--home-scale));
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--g-red), #cc0000);
            color: white;
            font-weight: 900;
          }

          .homeReviewsAction {
            display: flex;
            justify-content: center;
            margin-top: calc(2.5rem * var(--home-scale));
          }

          .homeReveal {
            opacity: 0;
            transform: translateY(18px);
            transition: opacity 0.55s ease, transform 0.55s ease;
            
          }

          .homeReveal--visible {
            opacity: 1;
            transform: translateY(0);
          }

          @media (min-width: 901px) and (max-width: 1500px) {
            .homePage {
              --home-scale: 0.9;
            }
          }

          @media (min-width: 1800px) {
            .homePage {
              --home-scale: 1.08;
            }
          }

          @media (min-width: 2200px) {
            .homePage {
              --home-scale: 1.18;
            }
          }

          @media (max-width: 768px) {
            .homePage .navbar {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              width: 100%;
            }

            .homeMain {
              padding-top: 70px;
            }
          }

          @media (max-width: 900px) {
            .homeHeroCard,
            .homeSteps,
            .homeServices,
            .homeReviews {
              grid-template-columns: 1fr;
            }

            .homeHeroCopy h1 {
              font-size: 3.2rem;
            }

            .homeSectionHeader h2 {
              font-size: 2.35rem;
            }

            .homeHeroCard {
              padding: 2rem;
            }
          }

          @media (max-width: 600px) {
            #root::before {
              position: fixed;
            }

            .homeMain {
              padding: 70px 1rem 3rem;
            }

            .homeHero {
              min-height: auto;
              padding: 2.5rem 0 3rem;
            }

            .homeHeroCard {
              padding: 1.6rem;
            }

            .homeHeroCopy h1 {
              font-size: 2.1rem;
            }

            .homeHeroCopy p {
              font-size: 1rem;
            }

            .homeSectionHeader h2 {
              font-size: 1.85rem;
            }

            .homeHeroActions {
              align-items: stretch;
            }

            .homeBtn,
            .homeSecondaryBtn {
              width: 100%;
            }

            .homeSection {
              padding: 3rem 0;
            }

            .homeSectionSoft::before {
              inset: 2rem 0;
            }

            .homeStepCard,
            .homeServiceCard,
            .homeReviewCard {
              padding: 1.3rem;
            }
          }
        `}
      </style>
      <Navbar />
      <main className="homeMain">
        <Hero />
        <HowItWorks />
        <Services />
        <Reviews />
      </main>
      <FloatingNextArrow />
    </div>
  );
}
