import React, { useState } from 'react';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
// import moment from 'moment-timezone';

const Agenda = () => {
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [infoTexto, setInfoTexto] = useState('');
    const [savedData, setSavedData] = useState([]);
  
    const handleDateTimeChange = (dateTime) => {
      setSelectedDateTime(dateTime);
    };
  
    const handleTextChange = (e) => {
      setInfoTexto(e.target.value);
    };
  
    const handleSave = async () => {
      if (selectedDateTime && infoTexto.trim() !== '') {
        // const formattedDateTime = moment(selectedDateTime).utc().format();

        const newData = {
          dateTime: selectedDateTime,
          text: infoTexto.trim(),
        };
  

        // Adiciona a nova entrada à lista de dados salvos
        setSavedData((prevData) => [...prevData, newData]);
  
        // Limpa os campos após salvar
        setSelectedDateTime(null);
        setInfoTexto('');

        console.log(newData);
        await axios.post('http://localhost:3000/agenda', {newData});
      }
    };
  
    return (
      <Box>
        <MuiLocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={selectedDateTime}
            onChange={(newDateTime) => handleDateTimeChange(newDateTime)}
            renderInput={(inputProps) => (
              <TextField {...inputProps} variant="outlined" margin="normal" fullWidth />
            )}
          />
        </MuiLocalizationProvider>
  
        <Box mt={3}>
          <TextField
            label="Informações em forma de texto"
            value={infoTexto}
            onChange={handleTextChange}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleSave} mt={2}>
            Salvar
          </Button>
        </Box>
  
        {savedData.length > 0 && (
          <Box mt={3}>
            <Typography variant="h6">Dados Salvos:</Typography>
            <List>
              {savedData.map((data, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Data e Hora: ${data.dateTime.format('DD/MM/YYYY HH:mm')}`}
                    secondary={`Texto: ${data.text}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    );
  };
  
  export default Agenda;