import { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { FiPhone, FiMail, FiMapPin, FiSun, FiMoon } from 'react-icons/fi';
import { FaWhatsapp, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const topbarRef = useRef(null);
  const headerRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const links = [
    { nome: 'Início', href: '#home' },
    { nome: 'Sobre', href: '#sobre' },
    { nome: 'Serviços', href: '#servicos' },
    { nome: 'Contacto', href: '#contacto' },
  ];

  useLayoutEffect(() => {
    const ajustarPosicoes = () => {
      if (topbarRef.current && headerRef.current) {
        const alturaTopbar = topbarRef.current.offsetHeight;
        const alturaHeader = headerRef.current.offsetHeight;
        headerRef.current.style.top = `${alturaTopbar}px`;
        document.body.style.paddingTop = `${alturaTopbar + alturaHeader}px`;
        document.documentElement.style.scrollPaddingTop = `${alturaTopbar + alturaHeader}px`;
      }
    };
    ajustarPosicoes();
    window.addEventListener('resize', ajustarPosicoes);
    return () => window.removeEventListener('resize', ajustarPosicoes);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuAberto && !e.target.closest('.cabecalho') && !e.target.closest('.menu-overlay')) {
        setMenuAberto(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuAberto]);

  useEffect(() => {
    document.body.style.overflow = menuAberto ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuAberto]);

  return (
    <>
      {/* Topbar */}
      <div className="nd-topbar" ref={topbarRef}>
        <div className="nd-topbar-inner">
          <div className="nd-topbar-info">
            <span><FiPhone size={11} /> +258 84 123 4567</span>
            <span><FiMail size={11} /> geral@northdigits.co.mz</span>
            <span className="nd-topbar-address"><FiMapPin size={11} /> Av. Agostinho Neto, Maputo</span>
          </div>
          <div className="nd-topbar-social">
            <a href="https://wa.me/258841234567" target="_blank" rel="noopener noreferrer"><FaWhatsapp size={13} /></a>
            <a href="https://facebook.com/northdigits" target="_blank" rel="noopener noreferrer"><FaFacebook size={13} /></a>
            <a href="https://instagram.com/northdigits" target="_blank" rel="noopener noreferrer"><FaInstagram size={13} /></a>
            <a href="https://linkedin.com/company/northdigits" target="_blank" rel="noopener noreferrer"><FaLinkedin size={13} /></a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="cabecalho" ref={headerRef}>
        <div className="nd-header-inner">
          <div className="nd-logo">
            <a href="#home">
      
              <img src="/SVG/8Artboard 8.svg" alt="North Digits" style={{ width: 'auto' }} />
            </a>
          </div>

          <nav className="nd-nav-desktop">
            {links.map(link => (
              <a key={link.nome} href={link.href}>{link.nome}</a>
            ))}
          </nav>

          <div className="nd-cta-desktop">
            <a href="#Contacto" className="nd-rainbow-btn">Cotação</a>
            <button onClick={toggleTheme} className="nd-theme-btn" aria-label="Alternar tema">
              {theme === 'light' ? <FiMoon size={16} /> : <FiSun size={16} />}
            </button>
          </div>

          <button
            className={`nd-hamburger ${menuAberto ? 'nd-hamburger--open' : ''}`}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuAberto}
          >
            <span className="nd-bar nd-bar--top" />
            <span className="nd-bar nd-bar--mid" />
            <span className="nd-bar nd-bar--bot" />
          </button>
        </div>
      </header>

      <div
        className={`nd-overlay ${menuAberto ? 'nd-overlay--visible' : ''}`}
        onClick={() => setMenuAberto(false)}
        aria-hidden="true"
      />

      <nav className={`nd-drawer ${menuAberto ? 'nd-drawer--open' : ''}`} aria-label="Menu mobile">
        <div className="nd-drawer-header">
          <div className="nd-drawer-logo">
            <img src="/SVG/8Artboard 8.svg" alt="North Digits" height="40" style={{ width: 'auto' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={toggleTheme} className="nd-theme-btn-drawer" aria-label="Alternar tema">
              {theme === 'light' ? <FiMoon size={15} /> : <FiSun size={15} />}
            </button>
            <button
              className="nd-drawer-close"
              onClick={() => setMenuAberto(false)}
              aria-label="Fechar menu"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="nd-drawer-links">
          {links.map((link, i) => (
            <a
              key={link.nome}
              href={link.href}
              className="nd-drawer-link"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setMenuAberto(false)}
            >
              <span>{link.nome}</span>
              <span className="nd-drawer-arrow">›</span>
            </a>
          ))}
        </div>

        <div className="nd-drawer-cta">
          <a href="#contacto" className="nd-drawer-btn" onClick={() => setMenuAberto(false)}>
            Solicitar Cotação
          </a>
        </div>

        <div className="nd-drawer-contact">
          <p><FiPhone size={12} /> +258 84 123 4567</p>
          <p><FiMail size={12} /> geral@northdigits.co.mz</p>
          <p><FiMapPin size={12} /> Av. Agostinho Neto, 1562 Terraço Malhangalene, Maputo</p>
        </div>

        <div className="nd-drawer-socials">
          <a href="https://wa.me/258841234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
          <a href="https://facebook.com/northdigits" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook size={18} /></a>
          <a href="https://instagram.com/northdigits" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram size={18} /></a>
          <a href="https://linkedin.com/company/northdigits" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
        </div>
      </nav>

      <style>{`
        /* ── TOPBAR ── */
        .nd-topbar {
          background: #0f172a;
          color: #94a3b8;
          font-size: 0.68rem;
          padding: 0.35rem 24px;
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 1001;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .nd-topbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .nd-topbar-info {
          display: flex;
          gap: 1rem;
          flex-wrap: nowrap;
        }
        .nd-topbar-info span {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          white-space: nowrap;
        }
        .nd-topbar-social {
          display: flex;
          gap: 0.7rem;
          flex-shrink: 0;
        }
        .nd-topbar-social a {
          color: #94a3b8;
          transition: color 0.2s;
        }
        .nd-topbar-social a:hover { color: #60a5fa; }

        /* ── HEADER ── */
        .cabecalho {
          position: fixed;
          left: 0; width: 100%;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(14px);
          box-shadow: 0 2px 16px rgba(0,0,0,0.07);
          z-index: 1000;
          padding: 0;
          box-sizing: border-box;
        }
        .nd-header-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0.4rem 24px;
          gap: 1rem;
        }
      
        .nd-logo img {
          display: block;
          width: 80px;
          max-height: 90px; /* ← ALTERE AQUI para controlar o tamanho do logo */
        }

        .nd-nav-desktop {
          display: flex;
          gap: 2rem;
          justify-self: center;
        }
        .nd-nav-desktop a {
          text-decoration: none;
          color: #1f2937;
          font-weight: 500;
          font-size: 0.92rem;
          position: relative;
          white-space: nowrap;
          transition: color 0.2s;
        }
        .nd-nav-desktop a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0; height: 2px;
          background: #2563eb;
          transition: width 0.2s;
        }
        .nd-nav-desktop a:hover::after { width: 100%; }

        .nd-cta-desktop {
          justify-self: end;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nd-rainbow-btn {
          background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
          background-size: 400% 100%;
          color: white;
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.85rem;
          text-decoration: none;
          white-space: nowrap;
          border: none;
          animation: ndRainbow 8s linear infinite;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        @keyframes ndRainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 400% 50%; }
        }
        .nd-rainbow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(0,0,0,0.3);
        }
        .nd-theme-btn {
          background: rgba(0,0,0,0.08);
          border: none;
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #1f2937;
          transition: background 0.2s, transform 0.2s;
          flex-shrink: 0;
        }
        .nd-theme-btn:hover { background: rgba(0,0,0,0.15); transform: scale(1.05); }

        /* ── HAMBURGER ── */
        .nd-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #2563eb, #1e40af);
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 12px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 2px 8px rgba(37,99,235,0.35);
          position: relative;
          z-index: 1050;
        }
        .nd-hamburger:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e3a8a);
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(37,99,235,0.5);
        }
        .nd-hamburger:active { transform: scale(0.95); }
        .nd-bar {
          display: block;
          width: 20px; height: 2px;
          background: #ffffff;
          border-radius: 2px;
          transition: transform 0.3s cubic-bezier(0.23,1,0.32,1), opacity 0.2s, width 0.2s;
          transform-origin: center;
        }
        .nd-bar--mid { width: 14px; }
        .nd-hamburger--open .nd-bar--mid { width: 20px; }
        .nd-hamburger--open .nd-bar--top { transform: translateY(7px) rotate(45deg); }
        .nd-hamburger--open .nd-bar--mid { opacity: 0; transform: scaleX(0); }
        .nd-hamburger--open .nd-bar--bot { transform: translateY(-7px) rotate(-45deg); }
        html.dark-mode .nd-hamburger { background: linear-gradient(135deg, #3b82f6, #2563eb); }

        /* ── OVERLAY ── */
        .nd-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          z-index: 1100;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .nd-overlay--visible { opacity: 1; }

        /* ── DRAWER ── */
        .nd-drawer {
          position: fixed;
          top: 0; right: 0;
          width: min(320px, 85vw);
          height: 100dvh;
          background: #ffffff;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .nd-drawer--open { transform: translateX(0); }

        .nd-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.2rem;
          border-bottom: 1px solid #f1f5f9;
          flex-shrink: 0;
        }
        .nd-drawer-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nd-drawer-close {
          background: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 32px; height: 32px;
          font-size: 14px;
          cursor: pointer;
          color: #475569;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .nd-drawer-close:hover { background: #e2e8f0; }
        .nd-theme-btn-drawer {
          background: #f1f5f9;
          border: none;
          border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #475569;
          transition: background 0.2s;
          flex-shrink: 0;
        }
        .nd-theme-btn-drawer:hover { background: #e2e8f0; }

        .nd-drawer-links {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0;
          flex-shrink: 0;
        }
        .nd-drawer-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.9rem 1.4rem;
          text-decoration: none;
          color: #1f2937;
          font-size: 1rem;
          font-weight: 500;
          border-bottom: 1px solid #f8fafc;
          transition: background 0.15s, color 0.15s;
          animation: ndSlideIn 0.3s ease both;
        }
        .nd-drawer-link:hover { background: #f0f7ff; color: #2563eb; }
        .nd-drawer-arrow {
          font-size: 1.2rem;
          color: #cbd5e1;
          transition: transform 0.15s, color 0.15s;
        }
        .nd-drawer-link:hover .nd-drawer-arrow { transform: translateX(4px); color: #2563eb; }
        @keyframes ndSlideIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .nd-drawer-cta {
          padding: 1rem 1.2rem 0.5rem;
          flex-shrink: 0;
        }
        .nd-drawer-btn {
          display: block;
          width: 100%;
          text-align: center;
          background: linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
          background-size: 400% 100%;
          animation: ndRainbow 8s linear infinite;
          color: white;
          padding: 0.8rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .nd-drawer-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }

        .nd-drawer-contact {
          padding: 1rem 1.4rem 0.4rem;
          border-top: 1px solid #f1f5f9;
          flex-shrink: 0;
        }
        .nd-drawer-contact p {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 0.4rem;
        }

        .nd-drawer-socials {
          display: flex;
          gap: 0.8rem;
          padding: 0.6rem 1.4rem 1.5rem;
          flex-shrink: 0;
        }
        .nd-drawer-socials a { color: #64748b; transition: color 0.2s; }
        .nd-drawer-socials a:hover { color: #2563eb; }

        /* ── DARK MODE ── */
        html.dark-mode .cabecalho {
          background: rgba(15, 23, 42, 0.97);
          box-shadow: 0 2px 16px rgba(0,0,0,0.3);
        }
        html.dark-mode .nd-nav-desktop a { color: #e2e8f0; }
        html.dark-mode .nd-theme-btn { background: rgba(255,255,255,0.12); color: #fbbf24; }
        html.dark-mode .nd-hamburger:hover { background: linear-gradient(135deg, #2563eb, #1e40af); }
        html.dark-mode .nd-drawer { background: #0f172a; box-shadow: -8px 0 40px rgba(0,0,0,0.5); }
        html.dark-mode .nd-drawer-header { border-color: #1e293b; }
        html.dark-mode .nd-drawer-close { background: #1e293b; color: #94a3b8; }
        html.dark-mode .nd-drawer-close:hover { background: #334155; }
        html.dark-mode .nd-theme-btn-drawer { background: #1e293b; color: #fbbf24; }
        html.dark-mode .nd-drawer-link { color: #e2e8f0; border-color: #1e293b; }
        html.dark-mode .nd-drawer-link:hover { background: #1e293b; color: #60a5fa; }
        html.dark-mode .nd-drawer-contact { border-color: #1e293b; }
        html.dark-mode .nd-drawer-contact p { color: #94a3b8; }
        html.dark-mode .nd-drawer-socials a { color: #94a3b8; }
        html.dark-mode .nd-drawer-socials a:hover { color: #60a5fa; }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .nd-header-inner {
            grid-template-columns: 1fr auto;
            padding: 0.2rem 16px;
          }
          .nd-nav-desktop, .nd-cta-desktop { display: none; }
          .nd-hamburger { display: flex; }
          .nd-overlay { display: block; }
          
          .nd-topbar { padding: 0.35rem 16px; }
          .nd-topbar-inner {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.8rem;
          }
          .nd-topbar-info {
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          .nd-topbar-info span:first-of-type {
            margin-right: 8px;
          }
          .nd-topbar-info span:last-child {
            margin-left: 4px;
          }
          .nd-topbar-address { display: none; }
          .nd-topbar-social {
            gap: 0.9rem;
          }
        }
        @media (max-width: 480px) {
          .nd-topbar-info span:last-child { display: none; }
        }
      `}</style>
    </>
  );
};

export default Header;