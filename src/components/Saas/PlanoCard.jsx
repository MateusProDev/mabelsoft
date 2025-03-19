import React from "react";
import "./Planos.css";

const PlanoCard = ({ plano, selecionarPlano }) => {
  return (
    <div className="plano-card">
      <h3>{plano.nome}</h3>
      <p className="preco">{plano.preco}</p>
      <p className="descricao">{plano.descricao}</p>
      <button onClick={() => selecionarPlano(plano.nome)}>Selecionar</button>
    </div>
  );
};

export default PlanoCard;
