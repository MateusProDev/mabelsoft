import React from "react";
import PlanoCard from "./PlanoCard";

const ListaPlanos = ({ selecionarPlano }) => {
  const planos = [
    { nome: "Free", preco: "Gratuito", descricao: "Acesso básico ao sistema" },
    { nome: "Plus", preco: "R$ 34,99/mês", descricao: "Loja + Estoque" },
    { nome: "Premium", preco: "R$ 64,99/mês", descricao: "Todos os recursos + Suporte premium" },
  ];

  return (
    <div className="lista-planos">
      {planos.map((plano) => (
        <PlanoCard key={plano.nome} plano={plano} selecionarPlano={selecionarPlano} />
      ))}
    </div>
  );
};

export default ListaPlanos;
