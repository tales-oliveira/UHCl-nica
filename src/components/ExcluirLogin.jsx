import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

const ExcluirLogin = ({ isOpen, onClose, onConfirm }) => {

    const [contaApagada, setContaApagada] = useState(false);

  const handleConfirm = async () => {
    try {
      setContaApagada(true);
      await axios.post('http://localhost:3000/excluir');
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      // Em caso de erro, você pode lidar com isso de acordo com suas necessidades
    } finally {
      // Feche o modal após a confirmação ou em caso de erro
      onClose();
    }
  };

  const fecharModal = () => {
    // Reseta o estado e fecha o modal
    setContaApagada(false);
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
          width: '80%',
          maxWidth: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}
      >
        {contaApagada ? (
          <>
            <Typography variant="h6" component="div">
              Conta apagada
            </Typography>
            <Button variant="contained" color="primary" onClick={fecharModal}>
              Fechar
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" component="div">
              Tem certeza que deseja excluir essa conta?
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={handleConfirm}
              className="mx-auto mt-4"
            >
              Sim!
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ExcluirLogin;
