import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';


const AlterarLogin = ({ isOpen, onClose }) => {
  const [novosDados, setNovosDados] = useState({
    novoEmail: '',
    novaSenha: '',
  });

  const [atualizadoComSucesso, setAtualizadoComSucesso] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovosDados((prevDados) => ({
      ...prevDados,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
        setAtualizadoComSucesso(true);
        await axios.post('http://localhost:3000/alterar', novosDados);
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
      }
    };

    const fecharAtualizadoComSucesso = () => {
        // Fecha a mensagem de sucesso e reseta o estado
        setAtualizadoComSucesso(false);
        onClose();
    };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%', // Ajuste a largura conforme necessário
          maxWidth: 400, // Adicione um valor máximo para evitar que o modal fique muito largo
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="div">
          Alterar Informações
        </Typography>
        {atualizadoComSucesso ? (
          <>
            <Typography variant="body1" gutterBottom>
              Atualizado com sucesso!
            </Typography>
            <Button variant="contained" color="primary" onClick={fecharAtualizadoComSucesso}>
              Fechar
            </Button>
          </>
        ) : (
          <form>
            <label>Email:</label>
            <input
              type="text"
              name="novoEmail"
              value={novosDados.novoEmail}
              onChange={handleInputChange}
              style={{ width: '100%' }} // Define a largura do campo de entrada
            />
            <br />
            <label>Senha:</label>
            <input
              type="password"
              name="novaSenha"
              value={novosDados.novaSenha}
              onChange={handleInputChange}
              style={{ width: '100%' }} // Define a largura do campo de entrada
            />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
              Salvar Alterações
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default AlterarLogin;
