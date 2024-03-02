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
}, []);


const getSession = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/users/session/', {
      credentials: "include",
    })
    if (response.ok) {
      const data = await response.json();
      setIsAuthenticated(data.isAuthenticated);
      console.log(data)
    } else {
      console.log('Failed to get session:', response.status);
    }
  } catch (error) {
    console.error('Error getting session:', error);
  }
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
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    console.log(response)

    if (response.ok) {
      setIsAuthenticated(true);
      setServerErrors({});
      console.log(response);
    } else {
      const errorData = await response.json();
      setServerErrors({ error: errorData.detail });
      setIsAuthenticated(false);
      console.log(errorData);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    setServerErrors({});
    setIsAuthenticated(false);
  }
};


const logout = async (event) => {
 event.preventDefault();
 try {
   const response = await fetch('http://127.0.0.1:8000/api/v1/users/logout/', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     credentials: 'include'
   });
   
   if (response.ok) {
     cookies.remove('isAuthenticated');
     setIsAuthenticated(false);
     setServerErrors({});
   } else {
     const errorData = await response.json();
     console.log(errorData);
     cookies.remove('isAuthenticated');
     setServerErrors({});
     setIsAuthenticated(false);
   }
 } catch (error) {
   console.error('Error logout:', error);
   setServerErrors({});
   setIsAuthenticated(true);
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
            onChange={handleUserEmailChange}
          />
          <TextField 
            variant="outlined" 
            id="password" 
            label="Введите пароль" 
            placeholder="password" 
            type="password" 
            name='password'
            error={!!serverErrors.error}
            helperText={serverErrors.error || ''}
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
    <Button onClick={logout} variant="contained" type="submit">Выйти </Button>
    </CardForm>
  </StyledAuthorization>
  );
}
}

export default Authorization;