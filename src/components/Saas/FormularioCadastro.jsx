import React, { useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Planos.css";

const FormularioCadastro = ({ planoSelecionado }) => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cadastros"), { ...formData, plano: planoSelecionado });
      const mensagem = `Olá, meu nome é ${formData.nome}. Estou interessado no plano ${planoSelecionado}. Meu e-mail: ${formData.email}, telefone: ${formData.telefone}.`;
      const whatsappURL = `https://wa.me/seu-numero?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappURL, "_blank");
    } catch (error) {
      console.error("Erro ao cadastrar: ", error);
    }
  };

  return (
    <form className="formulario-cadastro" onSubmit={handleSubmit}>
      <h3>Preencha seus dados</h3>
      <input type="text" name="nome" placeholder="Seu nome" value={formData.nome} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Seu e-mail" value={formData.email} onChange={handleChange} required />
      <input type="tel" name="telefone" placeholder="Seu telefone" value={formData.telefone} onChange={handleChange} required />
      <button type="submit">Contratar via WhatsApp</button>
    </form>
  );
};

export default FormularioCadastro;
