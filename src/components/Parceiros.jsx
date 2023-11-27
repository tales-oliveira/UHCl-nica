import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Parceiros = () => {
  const [dadosParceiro, setDadosParceiro] = useState({
    nome: '',
    endereco: '',
    email: '',
    telefone: '',
    cnpj: ''
  });

  const [parceiros, setParceiros] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDadosParceiro((prevDadosParceiro) => ({
      ...prevDadosParceiro,
      [name]: value
    }));
  };

  const handleSalvarClick = () => {
    // Lógica para salvar os dados no estado parceiros.
    setParceiros([...parceiros, dadosParceiro]);

    // Limpar os campos após salvar.
    setDadosParceiro({
      nome: '',
      endereco: '',
      email: '',
      telefone: '',
      cnpj: ''
    });
  };

  return (
    <div className="max-w-md mx-auto mt-12 pt-20 p-6 bg-white rounded-md shadow-md">
      <TextField
        label="Nome do Parceiro"
        variant="outlined"
        fullWidth
        name="nome"
        value={dadosParceiro.nome}
        onChange={handleChange}
        className="mb-4"
      />
      <TextField
        label="Endereço do Parceiro"
        variant="outlined"
        fullWidth
        name="endereco"
        value={dadosParceiro.endereco}
        onChange={handleChange}
        className="mb-4"
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="email"
        value={dadosParceiro.email}
        onChange={handleChange}
        className="mb-4"
      />
      <TextField
        label="Telefone"
        variant="outlined"
        fullWidth
        name="telefone"
        value={dadosParceiro.telefone}
        onChange={handleChange}
        className="mb-4"
      />
      <TextField
        label="CNPJ"
        variant="outlined"
        fullWidth
        name="cnpj"
        value={dadosParceiro.cnpj}
        onChange={handleChange}
        className="mb-4"
      />
      <Button variant="contained" color="primary" onClick={handleSalvarClick} className="mb-4">
        Salvar
      </Button>
      {parceiros.map((parceiro, index) => (
        <div key={index} className="bg-gray-100 p-2 mb-2 rounded-md">
          <p><strong>Nome:</strong> {parceiro.nome}</p>
          <p><strong>Endereço:</strong> {parceiro.endereco}</p>
          <p><strong>Email:</strong> {parceiro.email}</p>
          <p><strong>Telefone:</strong> {parceiro.telefone}</p>
          <p><strong>CNPJ:</strong> {parceiro.cnpj}</p>
        </div>
      ))}
    </div>
  );
};

export default Parceiros;
