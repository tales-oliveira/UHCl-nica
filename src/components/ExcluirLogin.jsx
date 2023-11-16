import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';

const ExcluirContaModal = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = async () => {
    try {
      // Aqui você pode realizar chamadas Axios para enviar um sinal para o backend
      await axios.post('http://localhost:3000/excluir');
      onConfirm(true);
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      // Em caso de erro, você pode lidar com isso de acordo com suas necessidades
    } finally {
      // Feche o modal após a confirmação ou em caso de erro
      onClose();
    }
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
      </Box>
    </Modal>
  );
};

export default ExcluirContaModal;
