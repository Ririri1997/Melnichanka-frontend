import React, { useEffect, useState } from "react";
import axios from "axios";
import CardForm from '../../../components/CardForm/CardForm';
import Button from "@mui/material/Button";
import {useNavigate } from 'react-router-dom'


export const Home = () => {
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate( '/login'); 
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
          navigate( '/login'); 
        }
      }
    };

    fetchHomeData();
  }, [navigate]);

  return (
    <CardForm title={`Hi ${message}`}>
      <p> Этот текст видят только авторизованные людишки</p>
        <Button variant="contained" href="/logout">Дохлебывай и уходи</Button>
        
      </CardForm>

  );
};
