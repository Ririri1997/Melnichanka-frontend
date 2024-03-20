import React, { useState, useEffect } from 'react';
import {FormControl, FormHelperText, MenuItem, InputLabel, Select, TextField, Button, DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';
import Form from '../Form/Form';

const EditModal = ({ isOpen, onClose, onSave, rowData, cities, isCreating }) => {
  const [editedData, setEditedData] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const popupTitle = isCreating ? 'Добавление компании' : 'Редактирование компании'
 
  console.log(isCreating)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedData);
  };

  useEffect(() => {
    setEditedData({
      client_name: rowData?.client_name || '',
      destination_city: rowData?.destination_city || '',
      contract_number: rowData?.contract_number || '',
      contract_date: rowData?.contract_date || '',
      director_name: rowData?.director_name || '',
      director_position: rowData?.director_position || '',
      last_application_number: rowData?.last_application_number || '',
    });
  }, [rowData]);

  return (
    <Dialog open={isOpen} onClose={onClose} style={{ width: '100%' }}>
      <DialogTitle style={{ width: '100%' }}>{popupTitle}</DialogTitle>
      <DialogContent style={{ width: '508px' }}>
        <Form>
          <TextField
            autoFocus
            margin="dense"
            label="Название компании"
            name="client_name"
            fullWidth
            value={editedData.client_name}
            onChange={handleChange}
          />
          <FormControl variant="outlined" fullWidth
          error={!!localErrors.city}
          >
            <InputLabel id="city">Город</InputLabel>
            <Select 
              labelId="city"
              margin="dense"
              label="Город"
              name="destination_city"
              fullWidth
              value={editedData.destination_city}
              onChange={handleChange}
            >
            {Object.keys(cities).map(cityId => (
              <MenuItem key={cityId} value={cityId}>
                {cities[cityId]}
              </MenuItem>
              ))}
            </Select>
            {!!localErrors.city && (
            <FormHelperText>{localErrors.city}</FormHelperText>
            )}
          </FormControl>
          <TextField
            margin="dense"
            type="number"
            label="Номер договора"
            name="contract_number"
            fullWidth
            value={editedData.contract_number}
            onChange={handleChange}
          />
          <TextField
            id="date"
            margin="dense"
            label="Дата заключения договора"
            name="contract_date"
            type="date"
            fullWidth
            value={editedData.contract_date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="ФИО директора"
            name="director_name"
            fullWidth
            value={editedData.director_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Должность директора"
            name="director_position"
            fullWidth
            value={editedData.director_position}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Номер приложения"
            name="last_application_number"
            fullWidth
            value={editedData.last_application_number}
            onChange={handleChange}
          />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleSave} color="primary">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;