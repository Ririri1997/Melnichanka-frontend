import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import CardForm from '../../../components/CardForm/CardForm';
import Button from "@mui/material/Button";
export const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          window.location.href = '/login'; // Перенаправить пользователя на страницу входа, если токен доступа отсутствует
          return;
        }

        const response = await axios.get('http://127.0.0.1:8000/api/v1/home/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        setMessage(response.data.message);
      } catch (error) {
        console.error('Error fetching home data:', error);
        if (error.response && error.response.status === 401) {
          window.location.href = '/login'; // Перенаправить пользователя на страницу входа в случае ошибки 401 Unauthorized
        }
      }
    };

    fetchHomeData();
  }, []);

  return (
    <CardForm title={`Hi ${message}`}>
      <p> Этот текст видят только авторизованные людишки</p>
        <Button variant="contained" href="/logout">Дохлебывай и уходи</Button>
        
      </CardForm>

  );
};
