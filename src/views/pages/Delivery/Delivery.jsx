import { useNavigate } from 'react-router-dom'
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import React, { useEffect, useReducer } from "react";
import {Button, IconButton,  Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, EditModal } from '@mui/material';
import { SpanBold } from "../../../style/settings.styles";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import StyledTableCell from '../../../style/settings.styles';
// Создаем новый стилизованный компонент на основе TableCell
import { DataGrid } from '@mui/x-data-grid';


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
        axios.get('http://145.239.84.6/api/v1/rwtrip/', {
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
 <p>Выбери что-то</p>
  </CardWrapper> 
  );
};
