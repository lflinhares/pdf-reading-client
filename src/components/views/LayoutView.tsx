import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Viewport, FilteredDocumentWrapper } from "../Reader.styles";

// Aponte para a versão correta do worker que instalamos
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface FilteredLayoutViewProps {
  file: File;
  theme: "dark" | "light";
  pageNumber: number;
  onLoadSuccess: (numPages: number) => void;
}

const FilteredLayoutView: React.FC<FilteredLayoutViewProps> = ({
  file,
  theme,
  pageNumber,
  onLoadSuccess,
}) => {
  // 1. Hook para armazenar a largura do contêiner
  const [width, setWidth] = useState<number>();

  // 2. Hook para obter uma referência ao elemento do contêiner (Viewport)
  const viewportRef = useRef<HTMLDivElement>(null);

  // 3. Efeito para medir a largura do contêiner e observar mudanças
  useEffect(() => {
    const handleResize = () => {
      // Define a largura no estado com base na largura atual do contêiner
      if (viewportRef.current) {
        setWidth(viewportRef.current.clientWidth);
      }
    };

    // Mede a largura inicial
    handleResize();

    // Adiciona um ouvinte de evento para redimensionamentos da janela
    window.addEventListener("resize", handleResize);

    // Função de limpeza: remove o ouvinte de evento quando o componente é desmontado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // O array vazio garante que este efeito seja executado apenas uma vez (na montagem)

  return (
    // 4. Anexa a referência ao nosso contêiner Viewport
    <Viewport ref={viewportRef}>
      <FilteredDocumentWrapper className={theme === "dark" ? "dark-theme" : ""}>
        <Document
          file={file}
          onLoadSuccess={({ numPages }) => onLoadSuccess(numPages)}
        >
          {/* 5. Passa a largura medida para o componente Page */}
          <Page pageNumber={pageNumber} width={width} />
        </Document>
      </FilteredDocumentWrapper>
    </Viewport>
  );
};

export default FilteredLayoutView;
