import React, { useState, useEffect } from 'react';
import StyledAuthorization  from "./Authorization.styles";
// import axios from 'axios';
import CardForm from '../../../components/CardForm/CardForm';
import Form from '../../../components/Form/Form';
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Cookies from "universal-cookie";

const cookies = new Cookies();

function Authorization() { 
  const [serverErrors, setServerErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect( () =>{
  getSession();

}, [])
const getSession = () => {
  fetch('http://127.0.0.1:8000/api/v1/users/session/', {
    credentials: "same-origin",
  }).then((res) =>  res.json())
  .then((data) => {
    console.log(data);
    setIsAuthenticated(data.isAuthenticated);
  })
  .catch((err) => {
    console.log(err);
  });
}

const login = async (event) => {
  event.preventDefault();
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookies.get('csrftoken'),
      },
      credentials: 'same-origin',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.ok) {
      setIsAuthenticated(true);
      setServerErrors({});
    } else {
      const errorData = await response.json();
      setServerErrors(errorData);
      setIsAuthenticated(false);
      console.log(errorData)
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setServerErrors({});
    setIsAuthenticated(false);
  }
};



const handlePasswordChange = (event) => {
  setPassword(event.target.value);
}

const handleUserEmailChange = (event) => {
  setEmail(event.target.value);
}

if(!isAuthenticated){
  return (
    <StyledAuthorization>
      <CardForm title='Авторизация'>
        <Form onFormSubmit={login}>
        
        <TextField 
            variant="outlined" 
            id="email" 
            label="Логин" 
            placeholder="email" 
            name="email"
            error={!!serverErrors.login}
            helperText={serverErrors.login || ''}
            onChange={handleUserEmailChange}
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
            onChange={handlePasswordChange}
          />
          <Button variant="contained" type="submit">Войти</Button>
        </Form>
      </CardForm>
    </StyledAuthorization>
  );
} else { 
  return (
  <StyledAuthorization>
    <CardForm title='Вы авторизованы'>
    
    </CardForm>
  </StyledAuthorization>
  );
}
}

export default Authorization;

