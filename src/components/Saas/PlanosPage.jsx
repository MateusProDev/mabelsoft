import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Planos.css";

const PlanosPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlans, setShowPlans] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
  });

  const planos = [
    {
      nome: "Free",
      preco: "Gratuito",
      descricao: [
        "Até 50 produtos",
        "Sem opção de domínio personalizado",
        "Sem sistema de estoque",
        "Suporte via FAQ",
      ],
    },
    {
      nome: "Plus",
      preco: "R$ 34,99/mês",
      descricao: [
        "Loja online completa",
        "Sistema de estoque incluso",
        "Domínio personalizado",
        "Suporte horário comercial",
        "Até 700 produtos",
      ],
    },
    {
      nome: "Premium",
      preco: "R$ 64,99/mês",
      descricao: [
        "Tudo do plano Plus",
        "Suporte 24h",
        "Até 2.000 produtos",
        "Relatórios avançados",
      ],
    },
  ];

  const handleSelectPlan = (plano) => {
    setSelectedPlan(plano);
    setShowPlans(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mensagem = `Olá! Quero contratar o plano ${selectedPlan.nome}.\n\nMeus dados:\nNome: ${formData.nome}\nEmail: ${formData.email}\nTelefone: ${formData.telefone}\nEmpresa: ${formData.empresa}`;
    const whatsappURL = `https://wa.me/seu-numero-aqui?text=${encodeURIComponent(
      mensagem
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="planos-container">
      <h2>Escolha o Melhor Plano para Você</h2>
      {showPlans && (
        <div className="planos-lista">
          {planos.map((plano, index) => (
            <div key={index} className="plano-card">
              <h3>{plano.nome}</h3>
              <p className="preco">{plano.preco}</p>
              <ul>
                {plano.descricao.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button onClick={() => handleSelectPlan(plano)}>Selecionar</button>
            </div>
          ))}
        </div>
      )}

      {selectedPlan && (
        <div className="formulario-container">
          <h3>Preencha seus dados para contratar o plano {selectedPlan.nome}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="telefone"
              placeholder="Telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="empresa"
              placeholder="Nome da Empresa"
              value={formData.empresa}
              onChange={handleInputChange}
            />
            <button type="submit">Entrar em Contato pelo WhatsApp</button>
          </form>
        </div>
      )}

      <footer className="planos-footer">
        <p>Todos os direitos reservados © 2025 MabelSoft</p>
      </footer>
    </div>
  );
};

export default PlanosPage;