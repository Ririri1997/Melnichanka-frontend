import { useNavigate } from 'react-router-dom'
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import React, { useEffect, useReducer } from "react";
import {FormControl, FormLabel,  RadioGroup, FormControlLabel, Radio, Button} from '@mui/material';
import axios from "axios";



export const Delivery = ({onSelectRow }) => {


const navigate = useNavigate();
  // const handleTableRowClick = (row) => {
  //   onSelectRow(row);
  //   dispatch({ type: 'setSelectedRow', payload: row }); // Устанавливаем выбранную строку
  //   dispatch({ type: 'setActiveStep', payload: 1 }); // Переходим на второй шаг степера
  // };

useEffect(() => {
  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/login'); 
        return;
      }

      const {data} = await 
        axios.get('http://145.239.84.6/api/v1/logistics/factories/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        })
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      if (error.response && error.response.status === 401) {
        navigate('/login'); 
      }
    } finally {
      console.log();
    }
  };
  fetchData();
}, []);



return (
<CardWrapper 
borderRadius="medium" 
width="medium" 
padding="32px 28px">
 <FormControl component="fieldset">
  <FormLabel component="legend">Выбери способ доставки</FormLabel>
  <RadioGroup aria-label="dilivery" name="dilivery" >
    <FormControlLabel value="self" control={<Radio />} label="Самовывоз" />
    <FormControlLabel value="auto" control={<Radio />} label="Авто" />
    <FormControlLabel value="train" control={<Radio />} label="ЖД" />
  </RadioGroup>
  
  <Button variant="contained" onClick={()=>{
   console.log('click');
  }} color="primary">
          {'Продолжить'}
        </Button>
</FormControl>
  </CardWrapper> 
  );
};
