import { FaFacebook, FaWhatsapp, FaInstagram, FaLinkedin, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext'; // ← caminho corrigido

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const footerBg = '#000449';
  const textColor = isDark ? '#cbd5e1' : '#94a3b8';
  const titleColor = '#ffffff';
  const linkColor = isDark ? '#cbd5e1' : '#94a3b8';
  const linkHoverColor = '#ffffff';

  return (
    <footer className="rodape" style={{ backgroundColor: footerBg }}>
      <div className="rodape-conteudo" style={{ padding: '40px 24px' }}>
        {/* Coluna 1 - Sobre */}
        <div>
          <h3 className="rodape-titulo" style={{ color: titleColor }}>North Digits</h3>
          <p style={{ marginTop: '0.5rem', lineHeight: '1.4', fontSize: '0.85rem', color: textColor }}>
            Transformação digital ponta-a-ponta, desenvolvimento de software sob medida.
          </p>
        </div>

        {/* Coluna 2 - Links rápidos */}
        <div className="rodape-links">
          <h4 style={{ color: titleColor, marginBottom: '0.8rem', fontSize: '1rem', fontWeight: 600 }}>Navegação</h4>
          <a href="#home" style={{ color: linkColor, display: 'block', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
             onMouseLeave={(e) => e.currentTarget.style.color = linkColor}>Início</a>
          <a href="#sobre" style={{ color: linkColor, display: 'block', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
             onMouseLeave={(e) => e.currentTarget.style.color = linkColor}>Sobre</a>
          <a href="#servicos" style={{ color: linkColor, display: 'block', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
             onMouseLeave={(e) => e.currentTarget.style.color = linkColor}>Serviços</a>
          <a href="#contacto" style={{ color: linkColor, display: 'block', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
             onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
             onMouseLeave={(e) => e.currentTarget.style.color = linkColor}>Contacto</a>
        </div>

        {/* Coluna 3 - Contacto e Redes Sociais */}
        <div>
          <h4 style={{ color: titleColor, marginBottom: '0.8rem', fontSize: '1rem', fontWeight: 600 }}>Contacto</h4>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: textColor, fontSize: '0.85rem' }}>
            <FaMapMarkerAlt /> Maputo, Moçambique
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: textColor, fontSize: '0.85rem' }}>
            <FaEnvelope /> info@northdigits.co.mz
          </p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: textColor, fontSize: '0.85rem' }}>
            <FaPhoneAlt /> +258 84 000 0000
          </p>
          <div className="social-icons" style={{ display: 'flex', gap: '1rem', marginTop: '0.8rem' }}>
            <a href="https://wa.me/258840000000" target="_blank" rel="noopener noreferrer" style={{ color: linkColor, transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
               onMouseLeave={(e) => e.currentTarget.style.color = linkColor}><FaWhatsapp size={18} /></a>
            <a href="https://facebook.com/northdigits" target="_blank" rel="noopener noreferrer" style={{ color: linkColor, transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
               onMouseLeave={(e) => e.currentTarget.style.color = linkColor}><FaFacebook size={18} /></a>
            <a href="https://instagram.com/northdigits" target="_blank" rel="noopener noreferrer" style={{ color: linkColor, transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
               onMouseLeave={(e) => e.currentTarget.style.color = linkColor}><FaInstagram size={18} /></a>
            <a href="https://linkedin.com/company/northdigits" target="_blank" rel="noopener noreferrer" style={{ color: linkColor, transition: 'color 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.color = linkHoverColor}
               onMouseLeave={(e) => e.currentTarget.style.color = linkColor}><FaLinkedin size={18} /></a>
          </div>
        </div>

        {/* Coluna 4 - Mapa */}
        <div>
          <h4 style={{ color: titleColor, marginBottom: '0.8rem', fontSize: '1rem', fontWeight: 600 }}>Onde estamos</h4>
          <div style={{ width: '100%', height: '150px', borderRadius: '12px', overflow: 'hidden', marginTop: '0.5rem' }}>
            <iframe
              title="Mapa North Digits"
              src="https://maps.google.com/maps?q=Maputo,+Mo%C3%A7ambique&z=13&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="rodape-copyright" style={{ textAlign: 'center', padding: '0.8rem 0 1.2rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: isDark ? '#a0aec0' : '#94a3b8' }}>
        © {new Date().getFullYear()} North Digits. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;