import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Planos.css";
import ListaPlanos from "./ListaPlanos";

const PlanosPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlans, setShowPlans] = useState(true);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
  });
  const [cadastroSucesso, setCadastroSucesso] = useState(false); // Estado para controlar o sucesso do cadastro

  const handleSelectPlan = (plano) => {
    setSelectedPlan(plano);
    setShowPlans(false);
    setCadastroSucesso(false); // Reseta o estado ao selecionar um novo plano
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Salva os dados no Firestore
      await addDoc(collection(db, "cadastros"), {
        ...formData,
        plano: selectedPlan.nome,
        dataCadastro: serverTimestamp(),
      });

      // Define o cadastro como bem-sucedido e limpa o formulário
      setCadastroSucesso(true);
      setFormData({ nome: "", email: "", telefone: "", empresa: "" });
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      alert("Ocorreu um erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="planos-page-container">
      <h2 className="planos-page-title">Escolha Seu Futuro Agora</h2>
      {showPlans && <ListaPlanos selecionarPlano={handleSelectPlan} />}

      {selectedPlan && !cadastroSucesso && (
        <div className="planos-page-form">
          <h3>Ative o Plano {selectedPlan.nome}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nome"
              placeholder="Seu Nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Seu Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="telefone"
              placeholder="Seu WhatsApp"
              value={formData.telefone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="empresa"
              placeholder="Nome da Empresa (opcional)"
              value={formData.empresa}
              onChange={handleInputChange}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      )}

      {selectedPlan && cadastroSucesso && (
        <div className="mensagem-boas-vindas-container">
          <h3 className="mensagem-boas-vindas">Bem-vindo(a) ao {selectedPlan.nome}!</h3>
          <p className="mensagem-agradecimento">
            Obrigado pelo seu cadastro! Entraremos em contato em breve para dar continuidade à sua jornada.
          </p>
          <div className="confetti-animation"></div>
        </div>
      )}

      <footer className="planos-page-footer">
        <p>Todos os direitos reservados © 2025 MabelSoft</p>
      </footer>
    </div>
  );
};

export default PlanosPage;