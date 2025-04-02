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
        "Suporte via FAQ",
        "Segurança SSL"
      ],
    },
    {
      nome: "Plus",
      preco: "R$ 39,99/mês",
      descricao: [
        "Site + Loja completa",
        "Domínio Personalizado",
        "Sistema de estoque",
        "Sistema de vendas",
        "Relatórios Simples",
        "Sistema de notas fiscais",
        "Certificado de Segurança SSL",
      ],
    },
    {
      nome: "Premium",
      preco: "R$ 74,99/mês",
      descricao: [
        "Tudo do plano Plus +",
        "Cadastro de clientes",
        "Sistema de cupons",
        "Relatórios Avançados",
        "Suporte 24h",
        "Produtos Ilimitados",
        "Certificado de Segurança SSL",
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