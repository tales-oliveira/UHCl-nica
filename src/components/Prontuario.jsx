import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const Prontuario = ({ isOpen, onClose, dadosProntuario, onAtualizar }) => {
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [tipoSanguineo, setTipoSanguineo] = useState('');
  const [modoAtualizacao, setModoAtualizacao] = useState(false);

  useEffect(() => {
    if (dadosProntuario) {
      setAlergias(dadosProntuario.alergias || '');
      setMedicamentos(dadosProntuario.medicamentos || '');
      setTipoSanguineo(dadosProntuario.tipoSanguineo || '');
    }
  }, [dadosProntuario]);

  const handleAtualizar = () => {
    setModoAtualizacao(true);
  };

  const handleFechar = () => {
    // Se estiver no modo de atualização, volta para o modo de visualização
    if (modoAtualizacao) {
      setModoAtualizacao(false);
    } else {
      onClose();
    }
  };

  const handleSalvar = async () => {
    // Crie um objeto com os dados do prontuário
    const dadosProntuario = {
      alergias,
      medicamentos,
      tipoSanguineo,
    };

    try {
      onAtualizar(dadosProntuario);
      await axios.post('http://localhost:3000/prontuario', dadosProntuario);
    } catch (error) {
      console.error('Erro ao salvar prontuário:', error);
    } finally {
        setModoAtualizacao(false);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleFechar}>
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
        }}
      >
        <Typography variant="h6" component="div">
          Prontuário
        </Typography>
        <TextField
          label="Alergias"
          fullWidth
          value={alergias}
          onChange={(e) => setAlergias(e.target.value)}
          disabled={!modoAtualizacao}
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: 'black' } }}
        />
        <TextField
          label="Medicamentos"
          fullWidth
          value={medicamentos}
          onChange={(e) => setMedicamentos(e.target.value)}
          disabled={!modoAtualizacao}
          sx={{ mb: 2 }}
          InputLabelProps={{ sx: { color: 'black' } }}
        />
        <TextField
          label="Tipo Sanguíneo"
          fullWidth
          value={tipoSanguineo}
          onChange={(e) => setTipoSanguineo(e.target.value)}
          disabled={!modoAtualizacao}
          InputLabelProps={{ sx: { color: 'black' } }}
        />

        {!modoAtualizacao && (
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" onClick={handleAtualizar}>
              Atualizar
            </Button>
            <Button variant="contained" onClick={handleFechar}>
              Fechar
            </Button>
          </Box>
        )}

        {modoAtualizacao && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={handleSalvar}>
              Salvar
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default Prontuario;
