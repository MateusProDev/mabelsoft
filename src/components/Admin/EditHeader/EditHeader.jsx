import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase"; // Certifique-se de que o caminho está correto
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditHeader.css";

const AdminEditHeader = () => {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState(""); // URL da imagem
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(""); // Mensagem de sucesso
  const [image, setImage] = useState(null); // Armazena a imagem selecionada

  useEffect(() => {
    // Busca a logo atual no Firestore
    const fetchHeaderData = async () => {
      const headerRef = doc(db, "content", "header");
      const headerDoc = await getDoc(headerRef);

      if (headerDoc.exists()) {
        setLogoUrl(headerDoc.data().logoUrl);
      } else {
        console.log("Nenhuma logo encontrada!");
      }
    };

    fetchHeaderData();
  }, []);

  // Função de upload para o Backblaze B2
  const handleImageUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("images", file);
    formData.append("productId", "header-logo"); // Usando um ID fixo para a logo

    try {
      const response = await axios.post("https://mabelsoft.com.br/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const rawUrl = response.data.urls[0];
      console.log("URL retornada do Backblaze:", rawUrl); // Debug

      // Modificando a URL para usar o subdomínio configurado no Cloudflare
      const cacheUrl = rawUrl.replace("https://s3.us-west-001.backblazeb2.com", "https://imagens.mabelsoft.com.br");

      return cacheUrl;
    } catch (error) {
      setError("Falha no upload da imagem para o Backblaze B2.");
      console.error("Erro no upload:", error);
      return null;
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Por favor, selecione uma imagem!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(""); // Limpar a mensagem de sucesso ao iniciar o processo

    const imageUrl = await handleImageUpload(image);

    if (imageUrl) {
      setNewLogoUrl(imageUrl); // Atualiza a URL da imagem no estado
      setSuccess("Imagem enviada com sucesso!");
    } else {
      setError("Erro ao enviar a imagem!");
    }

    setLoading(false);
  };

  // Função para salvar a nova logo no Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLogoUrl) {
      setError("Faça o upload de uma imagem antes de salvar.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(""); // Limpar a mensagem de sucesso ao iniciar o processo

    try {
      // Atualiza o Firestore com a nova URL da logo
      const headerRef = doc(db, "content", "header");
      await setDoc(headerRef, { logoUrl: newLogoUrl });

      setLogoUrl(newLogoUrl); // Atualiza o estado para exibir a nova logo
      setSuccess("Logo atualizada com sucesso!");
      setTimeout(() => navigate("/admin/dashboard"), 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error("Erro ao atualizar a logo:", error);
      setError("Erro ao salvar a nova logo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-edit-header">
      <h2>Editar Logo</h2>

      {/* Exibe a mensagem de erro, se houver */}
      {error && <p className="admin-error">{error}</p>}

      {/* Exibe a imagem atual da logo */}
      {logoUrl && <img src={logoUrl} alt="Logo Atual" className="admin-logo-preview" />}

      {/* Exibe a mensagem de sucesso, se houver */}
      {success && <p className="admin-success">{success}</p>}

      {/* Upload da nova logo */}
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Enviando..." : "Enviar Imagem"}
        </button>
      </div>

      {/* Exibe a pré-visualização da imagem, se houver uma URL válida */}
      {newLogoUrl && (
        <div>
          <h4>Pré-visualização:</h4>
          <img src={newLogoUrl} alt="Pré-visualização" className="admin-logo-preview" />
        </div>
      )}

      {/* Botão para salvar a nova logo */}
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Logo"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditHeader;