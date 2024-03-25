import React, { useState, useEffect, useReducer } from 'react';
import {FormControl, FormHelperText, MenuItem, InputLabel, Select, TextField, Button, DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';
import Form from '../Form/Form';
import {formReducer, INITIAL_STATE } from './EditModal.state';
import axios from 'axios';

const EditModal = ({ isOpen, onClose, onSave, rowData, cities, isCreating }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValidText, values, isFormReadyToSubmit} = formState;
  const [localErrors, setLocalErrors] = useState({});
  // const [serverErrors, setServerErrors] = useState({});
  const popupTitle = isCreating ? 'Добавление компании' : 'Редактирование компании';
  const buttonText = isCreating ? 'Добавить компанию' : 'Сохранить';
  const [positions, setPositions] = useState([]);

  useEffect(() => {
		if(isFormReadyToSubmit){
    dispatchForm({type: 'SUBMIT', values});
    }
  }, [isFormReadyToSubmit, values]);

  useEffect(() => {
    const fetchPositions = async () =>{
      try {
        const response = await axios.get('http://127.0.0.1:8000/v1/clients/director_position/');
        setPositions(response.data);
      } catch (error){
        console.error('Ошибка при получении списка позиций директора : ', error)
      }
    };
    fetchPositions();
  }, []);

  useEffect(()=> {
    if(!rowData) {
      dispatchForm({type: 'CLEAR'});
    }
    dispatchForm({type: 'SET_VALUE', payload: {...rowData }});
  }, [rowData]);

  const onChange = (name, value) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [name]: value } });
    dispatchForm({ type: 'SUBMIT', values: { ...values, [name]: value } });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onChange(event.target.name, event.target.value);
    setLocalErrors(prevErrors => ({ ...prevErrors, client_name: isValidText.client_name}));
    setLocalErrors(prevErrors => ({ ...prevErrors, destination_city: isValidText.destination_city}));
    setLocalErrors(prevErrors => ({ ...prevErrors, contract_number: isValidText.contract_number}));
    setLocalErrors(prevErrors => ({ ...prevErrors, contract_date: isValidText.contract_date}));
    setLocalErrors(prevErrors => ({ ...prevErrors, director_name: isValidText.director_name}));
    setLocalErrors(prevErrors => ({ ...prevErrors, director_position: isValidText.director_position}));
    setLocalErrors(prevErrors => ({ ...prevErrors, last_application_number: isValidText.last_application_number}));
    if (!isFormReadyToSubmit) {
      return; 
    }
    onSave(values);
    dispatchForm({ type: 'CLEAR'});
  }

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
            value={values.client_name}
            onChange={(e) => onChange('client_name', e.target.value)} 
            error={!!localErrors.client_name}
            helperText={localErrors.client_name || ''}
            />
          <FormControl variant="outlined" fullWidth
          error={!!localErrors.destination_city}
          >
            <InputLabel id="city">Город</InputLabel>
            <Select 
              labelId="city"
              margin="dense"
              label="Город"
              name="destination_city"
              value={values.destination_city}
              onChange={(e) => onChange('destination_city', e.target.value)}
            >
            {Object.keys(cities).map(cityId => (
              <MenuItem key={cityId} value={cityId}>
                {cities[cityId]}
              </MenuItem>
              ))}
            </Select>
            {!!localErrors.destination_city && (
            <FormHelperText>{localErrors.destination_city}</FormHelperText>
            )}
          </FormControl>
          <TextField
            margin="dense"
            type="number"
            label="Номер договора"
            name="contract_number"
            value={values.contract_number}
            onChange={(e) => onChange('contract_number', e.target.value)}
            error={!!localErrors.contract_number}
            helperText={localErrors.contract_number || ''}
          />
          <TextField
            id="date"
            margin="dense"
            label="Дата заключения договора"
            name="contract_date"
            type="date"
            value={values.contract_date}
            onChange = {(e) => onChange('contract_date', e.target.value)}
            error={!!localErrors.contract_date}
            helperText={localErrors.contract_date || ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="ФИО директора"
            name="director_name"
            value={values.director_name}
            onChange = {(e) => onChange('director_name', e.target.value)}
            error={!!localErrors.director_name}
            helperText={localErrors.director_name || ''}
          />
          <TextField
            margin="dense"
            label="Должность директора"
            name="director_position"
            value={values.director_position}
            onChange = {(e) => onChange('director_position', e.target.value)}
            error={!!localErrors.director_position}
            helperText={localErrors.director_position || ''}
          />
          <FormControl variant="outlined" fullWidth error={!!localErrors.position}>
            <InputLabel id="position">Позиция директора</InputLabel>
            <Select
              labelId="position"
              id="demo-simple-select"
              label="Позиция"
              onChange={(e) => onChange('position', e.target.value)}
              value={values.position}
              required
              > 
              {positions.map((item, i) => (
                <MenuItem value={item.id} key={i}>{item.position}</MenuItem>
              ))}
            </Select>
              {!!localErrors.position && (
                <FormHelperText>{localErrors.position}</FormHelperText>
              )}
          </FormControl>
          <TextField
            margin="dense"
            label="Номер приложения"
            name="last_application_number"
            value={values.last_application_number}
            onChange = {(e) => onChange('last_application_number', e.target.value)}
            error={!!localErrors.last_application_number}
            helperText={localErrors.last_application_number || ''}
          />
        </Form>
      </DialogContent>
      <DialogActions>
      <Button 
        variant="contained" 
        onClick={(e) => {handleFormSubmit(e)}} 
        color="primary">
          {buttonText}
        </Button>
        <Button variant="outlined"  onClick={onClose} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;