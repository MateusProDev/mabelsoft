import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Planos.css";

const FormularioCadastro = ({ planoSelecionado }) => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });
  const [mensagem, setMensagem] = useState(""); // Estado para a mensagem de agradecimento

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Salva os dados no Firestore com timestamp
      await addDoc(collection(db, "cadastros"), {
        ...formData,
        plano: planoSelecionado,
        dataCadastro: serverTimestamp(),
      });

      // Exibe mensagem de agradecimento e limpa o formulário
      setMensagem("Obrigado pelo seu cadastro! Entraremos em contato em breve.");
      setFormData({ nome: "", email: "", telefone: "" });
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
      setMensagem("Ocorreu um erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="add-box-form-container">
      <form className="add-box-form" onSubmit={handleSubmit}>
        <h3>Preencha seus dados</h3>
        <input
          type="text"
          name="nome"
          placeholder="Seu nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Seu e-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefone"
          placeholder="Seu telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p className="mensagem-agradecimento">{mensagem}</p>}
    </div>
  );
};

export default FormularioCadastro;