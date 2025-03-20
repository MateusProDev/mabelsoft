import React from "react";
import PlanoCard from "./PlanoCard";
import "./Planos.css";

const ListaPlanos = ({ selecionarPlano }) => {
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

  return (
    <div className="planos-page-grid">
      {planos.map((plano) => (
        <PlanoCard key={plano.nome} plano={plano} selecionarPlano={selecionarPlano} />
      ))}
    </div>
  );
};

export default ListaPlanos;