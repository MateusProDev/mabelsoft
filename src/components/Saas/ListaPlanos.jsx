import React from "react";
import PlanoCard from "./PlanoCard";
import "./Planos.css";

const ListaPlanos = ({ selecionarPlano }) => {
  const planos = [
    {
      nome: "Free",
      preco: "Gratuito",
      descricao: [
        "Site + Loja (até 30 produtos)",
        "Subdomínio padrão (ex: sualoja.mabelsoft.com.br)",
        "Sem sistema de estoque",
        "Sem sistema de vendas",
        "Suporte via FAQ",
        "Certificado SSL",
        "Ideal para quem quer testar antes de investir!",
      ],
    },
    {
      nome: "Plus",
      preco: "R$ 49,90/mês",
      descricao: [
        "Site + Loja (até 500 produtos)",
        "Domínio Personalizado",
        "Sistema de estoque",
        "Sistema de vendas",
        "Relatórios Simples",
        "Sistema de notas fiscais",
        "Certificado SSL",
        "Perfeito para pequenos negócios que querem crescer!",
      ],
    },
    {
      nome: "Premium",
      preco: "R$ 99,90/mês",
      descricao: [
        "Tudo do plano Plus +",
        "Produtos Ilimitados",
        "Sistema de cupons e promoções",
        "Relatórios Avançados",
        "Suporte 24h",
        "Produtos Ilimitados",
        "Prioridade em campanhas de marketing",
        "Certificado de Segurança SSL",
        "Para negócios que querem profissionalizar suas vendas!",
      ],
    },
  ];

  return (
    <div className="planos-page-grid">
      {planos.map((plano) => (
        <PlanoCard key={plano.nome} plano={plano} selecionarPlano={selecionarPlano} />
      ))}
    </div>
  );
};

export default ListaPlanos;