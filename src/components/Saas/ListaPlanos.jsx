import React from "react";
import PlanoCard from "./PlanoCard";
import "./Planos.css";

const ListaPlanos = ({ selecionarPlano }) => {
  const planos = [
    {
      nome: "Free",
      preco: "Gratuito",
      descricao: [
        "Site + Lojinha",
        "Até 50 produtos",
        "Sem opção de domínio personalizado",
        "Sem sistema de estoque",
        "Sistema de notas fiscais",
        "Suporte via FAQ",
        "Segurança SSL"
      ],
    },
    {
      nome: "Plus",
      preco: "R$ 34,99/mês",
      descricao: [
        "Site + Loja online completa",
        "Sistema de estoque incluso",
        "Sistema de notas fiscais",
        "Domínio personalizado",
        "Suporte horário comercial",
        "Até 700 produtos",
        "Segurança SSL",
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