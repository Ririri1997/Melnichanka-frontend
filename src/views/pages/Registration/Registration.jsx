import StyledRegistration from "./Registration.styles";
import CardForm from "../../../components/CardForm/CardForm";
import Form from "../../../components/Form/Form";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from 'axios';
import InputMask from 'react-input-mask';


function Registration() {
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [changeDepartment, setСhangeDepartment] = useState('');
  const [changePosition, setСhangePosition] = useState('');
  const [localErrors, setLocalErrors] = useState({
  });
  const [serverErrors, setServerErrors] = useState({});
// Получаем позиции 
  useEffect(() => {
    const fetchPositions = async () =>{
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/positions/');
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
        const response = await axios.get('http://127.0.0.1:8000/api/departments/');
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
    

const handleTel = (value, name) => {
  const errorText = value.length < 12 ? "Введите номер телефона" : false;
  setLocalErrors(prevErrors => ({ ...prevErrors, [name]: errorText }));
  return !errorText; 
}
const handleEmptyField = (value, name) => {
  const errorText = value.length === 0 ? "Это поле обязательно к заполнению" : false;
  setLocalErrors(prevErrors => ({ ...prevErrors, [name]: errorText }));
  return !errorText; 
}
const handleName = (nameValue) => {
  let fullName = nameValue.trim().replace(/\s+/g, ' ');
  const errorText = fullName.split(' ').length !== 3 ? 'Введите полное имя' : false;
  setLocalErrors(prevErrors => ({ ...prevErrors, full_name: errorText }));
  return !errorText;
}

const handlepasswordMatch = (passwordOne, passwordTwo) =>{
  const errorText = passwordOne !== passwordTwo ? 'Пароли не совпадают' : false;
  setLocalErrors(prevErrors => ({ ...prevErrors, password_confirm: errorText }));

}
const handlepasswordValid = (password) => {
  let errorText = '';

  if (password.length < 8) {
    errorText = 'Пароль должен содержать минимум 8 символов';
  } else if (!/\d/.test(password)) {
    errorText = 'Пароль должен содержать хотя бы одну цифру';
  } else if (!/[a-zA-Zа-яА-Я]/.test(password)) {
    errorText = 'Пароль должен содержать хотя бы одну букву';
  } else {
    errorText = false; 
  }

  setLocalErrors(prevErrors => ({ ...prevErrors, password: errorText }));
}

const handleEmailValid = (email) => {
  const errorText = !email.includes('@') ? 'Поле должно содержать знак @' : false;
  setLocalErrors(prevErrors => ({ ...prevErrors, email: errorText }));

}

  // Функция для обработки отправки формы
 const handleFormSubmit = async (event) => {
  event.preventDefault();
 // проверка на валидность фио
  const isValidName = handleName(event.target.full_name.value);
  const isValidPersonalTel = handleTel(event.target.phone_number_personal.value, 'phone_number_personal');
  const isValidWorkTel = handleTel(event.target.phone_number_work.value, 'phone_number_work');
  const isValidEmptyEmail = handleEmptyField(event.target.email.value, 'email');
  const isValidEmail = handleEmailValid(event.target.email.value);
  const isPasswordMatch = handlepasswordMatch(event.target.password.value, event.target.password_confirm.value);
  const isPasswordValid = handlepasswordValid(event.target.password.value);
  if (!isValidName && !isValidPersonalTel && !isValidWorkTel && !isValidEmptyEmail && !isValidEmail && !isPasswordMatch && !isPasswordValid) {
    return; 
  }
  const formData = new FormData(event.target);
  formData.append('department', changeDepartment);
  formData.append('position', changePosition);

  const formDataObject = {};
    formData.forEach((value, key) => {
    formDataObject[key] = value;
  });
  console.log(formDataObject);
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/registration/', formData);
    console.log(response.data);
  } catch (error) {
    console.error('Error sending data to backend:', error);
    setServerErrors(error.response.data);
  }
}
console.log(localErrors, serverErrors)
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
          
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="position">Позиция</InputLabel>
            <Select
              labelId="position"
              id="demo-simple-select"
              label="Позиция"
              onChange={handlePosition}
              value={changePosition} 
            > 
              {positions.map((item, i) => (
                <MenuItem value={item.id} key={i}>{item.position}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" fullWidth>
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
