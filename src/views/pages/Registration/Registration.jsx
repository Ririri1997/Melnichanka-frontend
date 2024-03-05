import StyledRegistration from "./Registration.styles";
import CardForm from "../../../components/CardForm/CardForm";
import Form from "../../../components/Form/Form";
import { FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from 'axios';
import InputMask from 'react-input-mask';
import { handleTel, handleEmptyField, handleFullName, handlePasswordMatch, handlePasswordValid, handleEmailValid } from '../../../utils/formValidations';
import { useNavigate } from "react-router-dom";


function Registration() {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [changeDepartment, setСhangeDepartment] = useState('');
  const [changePosition, setСhangePosition] = useState('');
  const [localErrors, setLocalErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const navigate = useNavigate()
// Получаем позиции 
  useEffect(() => {
    const fetchPositions = async () =>{
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/users/positions/');
        setPositions(response.data);
      } catch (error){
        console.error('Ошибка при получении списка позиций: ', error)
      }
    };
    fetchPositions();
  }, []);

// получаем департаменты
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/users/departments/');
        setDepartments(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка департаментов:', error);
      }
    };
    fetchDepartments();
  }, []);

  const handleDepartment = (e)=>{
    setСhangeDepartment(e.target.value);
  }
  const handlePosition = (e)=>{
    setСhangePosition(e.target.value);
  }
    
  // Функция для обработки отправки формы
 const handleFormSubmit = async (event) => {
  event.preventDefault();
  const isValidName = handleFullName(event.target.full_name.value);
  setLocalErrors(prevErrors => ({ ...prevErrors, full_name: isValidName }));

  const isValidPersonalTel = handleTel(event.target.phone_number_personal.value, 'phone_number_personal');
  setLocalErrors(prevErrors => ({ ...prevErrors, phone_number_personal: isValidPersonalTel }));

  const isValidWorkTel = handleTel(event.target.phone_number_work.value, 'phone_number_work');
  setLocalErrors(prevErrors => ({ ...prevErrors, phone_number_work: isValidWorkTel }));
  
  const isDepartmentValid = handleEmptyField(changeDepartment);
  setLocalErrors(prevErrors => ({ ...prevErrors, department: isDepartmentValid }));

  const isPositionValid = handleEmptyField(changePosition);
  setLocalErrors(prevErrors => ({ ...prevErrors, position: isPositionValid }));

  const isValidEmail = handleEmailValid(event.target.email.value);
  setLocalErrors(prevErrors => ({ ...prevErrors, email: isValidEmail }));

  const isPasswordMatch = handlePasswordMatch(event.target.password.value, event.target.password_confirm.value);
  setLocalErrors(prevErrors => ({ ...prevErrors, password_confirm: isPasswordMatch }));

  const isPasswordValid = handlePasswordValid(event.target.password.value);
  setLocalErrors(prevErrors => ({ ...prevErrors, password: isPasswordValid }));
  
  if (isValidName || isValidPersonalTel || isValidWorkTel || isDepartmentValid || isPositionValid || isValidEmail || isPasswordMatch || isPasswordValid) {
    return; 
  }
  const formData = new FormData(event.target);
  formData.append('department', changeDepartment);
  formData.append('position', changePosition);

  const formDataObject = {};
    formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log(formData)
  console.log(formDataObject)

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/users/registration/', formData);
    console.log(response.data);
    navigate( '/login'); 
    event.target.reset(); 


  } catch (error) {
    console.error('Error sending data to backend:', error);
    setServerErrors(error.response.data);
  }
}
  return (
    <StyledRegistration>
      <CardForm title="Регистрация">
        <Form onFormSubmit={handleFormSubmit} >
          <TextField
            variant="outlined"
            id="full_name"
            placeholder="Иванов Иван Иванович"
            label="Введите ваше ФИО"
            name="full_name"
            error={!!localErrors.full_name}
            helperText={localErrors.full_name || ''}
          />
          <div className="registration-group">
            <InputMask mask="+79999999999" maskChar=" " defaultValue="" onChange={() => {}}>
            {() =>
            <TextField 
              variant="outlined" 
              id="personal-tel" 
              label="Личный телефон" 
              type="tel" 
              name='phone_number_personal'
              error={!!localErrors.phone_number_personal || !!serverErrors.phone_number_personal}
              helperText={localErrors.phone_number_personal  || serverErrors.phone_number_personal || ''}
            />}
            </InputMask>
            <InputMask mask="+79999999999" maskChar=" " defaultValue="" onChange={() => {}}>
            {() =>
             <TextField 
              variant="outlined" 
              id="work-tel" 
              label="Рабочий телефон" 
              type="tel" 
              name='phone_number_work'  
              error={!!localErrors.phone_number_work  || !!serverErrors.phone_number_work}
              helperText={localErrors.phone_number_work  || serverErrors.phone_number_work || ''}
            />}
            </InputMask>
          </div>
          
          <FormControl variant="outlined" fullWidth 
              error={!!localErrors.position}>
            <InputLabel id="position">Позиция</InputLabel>
            <Select
              labelId="position"
              id="demo-simple-select"
              label="Позиция"
              onChange={handlePosition}
              value={changePosition} 
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
          <FormControl variant="outlined" fullWidth
          
          error={!!localErrors.department}>
            <InputLabel id="department">Департамент</InputLabel>
            <Select
              labelId="department"
              id="demo-simple-select"
              label="Департамент"
              onChange={handleDepartment}
              value={changeDepartment} 
            > 
              {departments.map((item, i) => (
                <MenuItem value={item.id} key={i}>{item.department}</MenuItem>
              ))}
            </Select>
            {!!localErrors.department && (
             <FormHelperText>{localErrors.department}</FormHelperText>
            )}
          </FormControl> 

          <TextField 
            variant="outlined" 
            id="email" 
            label="Email" 
            placeholder="example@domain.ru" 
            type="email" 
            name="email"
            error={!!localErrors.email || !!serverErrors.email}
            helperText={localErrors.email  || serverErrors.email || ''}
          />
          <TextField 
            variant="outlined" 
            id="password" 
            label="Введите пароль" 
            placeholder="password" 
            type="password" 
            name='password'
            error={!!localErrors.password || !!serverErrors.password}
            helperText={localErrors.password || serverErrors.password || ''}
          />
          <TextField
            variant="outlined" 
            id="second-password" 
            label="Повторите пароль"
            placeholder="password" 
            type="password" 
            name='password_confirm'
            error = {!!localErrors.password_confirm || !!serverErrors.non_field_errors}
            helperText={localErrors.password_confirm || serverErrors.non_field_errors || ''}
          />
          <Button variant="contained" type="submit">Зарегистироваться</Button>
        </Form>
      </CardForm>
    </StyledRegistration>
  );
}

export default Registration;
