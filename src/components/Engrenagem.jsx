// Engrenagem.jsx

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import ExcluirLogin from './ExcluirLogin';
import AlterarLogin from './AlterarLogin';
import Prontuario from './Prontuario';

const Engrenagem = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [excluirModalAberto, setExcluirModalAberto] = useState(false);
  const [alterarModalAberto, setAlterarModalAberto] = useState(false);
  const [prontuarioModalAberto, setProntuarioModalAberto] = useState(false);
  const [prontuarioDados, setProntuarioDados] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlterar = () => {
    setAlterarModalAberto(true);
    handleClose();
  };

  const handleExcluir = () => {
    setExcluirModalAberto(true);
    handleClose();
  };

  const handleProntuario = () => {
    // Simplesmente mostra as informações se o modal do prontuário estiver fechado
    if (!prontuarioModalAberto) {
      setProntuarioDados({
        alergias: 'Informação de exemplo de alergias',
        medicamentos: 'Informação de exemplo de medicamentos',
        tipoSanguineo: 'O+',
      });
    }

    setProntuarioModalAberto(true);
    handleClose();
  };

  const handleProntuarioAtualizar = (novosDados) => {
    // Lógica para atualizar os dados no backend
    console.log('Dados atualizados no backend:', novosDados);
  };

  const fecharExcluirModal = () => {
    setExcluirModalAberto(false);
  };

  const fecharAlterarModal = () => {
    setAlterarModalAberto(false);
  };

  const fecharProntuarioModal = () => {
    setProntuarioModalAberto(false);
  };

  return (
    <div className="fixed left-0 p-4">
      <IconButton onClick={handleClick}>
        <SettingsIcon fontSize="large" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAlterar}>Alterar</MenuItem>
        <MenuItem onClick={handleExcluir}>Excluir</MenuItem>
        <MenuItem onClick={handleProntuario}>Prontuário</MenuItem>
      </Menu>

      <ExcluirLogin isOpen={excluirModalAberto} onClose={fecharExcluirModal} />
      <AlterarLogin isOpen={alterarModalAberto} onClose={fecharAlterarModal} />
      <Prontuario
        isOpen={prontuarioModalAberto}
        onClose={fecharProntuarioModal}
        dadosProntuario={prontuarioDados}
        onAtualizar={handleProntuarioAtualizar}
      />
    </div>
  );
};

export default Engrenagem;
