import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import ExcluirLogin from './ExcluirLogin';
import AlterarLogin from './AlterarLogin';

const Engrenagem = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [excluirModalAberto, setExcluirModalAberto] = useState(false);
  const [alterarModalAberto, setAlterarModalAberto] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlterar = () => {
    // Abre o modal "Alterar" quando a opção "Alterar" é clicada
    setAlterarModalAberto(true);
    handleClose();
  };

  const handleExcluir = () => {
    // Abre o modal de confirmação quando "Excluir" é clicado
    setExcluirModalAberto(true);
    handleClose();
  };


  const fecharExcluirModal = () => {
    // Fechar o modal de confirmação se o usuário cancelar
    setExcluirModalAberto(false);
  };

  const fecharAlterarModal = () => {
    // Fechar o modal "Alterar" se o usuário cancelar
    setAlterarModalAberto(false);
  };

  return (
    <div className="fixed left-0 p-4">
      <IconButton onClick={handleClick}>
        <SettingsIcon fontSize="large"/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAlterar}>Alterar</MenuItem>
        <MenuItem onClick={handleExcluir}>Excluir</MenuItem>
      </Menu>

      {/* Renderiza o modal "Excluir" */}
      <ExcluirLogin
        isOpen={excluirModalAberto}
        onClose={fecharExcluirModal}
      />

      {/* Renderiza o modal "Alterar" */}
      <AlterarLogin
        isOpen={alterarModalAberto}
        onClose={fecharAlterarModal}
      />
    </div>
  );
};

export default Engrenagem;
