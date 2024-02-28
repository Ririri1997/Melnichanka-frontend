import React, { useState } from 'react';
import StyledAuthorization  from "./Authorization.styles";
import axios from 'axios';
import CardForm from '../../../components/CardForm/CardForm';
import Form from '../../../components/Form/Form';
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Authorization() { 
  const [serverErrors, setServerErrors] = useState({});
// Получаем позиции 

  // Функция для обработки отправки формы
 const handleFormSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);


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

  
  return (
    <StyledAuthorization>
      <CardForm title='Авторизация'>
        <Form onFormSubmit={handleFormSubmit}>
        
        <TextField 
            variant="outlined" 
            id="login" 
            label="Логин" 
            placeholder="login" 
            name="login"
            error={!!serverErrors.login}
            helperText={serverErrors.login || ''}
          />
          <TextField 
            variant="outlined" 
            id="password" 
            label="Введите пароль" 
            placeholder="password" 
            type="password" 
            name='password'
            error={!!serverErrors.password}
            helperText={serverErrors.password || ''}
          />
          <Button variant="contained" type="submit">Войти</Button>
        </Form>
      </CardForm>
    </StyledAuthorization>
  );
}

export default Authorization;

