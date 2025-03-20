import React from "react";
import "./Planos.css";

const PlanoCard = ({ plano, selecionarPlano }) => {
  const isFree = plano.nome === "Free";

  return (
    <div className="planos-page-card">
      <h3>{plano.nome}</h3>
      <p className="planos-page-preco">{plano.preco}</p>
      <ul className="planos-page-descricao">
        {plano.descricao.map((item, i) => (
          <li
            key={i}
            className={
              isFree && (item.includes("Sem opção") || item.includes("Sem sistema"))
                ? "planos-page-unavailable"
                : ""
            }
          >
            {item}
          </li>
        ))}
      </ul>
      <button onClick={() => selecionarPlano(plano)}>Selecionar</button>
    </div>
  );
};

export default PlanoCard;