import React, { useState, useEffect } from "react";
import Reader from "../components/Reader";
import api from "../api";
import { useAuth } from "../AuthContext";
import {
  LibraryContainer,
  Header,
  Title,
  HeaderActions,
  SecondaryButton,
  HiddenInput,
  UploadLabel,
  PdfList,
  PdfListItem,
  PdfName,
  PdfActions,
  PrimaryButton,
  EmptyLibraryMessage,
  BackButton,
} from "./MainApp.styles";

const MainApp: React.FC = () => {
  const [pdfs, setPdfs] = useState<any[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { logout } = useAuth();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    return () => {
      document.body.removeAttribute("data-theme");
    };
  }, [theme]);

  const fetchPdfs = async () => {
    try {
      const response = await api.get("/pdfs");
      setPdfs(response.data);
    } catch (error) {
      console.error("Falha ao buscar PDFs", error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const handleFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await api.post("/pdfs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchPdfs();
    } catch (error) {
      console.error("Upload falhou", error);
    }
  };

  const handleDelete = async (pdfId: string) => {
    try {
      await api.delete(`/pdfs/${pdfId}`);
      fetchPdfs();
      if (
        selectedPdf &&
        pdfs.find((p) => p._id === pdfId)?.originalName === selectedPdf.name
      ) {
        setSelectedPdf(null);
      }
    } catch (error) {
      console.error("Deleção falhou", error);
    }
  };

  const handleRead = async (pdf: any) => {
    try {
      const response = await api.get(`/pdfs/${pdf._id}`, {
        responseType: "blob",
      });
      const file = new File([response.data], pdf.originalName, {
        type: "application/pdf",
      });
      setSelectedPdf(file);
    } catch (error) {
      console.error("Falha ao carregar PDF", error);
    }
  };

  if (selectedPdf) {
    return (
      <>
        <BackButton
          onClick={() => setSelectedPdf(null)}
          title="Voltar para a Biblioteca"
        >
          &#x2190;
        </BackButton>
        <Reader
          file={selectedPdf}
          theme={theme}
          onThemeToggle={() =>
            setTheme((t) => (t === "dark" ? "light" : "dark"))
          }
        />
      </>
    );
  }

  return (
    <LibraryContainer>
      <Header>
        <Title>Your PDF Library</Title>
        <HeaderActions>
          <SecondaryButton onClick={logout}>Logout</SecondaryButton>
          <UploadLabel htmlFor="pdf-upload">Upload PDF</UploadLabel>
          <HiddenInput
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) =>
              e.target.files && handleFileUpload(e.target.files[0])
            }
          />
        </HeaderActions>
      </Header>

      <PdfList>
        {pdfs.length > 0 ? (
          pdfs.map((pdf) => (
            <PdfListItem key={pdf._id}>
              <PdfName title={pdf.originalName}>{pdf.originalName}</PdfName>
              <PdfActions>
                <PrimaryButton onClick={() => handleRead(pdf)}>
                  Read
                </PrimaryButton>
                <SecondaryButton onClick={() => handleDelete(pdf._id)}>
                  Delete
                </SecondaryButton>
              </PdfActions>
            </PdfListItem>
          ))
        ) : (
          <EmptyLibraryMessage>
            Sua biblioteca está vazia. Faça o upload do seu primeiro PDF!
          </EmptyLibraryMessage>
        )}
      </PdfList>
    </LibraryContainer>
  );
};

export default MainApp;
