import React, { useState, ChangeEvent } from 'react';

const MeuComponente: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);

  const handleArquivoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const arquivoSelecionado = files[0];
      setArquivo(arquivoSelecionado);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleArquivoChange} />
      {arquivo && <p>Nome do arquivo: {arquivo.name}</p>}
    </div>
  );
};

export default MeuComponente;
