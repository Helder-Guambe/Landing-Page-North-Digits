import React, { useState, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { useTheme } from '../context/ThemeContext';
import './Sobre.css';

const Sobre = () => {
  const revealRef = useScrollReveal();
  const { theme } = useTheme();

  const [membros, setMembros] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [satisfacao, setSatisfacao] = useState(0);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    const animate = (setter, target) => {
      let start = 0;
      const timer = setInterval(() => {
        start += Math.ceil(target / 50);
        if (start >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(start);
        }
      }, 30);
    };
    animate(setMembros, 8);
    animate(setClientes, 20);
    animate(setSatisfacao, 99);
  }, []);

  const isDark = theme === 'dark';

  return (
    <>
      <section ref={revealRef} id="sobre-section" className="reveal">
        <div className="sobre-inner">
          <div className="sobre-imagem-container">
            <img
              src="/equipe.jpg"
              alt="Equipe North Digits"
              className="sobre-imagem"
            />
          </div>

          <div className="sobre-conteudo">
            <span className="sobre-subtitulo" style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>
              // SOBRE NÓS
            </span>
            <h2 className="sobre-titulo" style={{ color: isDark ? '#f1f5f9' : '#0f172a' }}>
              Transformando{' '}
              <span style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>
                Ideias
              </span>{' '}
              em Realidade Digitais
            </h2>
            <p className="sobre-texto" style={{ color: isDark ? '#cbd5e1' : '#64748b' }}>
              A North Digits é uma empresa de soluções digitais especializada em transformação
              digital, desenvolvimento de software personalizado e soluções orientadas por dados,
              com foco em inovação e impacto. A empresa nasceu para acelerar a evolução tecnológica
              em Moçambique, entregando produtos digitais integrados que impulsionam eficiência,
              crescimento e resultados sustentáveis.
            </p>

            <div className="sobre-numeros">
              <div className="sobre-numero-item">
                <span className="sobre-numero-valor" style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>
                  {membros}+
                </span>
                <span className="sobre-numero-label">Membros do Time</span>
              </div>
              <div className="sobre-numero-item">
                <span className="sobre-numero-valor" style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>
                  {clientes}+
                </span>
                <span className="sobre-numero-label">Clientes Felizes</span>
              </div>
              <div className="sobre-numero-item">
                <span className="sobre-numero-valor" style={{ color: isDark ? '#60a5fa' : '#3b82f6' }}>
                  {satisfacao}%
                </span>
                <span className="sobre-numero-label">Satisfação</span>
              </div>
            </div>

            <div className="sobre-assinatura">
              <img
                src="/CEO-north.jpeg"
                alt="Inocêncio Nanlelo - CEO"
                className="sobre-foto"
                onClick={() => setModalAberto(true)}
              />
              <div className="sobre-assinatura-texto">
                <span className="sobre-nome" style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}>
                  Inocêncio Nanlelo
                </span>
                <span className="sobre-cargo">NORTH DIGITS • CEO</span>
              </div>
            </div>
          </div>
        </div>

        {modalAberto && (
          <div className="sobre-modal-overlay" onClick={() => setModalAberto(false)}>
            <img
              src="/CEO-north.jpeg"
              alt="Inocêncio Nanlelo - CEO ampliado"
              className="sobre-modal-imagem"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Sobre;