import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditHeader.css";

const AdminEditHeader = () => {
  const navigate = useNavigate();
  const [logoUrl, setLogoUrl] = useState("");
  const [newLogoUrl, setNewLogoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
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

  const fixBackblazeUrl = (url) => {
    let fixedUrl = url.replace(/f\d{3}\.backblazeb2\.com/, "f005.backblazeb2.com");
    fixedUrl = fixedUrl.replace(/ /g, "+");
    console.log("URL corrigida para o formato amigável com f005:", fixedUrl);
    return fixedUrl;
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("images", file);
    formData.append("productId", "header-logo");

    try {
      const response = await axios.post("https://mabelsoft.com.br/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const rawUrl = response.data.urls[0];
      console.log("URL retornada do Backblaze:", rawUrl);
      const fixedUrl = fixBackblazeUrl(rawUrl);
      console.log("URL final salva:", fixedUrl);
      return fixedUrl;
    } catch (error) {
      console.error("Erro no upload:", error);
      if (error.code === "ERR_NETWORK") {
        setError("Erro de rede: Verifique a conexão ou a configuração de CORS no servidor.");
      } else {
        setError("Falha no upload da imagem para o Backblaze B2.");
      }
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
    setSuccess("");

    const imageUrl = await handleImageUpload(image);

    if (imageUrl) {
      setNewLogoUrl(imageUrl);
      setSuccess("Imagem enviada com sucesso!");
    }

    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newLogoUrl) {
      setError("Faça o upload de uma imagem antes de salvar.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const headerRef = doc(db, "content", "header");
      await setDoc(headerRef, { logoUrl: newLogoUrl });

      setLogoUrl(newLogoUrl);
      setSuccess("Logo atualizada com sucesso!");
      setTimeout(() => navigate("/admin/dashboard"), 2000);
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
      {error && <p className="admin-error">{error}</p>}
      {logoUrl && <img src={logoUrl} alt="Logo Atual" className="admin-logo-preview" />}
      {success && <p className="admin-success">{success}</p>}
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Enviando..." : "Enviar Imagem"}
        </button>
      </div>
      {newLogoUrl && (
        <div>
          <h4>Pré-visualização:</h4>
          <img src={newLogoUrl} alt="Pré-visualização" className="admin-logo-preview" />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Salvar Logo"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditHeader;