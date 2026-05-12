import React, { useState } from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const MultiStepLoader = ({ steps, loading, onComplete, onClose }) => {
  const [stepStatus, setStepStatus] = useState([]);

  React.useEffect(() => {
    if (!loading) {
      setStepStatus([]);
      return;
    }

    let timeouts = [];

    const runStep = (index) => {
      if (index >= steps.length) {
        if (onComplete) onComplete();
        return;
      }

      setStepStatus(prev => {
        const newStatus = [...prev];
        newStatus[index] = 'loading';
        return newStatus;
      });

      const step = steps[index];
      const duration = step.duration || 2000;

      const timeout = setTimeout(() => {
        setStepStatus(prev => {
          const newStatus = [...prev];
          newStatus[index] = 'done';
          return newStatus;
        });
        if (step.action) step.action();
        runStep(index + 1);
      }, duration);

      timeouts.push(timeout);
    };

    runStep(0);

    return () => timeouts.forEach(clearTimeout);
  }, [loading, steps, onComplete]);

  if (!loading) return null;

  return (
    <div className="loader-overlay-blur" onClick={(e) => e.target === e.currentTarget && onClose && onClose()}>
      <div className="loader-list-container">
        <div className="steps-list">
          {steps.map((step, idx) => (
            <div key={idx} className="step-item">
              <div className="step-indicator">
                {stepStatus[idx] === 'done' ? (
                  <span className="step-icon done">✓</span>
                ) : stepStatus[idx] === 'loading' ? (
                  <div className="spinner"></div>
                ) : (
                  <span className="step-icon pending">○</span>
                )}
              </div>
              <div className="step-text">
                {stepStatus[idx] === 'done' && step.afterText ? step.afterText : step.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .loader-overlay-blur {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .loader-list-container {
          max-width: 400px;
          width: 90%;
          padding: 2rem;
        }
        .steps-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 1.1rem;
          font-weight: 500;
          color: #ffffff;
        }
        .step-indicator {
          width: 28px;
          display: flex;
          justify-content: center;
        }
        .step-icon { font-size: 1.3rem; display: inline-block; }
        .step-icon.pending { color: rgba(255,255,255,0.5); }
        .step-icon.done { color: #10b981; font-weight: bold; }
        .spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #ffc30d;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .step-text { flex: 1; letter-spacing: -0.2px; }
        @media (max-width: 500px) {
          .step-item { font-size: 0.95rem; gap: 10px; }
          .step-indicator { width: 24px; }
        }
      `}</style>
    </div>
  );
};

const SOCIAL_LINKS = [
  { label: 'WhatsApp', icon: <FaWhatsapp size={18} />, href: 'https://wa.me/258840000000', color: '#25D366' },
  { label: 'Instagram', icon: <FaInstagram size={18} />, href: 'https://instagram.com/northdigits', color: '#E1306C' },
  { label: 'Facebook', icon: <FaFacebook size={18} />, href: 'https://facebook.com/northdigits', color: '#1877F2' },
  { label: 'LinkedIn', icon: <FaLinkedin size={18} />, href: 'https://linkedin.com/company/northdigits', color: '#0A66C2' },
];

const Contacto = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    nome: '', email: '', telefone: '', servico: '', mensagem: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loaderSteps = [
    { text: "Verificando dados", duration: 1500, afterText: "Dados verificados" },
    { text: "Enviando mensagem", duration: 2000, afterText: "Mensagem enviada" },
    { text: "Processando solicitação", duration: 1800, afterText: "Solicitação processada" },
    { text: "Confirmando cotação", duration: 1200, afterText: "Cotação confirmada" },
    { text: "Finalizando", duration: 1000, afterText: "Finalizado", action: () => handleLoaderComplete() },
  ];

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setSubmitted(true);
    setFormData({ nome: '', email: '', telefone: '', servico: '', mensagem: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.email) return;
    setIsLoading(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const focusStyle = (field) => (focusedField === field ? { borderColor: '#3d56c2', background: isDark ? '#334155' : '#fff' } : {});

  const baseInputStyle = {
    border: `1px solid ${isDark ? '#475569' : '#e0e4ef'}`,
    borderRadius: '8px',
    padding: '11px 14px',
    fontSize: '14px',
    color: isDark ? '#f1f5f9' : '#0d1b4b',
    background: isDark ? '#334155' : '#f8f9fc',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.15s, background 0.15s',
  };

  return (
    <>
      <style>{`
        #contacto-section {
          background-color: #f4f7fb;
          padding: 80px 24px;
          font-family: 'Segoe UI', sans-serif;
          width: 100%;
          box-sizing: border-box;
        }
        .contact-wrapper {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }
        .info-panel {
          background-color: #0d1b4b;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
          overflow: hidden;
        }
        .info-panel-bg {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='700'%3E%3Cpath d='M-50 100 Q 100 0 200 150 Q 300 300 150 400 Q 0 500 100 650' stroke='%231a2d6e' stroke-width='70' fill='none'/%3E%3Cpath d='M100 -50 Q 250 100 150 250 Q 50 400 250 550' stroke='%23162660' stroke-width='55' fill='none'/%3E%3Cpath d='M300 50 Q 420 200 310 380 Q 190 530 360 680' stroke='%230f1f55' stroke-width='60' fill='none'/%3E%3C/svg%3E");
          background-size: cover;
          opacity: 0.9;
          pointer-events: none;
        }
        .info-block { position: relative; z-index: 1; }
        .info-title { color: #ffffff; font-size: 16px; font-weight: 600; margin-bottom: 8px; }
        .info-text { color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.8; }
        .form-panel {
          background-color: #ffffff;
          padding: 2.5rem;
        }
        .eyebrow { color: #3d56c2; font-size: 13px; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 6px; }
        .heading { font-size: clamp(1.3rem, 3vw, 1.8rem); font-weight: 700; color: #0d1b4b; margin-bottom: 1.8rem; line-height: 1.25; }
        .heading-accent { color: #3d56c2; }
        .field-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        .field-group { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 12px; font-weight: 600; color: #555; }
        .submit-btn {
          background-color: #3d56c2;
          color: #fff; border: none;
          padding: 13px 36px;
          border-radius: 50px;
          font-size: 15px; font-weight: 600;
          cursor: pointer; margin-top: 8px;
          font-family: inherit;
          transition: background 0.15s, transform 0.1s;
          width: 100%;
        }
        .submit-btn:hover { background: #2a3f8f; }
        .success-banner {
          margin-top: 12px;
          background: #e8f5e9;
          border: 1px solid #a5d6a7;
          border-radius: 8px;
          padding: 12px 16px;
          color: #2e7d32;
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
          .info-panel {
            padding: 2rem 1.5rem;
            gap: 1.2rem;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .info-block {
            flex: 1 1 45%;
            min-width: 140px;
          }
          .social-row {
            margin-top: 0;
            flex: 1 1 100%;
          }
          .form-panel {
            padding: 2rem 1.5rem;
          }
        }
        @media (max-width: 500px) {
          #contacto-section {
            padding: 50px 16px;
          }
          .contact-wrapper {
            border-radius: 12px;
          }
          .field-grid {
            grid-template-columns: 1fr;
          }
          .info-panel {
            flex-direction: column;
            gap: 1rem;
            padding: 1.5rem;
          }
          .info-block {
            flex: unset;
          }
        }
        /* ── DARK MODE CONTACTO ── */
        html.dark-mode #contacto-section {
          background-color: #0f172a;
        }
        html.dark-mode .contact-wrapper {
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        html.dark-mode .info-panel {
          background-color: #020a3a;
        }
        html.dark-mode .form-panel {
          background-color: #1e293b;
        }
        html.dark-mode .eyebrow {
          color: #60a5fa;
        }
        html.dark-mode .heading {
          color: #f1f5f9;
        }
        html.dark-mode .field-label {
          color: #94a3b8;
        }
        html.dark-mode .submit-btn {
          background-color: #2563eb;
        }
        html.dark-mode .submit-btn:hover {
          background-color: #1d4ed8;
        }
        html.dark-mode .success-banner {
          background: #064e3b;
          border-color: #065f46;
          color: #6ee7b7;
        }
        .social-row {
          display: flex; gap: 10px;
          position: relative; z-index: 1;
          margin-top: auto; flex-wrap: wrap;
          align-items: center;
        }
        .social-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 16px;
          transition: background 0.2s, transform 0.15s, border-color 0.2s;
          text-decoration: none;
        }
        .social-btn:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.22);
          border-color: rgba(255,255,255,0.4);
        }
      `}</style>

      <section id="contacto-section">
        <MultiStepLoader
          steps={loaderSteps}
          loading={isLoading}
          onComplete={handleLoaderComplete}
          onClose={() => setIsLoading(false)}
        />
        <div className="contact-wrapper">
          {/* Painel esquerdo */}
          <div className="info-panel">
            <div className="info-panel-bg" />
            <div className="info-block">
              <p className="info-title">Sede</p>
              <p className="info-text">Maputo, Moçambique<br />Built for Growth</p>
            </div>
            <div className="info-block">
              <p className="info-title">Contacto</p>
              <p className="info-text">Email: info@northdigits.co.mz<br />Web: www.northdigits.co.mz</p>
            </div>
            <div className="info-block">
              <p className="info-title">Foco</p>
              <p className="info-text">Tecnologia Integrada & Soluções Digitais<br />Mercados: Moçambique & África Austral</p>
            </div>
            <div className="info-block">
              <p className="info-title">Redes Sociais</p>
              <div className="social-row" style={{ marginTop: '10px' }}>
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="social-btn">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="form-panel">
            <p className="eyebrow">// &nbsp; Fale Connosco</p>
            <h2 className="heading">Obtenha o Seu <span className="heading-accent">Orçamento Grátis</span> Hoje!</h2>
            <form onSubmit={handleSubmit}>
              <div className="field-grid">
                <div className="field-group">
                  <label className="field-label">Seu Nome</label>
                  <input
                    type="text" name="nome" value={formData.nome} onChange={handleChange}
                    onFocus={() => setFocusedField('nome')} onBlur={() => setFocusedField(null)}
                    placeholder="Ex: Janucha Erica"
                    style={{ ...baseInputStyle, ...focusStyle('nome') }} required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">E-mail</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    placeholder="exemplo@email.com"
                    style={{ ...baseInputStyle, ...focusStyle('email') }} required
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Telefone</label>
                  <input
                    type="tel" name="telefone" value={formData.telefone} onChange={handleChange}
                    onFocus={() => setFocusedField('telefone')} onBlur={() => setFocusedField(null)}
                    placeholder="Digite o número de telefone"
                    style={{ ...baseInputStyle, ...focusStyle('telefone') }}
                  />
                </div>
                <div className="field-group">
                  <label className="field-label">Serviço</label>
                  <select
                    name="servico" value={formData.servico} onChange={handleChange}
                    onFocus={() => setFocusedField('servico')} onBlur={() => setFocusedField(null)}
                    style={{ ...baseInputStyle, ...focusStyle('servico') }}
                  >
                    <option value="">Selecione o serviço</option>
                    <option value="custom_software">Desenvolvimento de Software Personalizado</option>
                    <option value="digital_transformation">Consultoria em Transformação Digital</option>
                    <option value="data_analytics">Análise de Dados & Business Intelligence</option>
                    <option value="digital_literacy">Alfabetização Digital & Treinamento</option>
                    <option value="agritech">Soluções Agri-Tech & MPME</option>
                    <option value="industrial_import">Importação Industrial & Máquinas</option>
                  </select>
                </div>
              </div>
              <div className="field-group" style={{ marginBottom: '20px' }}>
                <label className="field-label">Sua Mensagem</label>
                <textarea
                  name="mensagem" value={formData.mensagem} onChange={handleChange}
                  onFocus={() => setFocusedField('mensagem')} onBlur={() => setFocusedField(null)}
                  placeholder="Digite aqui.."
                  style={{
                    ...baseInputStyle,
                    resize: 'vertical',
                    minHeight: '120px',
                    ...(focusedField === 'mensagem' ? { borderColor: '#3d56c2', background: '#fff' } : {})
                  }}
                />
              </div>
              <button
                type="submit"
                className="submit-btn"
              >
                Enviar Mensagem
              </button>
            </form>
            {submitted && !isLoading && (
              <div className="success-banner">✓ Mensagem enviada com sucesso! Responderemos em breve.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacto;