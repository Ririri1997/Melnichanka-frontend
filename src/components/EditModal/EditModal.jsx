import React, { useState, useEffect, useReducer } from 'react';
import { FormControl, FormHelperText, MenuItem, InputLabel, Select, TextField, Button, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import Form from '../Form/Form';
import { formReducer, INITIAL_STATE } from './EditModal.state';
import axios from 'axios';

const EditModal = ({ isOpen, onClose, onSave, rowData, cities, isCreating }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValidText, values, isFormReadyToSubmit } = formState;
  const popupTitle = isCreating ? 'Добавление компании' : 'Редактирование компании';
  const buttonText = isCreating ? 'Добавить компанию' : 'Сохранить';
  const [positions, setPositions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting && isFormReadyToSubmit) {
      onSave(values);
      dispatchForm({ type: 'CLEAR' });
      setIsSubmitting(false); // Сброс состояния отправки после выполнения действий
    }
  }, [isSubmitting, isFormReadyToSubmit, onSave, values]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://145.239.84.6/api/v1/clients/directorposition/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        setPositions(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка позиций директора:', error);
      }
    };
    fetchPositions();
  }, []);

  useEffect(() => {
    if (rowData) {
      dispatchForm({ type: 'SET_ROW_DATA', payload: { ...rowData } });
    }
  }, [rowData]);

  const onChange = (name, value) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [name]: value } });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    dispatchForm({ type: 'SUBMIT', values });
    setIsSubmitting(true); // Установка состояния отправки при нажатии кнопки отправки формы
  };

  const onCloseFunction = () => {
    onClose();
    dispatchForm({ type: 'CLEAR' });
  }

  return (
    <Dialog open={isOpen} onClose={onCloseFunction} style={{ width: '100%' }}>
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
            error={!!isValidText.client_name}
            helperText={isValidText.client_name || ''}
          />
          <FormControl variant="outlined" fullWidth error={!!isValidText.destination_city}>
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
            {!!isValidText.destination_city && (
              <FormHelperText>{isValidText.destination_city}</FormHelperText>
            )}
          </FormControl>
          <TextField
            margin="dense"
            type="number"
            label="Номер договора"
            name="contract_number"
            value={values.contract_number}
            onChange={(e) => onChange('contract_number', e.target.value)}
            error={!!isValidText.contract_number}
            helperText={isValidText.contract_number || ''}
          />
          <TextField
            id="date"
            margin="dense"
            label="Дата заключения договора"
            name="contract_date"
            type="date"
            value={values.contract_date}
            onChange={(e) => onChange('contract_date', e.target.value)}
            error={!!isValidText.contract_date}
            helperText={isValidText.contract_date || ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="ФИО директора"
            name="director_name"
            value={values.director_name}
            onChange={(e) => onChange('director_name', e.target.value)}
            error={!!isValidText.director_name}
            helperText={isValidText.director_name || ''}
          />
          <FormControl variant="outlined" error={!!isValidText.director_position}>
            <InputLabel id="director_position">Позиция директора</InputLabel>
            <Select
              labelId="director_position"
              id="demo-simple-select"
              label="Позиция директора"
              onChange={(e) => onChange('director_position', e.target.value)}
              value={values.director_position}
              required
            >
              {positions.map((item, i) => (
                <MenuItem value={item.id} key={i}>{item.director_position}</MenuItem>
              ))}
            </Select>
            {!!isValidText.director_position && (
              <FormHelperText>{isValidText.director_position}</FormHelperText>
            )}
          </FormControl>
          <TextField
            margin="dense"
            label="Номер приложения"
            name="last_application_number"
            value={values.last_application_number}
            onChange={(e) => onChange('last_application_number', e.target.value)}
            error={!!isValidText.last_application_number}
            helperText={isValidText.last_application_number || ''}
          />
        </Form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleFormSubmit} color="primary">
          {buttonText}
        </Button>
        <Button variant="outlined" onClick={onCloseFunction} color="primary">
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
// import React, { useState, useEffect, useReducer } from 'react';
// import {FormControl, FormHelperText, MenuItem, InputLabel, Select, TextField, Button, DialogActions, DialogContent, DialogTitle, Dialog} from '@mui/material';
// import Form from '../Form/Form';
// import {formReducer, INITIAL_STATE } from './EditModal.state';
// import axios from 'axios';

// const EditModal = ({ isOpen, onClose, onSave, rowData, cities, isCreating }) => {
//   const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
//   const { isValidText, values, isFormReadyToSubmit } = formState;
//   const popupTitle = isCreating ? 'Добавление компании' : 'Редактирование компании';
//   const buttonText = isCreating ? 'Добавить компанию' : 'Сохранить';
//   const [positions, setPositions] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (isSubmitting && isFormReadyToSubmit) {
//       onSave(values);
//       dispatchForm({ type: 'CLEAR' });
//       setIsSubmitting(false); // Сброс состояния отправки после выполнения действий
//     }
//   }, [isSubmitting, isFormReadyToSubmit, onSave, values]);

//   useEffect(() => {
//     const fetchPositions = async () =>{
//       try {
//         const response = await axios.get('http://145.239.84.6/api/v1/clients/directorposition/');
//         setPositions(response.data);
//       } catch (error){
//         console.error('Ошибка при получении списка позиций директора : ', error)
//       }
//     };
//     fetchPositions();
//   }, []);

//   useEffect(()=> {
//     if (rowData) {
//       dispatchForm({type: 'SET_ROW_DATA', payload: { ...rowData}});
//     } 
//   }, [rowData]);

//   const onChange = (name, value) => {
//     dispatchForm({ type: 'SET_VALUE', payload: { [name]: value } });
//   };
  
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     dispatchForm({ type: 'SUBMIT', values });
//     setIsSubmitting(true); // Установка состояния отправки при нажатии кнопки отправки формы
//   };

//   const onCloseFunction = () => {
//     onClose();
//     dispatchForm({ type: 'CLEAR' });
//   }
  
//   return (
//     <Dialog open={isOpen} onClose={onCloseFunction} style={{ width: '100%' }}>
//       <DialogTitle style={{ width: '100%' }}>{popupTitle}</DialogTitle>
//       <DialogContent style={{ width: '508px' }}>
//         <Form>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Название компании"
//             name="client_name"
//             value={values.client_name}
//             onChange={(e) => onChange('client_name', e.target.value)} 
//             error={!!isValidText.client_name}
//             helperText={isValidText.client_name || ''}
//             />
//           <FormControl variant="outlined" fullWidth
//           error={!!isValidText.destination_city}
//           >
//             <InputLabel id="city">Город</InputLabel>
//             <Select 
//               labelId="city"
//               margin="dense"
//               label="Город"
//               name="destination_city"
//               value={values.destination_city}
//               onChange={(e) => onChange('destination_city', e.target.value)}
//             >
//             {Object.keys(cities).map(cityId => (
//               <MenuItem key={cityId} value={cityId}>
//                 {cities[cityId]}
//               </MenuItem>
//               ))}
//             </Select>
//             {!!isValidText.destination_city && (
//             <FormHelperText>{isValidText.destination_city}</FormHelperText>
//             )}
//           </FormControl>
//           <TextField
//             margin="dense"
//             type="number"
//             label="Номер договора"
//             name="contract_number"
//             value={values.contract_number}
//             onChange={(e) => onChange('contract_number', e.target.value)}
//             error={!!isValidText.contract_number}
//             helperText={isValidText.contract_number || ''}
//           />
//           <TextField
//             id="date"
//             margin="dense"
//             label="Дата заключения договора"
//             name="contract_date"
//             type="date"
//             value={values.contract_date}
//             onChange = {(e) => onChange('contract_date', e.target.value)}
//             error={!!isValidText.contract_date}
//             helperText={isValidText.contract_date || ''}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           <TextField
//             margin="dense"
//             label="ФИО директора"
//             name="director_name"
//             value={values.director_name}
//             onChange = {(e) => onChange('director_name', e.target.value)}
//             error={!!isValidText.director_name}
//             helperText={isValidText.director_name || ''}
//           />

//           <FormControl variant="outlined"  error={!!isValidText.director_position}>
//             <InputLabel id="director_position">Позиция директора</InputLabel>
//             <Select
//               labelId="director_position"
//               id="demo-simple-select"
//               label="Позиция директора"
//               onChange={(e) => onChange('director_position', e.target.value)}
//               value={values.director_position}
//               required
//               > 
//               {positions.map((item, i) => (
//                 <MenuItem value={item.id} key={i}>{item.director_position}</MenuItem>
//               ))}
//             </Select>
//               {!!isValidText.director_position && (
//                 <FormHelperText>{isValidText.director_position}</FormHelperText>
//               )}
//           </FormControl>
//           <TextField
//             margin="dense"
//             label="Номер приложения"
//             name="last_application_number"
//             value={values.last_application_number}
//             onChange = {(e) => onChange('last_application_number', e.target.value)}
//             error={!!isValidText.last_application_number}
//             helperText={isValidText.last_application_number || ''}
//           />
//         </Form>
//       </DialogContent>
//       <DialogActions>
//         <Button 
//           variant="contained" 
//           onClick={handleFormSubmit} 
//           color="primary">
//             {buttonText}
//         </Button>
//         <Button variant="outlined"  onClick={onCloseFunction} color="primary">
//           Отмена
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditModal;