import { useNavigate } from 'react-router-dom'
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import React, { useEffect, useReducer, useState } from "react";
import {Button, IconButton,  Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { SpanBold } from "../../../style/settings.styles";
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import axios from "axios";
import {clientsReducer, INITIAL_STATE } from './Clients.state';
import EditModal from "../../../components/EditModal/EditModal"; // Импортируем компонент модального окна
import StyledTableCell from '../../../style/settings.styles';
// Создаем новый стилизованный компонент на основе TableCell


export const Clients = ({setStepper, onSelectRow }) => {
  const [{ clientsData, sortDirection, activeColumn, cities, selectedRow, isModalOpen, activeStep, completed }, dispatch] = useReducer(clientsReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchCity, setSearchCity] = useState('');

  // выводим в таблицу все компании и города в приличном виде 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/login'); 
          return;
        }

        const [clientsRes, citiesRes] = await Promise.all([
          axios.get('http://145.239.84.6/api/v1/clients/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }),
          axios.get('http://145.239.84.6/api/v1/city', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          })
        ]);

        const clients = clientsRes.data;
        const citiesData = citiesRes.data.reduce((acc, city) => {
          acc[city.id] = city.city;
          return acc;
        }, {});
        dispatch({ type: 'setClientsData', payload: clients });
        dispatch({ type: 'setCities', payload: citiesData });
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); 
        }
      } finally {
        dispatch({ type: 'setLoading', payload: false });
      }
    };
    fetchData();
  }, [navigate]);


// функция, которая меняет порядок сортировки
  const handleSort = (column) => {
    if (column === activeColumn) {
      dispatch({ type: 'setSortDirection', payload: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      dispatch({ type: 'setActiveColumn', payload: column });
      dispatch({ type: 'setSortDirection', payload: 'asc' });
    }
  };
  const renderCityName = (cityId) => {
    return cities[cityId] || ''; // Если для данного id нет города, вернем пустую строку
  };

  // rename 
  const handleRenameClick = (row) => {
    dispatch({ type: 'setSelectedRow', payload: row }); // Устанавливаем выбранную строку
    dispatch({ type: 'setIsModalOpen', payload: true }); // Открываем модальное окно
  };

  const handleDeleteClick = async (itemId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/login'); 
        return;
      }
      await axios.delete(`http://145.239.84.6/api/v1/clients/delete/${itemId}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json' 
        }
      });
  
      // После успешного удаления обновляем данные
      dispatch({ type: 'setClientsData', payload: clientsData.filter(item => item.id !== itemId) });
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleTableRowClick = (row) => {
    onSelectRow(row);
    dispatch({ type: 'setSelectedRow', payload: row }); // Устанавливаем выбранную строку
    setStepper(1); // Переходим на второй шаг степера
  };
  
//отсортированный массив данных
  const sortedClientsData = clientsData.sort((a, b) => {
    const columnA = a[activeColumn]?.toString();
    const columnB = b[activeColumn]?.toString();
    if (columnA && columnB) {
      return sortDirection === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
    } else {
      return 0;
    }
  });
  
  const filteredClientsData = sortedClientsData.filter(item => {
   const clientNameMatches = item.client_name.toLowerCase().includes(searchName);
   const cityNameMatches = renderCityName(item.destination_city).toLowerCase().includes(searchCity);
   return clientNameMatches && cityNameMatches;
 });


const handleModalClose = () => {
    
  dispatch({ type: 'setIsModalOpen', payload: false });
  dispatch({ type: 'setSelectedRow', payload: null });
// Сбросить selectedRow при закрытии модального окна
};


const handleModalSave = async (newValues) => {
  try {
    // Выполняем запрос на изменение данных с помощью axios
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      navigate('/login'); 
      return;
    }

    if (selectedRow) {
      const response = await axios.patch(`http://145.239.84.6/api/v1/clients/${selectedRow.id}/`, newValues, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
        
      });
      // Обновляем данные после успешного изменения
      dispatch({ type: 'setClientsData', payload: clientsData.map(item => (item.id === selectedRow.id ? response.data : item)) });
    } else {
      // Иначе, если selectedRow равен null, значит, мы пытаемся создать новую компанию
      const response = await axios.post(`http://145.239.84.6/api/v1/clients/`, newValues, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      // Добавляем новую компанию в список клиентов

      dispatch({ type: 'setClientsData', payload: [...clientsData, response.data] });
    }
    dispatch({ type: 'setIsModalOpen', payload: false });// Закрываем модальное окно
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

const findName = (text) => {
 setSearchName(text.toLowerCase());
};


const findCity = (text) => {
 setSearchCity(text.toLowerCase());
};
return (
<CardWrapper 
borderRadius="medium" 
width="medium" 
padding="32px 28px">
  <Grid 
  container 
  justifyContent="space-between">
    <Grid item>
      <TextField
      label="Название"
      variant="outlined"
      onChange={(e) => findName(e.target.value)}
      />
    </Grid>
    <Grid item sx={{ marginLeft: 2 }}>
      <TextField
      label="Город"
      variant="outlined"
      onChange={(e) => findCity(e.target.value)}
      />
    </Grid>
    <Grid item sx={{ marginLeft: 'auto' }}>
      <Button
      variant="outlined"
      onClick={() => dispatch({ type: 'setNewClients'})}
      color="primary"
      >
        + Компания
      </Button>
    </Grid>
  </Grid>
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ width: '30%' }}>
          <SpanBold>Компания</SpanBold>  
          </TableCell>
          <TableCell sx={{ width: '30%' }}>
            <TableSortLabel
              active={activeColumn === 'destination_city'}
              direction={sortDirection}
              onClick={() => handleSort('destination_city')}>
              Город
            </TableSortLabel>
          </TableCell>
          <TableCell sx={{ width: '30%' }}>
            <TableSortLabel
              active={activeColumn === 'contract_number'}
              direction={sortDirection}
              onClick={() => handleSort('contract_number')}>
              № договора
            </TableSortLabel>
          </TableCell>
          <TableCell sx={{ width: '5%' }} />
          <TableCell sx={{ width: '5%' }} />
        </TableRow>
      </TableHead>
      <TableBody>
      {filteredClientsData.map((item, index) => (
          <TableRow 
          hover 
          role="checkbox" 
          tabIndex={-1} 
          key={item.id}
          onClick={() => handleTableRowClick(item)}
          >
            <TableCell>{item.client_name}</TableCell>
            <TableCell>{renderCityName(item.destination_city)}</TableCell>
            <TableCell>{item.contract_number}</TableCell>
            <StyledTableCell onClick={(e) => { e.stopPropagation(); handleRenameClick(item); }}>
            <IconButton aria-label="create" >
                <CreateIcon fontSize="small" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell
            onClick={(e) => {
             e.stopPropagation();
             handleDeleteClick(item.id);
             }}>
              <IconButton aria-label="delete" >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <EditModal
      isOpen={isModalOpen}
      onClose={handleModalClose}
      onSave={handleModalSave}
      rowData={selectedRow}
      cities={cities}
      isCreating={!selectedRow} />
  </CardWrapper> 
  );
};
