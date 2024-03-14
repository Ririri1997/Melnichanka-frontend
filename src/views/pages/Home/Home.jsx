import React, { useEffect, useState } from "react";
import axios from "axios";
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';

export const Home = () => {
  const [clientsData, setClientsData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeColumn, setActiveColumn] = useState('destination_city'); // Установить начальное значение для activeColumn
  const [loading, setLoading] = useState(true); // Добавлено состояние для отслеживания загрузки данных
  const [cities, setCities] = useState({});


  const navigate = useNavigate();


  const handleSort = (column) => {
    if (column === activeColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setActiveColumn(column);
      setSortDirection('asc'); // Установка направления сортировки сразу после смены столбца
    }
  };
  // http://127.0.0.1:8000/api/v1/city


  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/login'); 
          return;
        }

        const [clientsRes, citiesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/v1/clients/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }),
          axios.get('http://127.0.0.1:8000/api/v1/city', {
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

        setClientsData(clients);
        setCities(citiesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/login'); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const renderCityName = (cityId) => {
    return cities[cityId] || ''; // Если нет соответствия, вернуть пустую строку
  };

  const sortedClientsData = clientsData.sort((a, b) => {
    const columnA = a[activeColumn]?.toString();
    const columnB = b[activeColumn]?.toString();
    if (columnA && columnB) {
      return sortDirection === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
    } else {
      return 0;
    }
  });

  return (
    <CardWrapper title={`table hujable`}  width="medium">
      <Button variant="contained" href="/logout">Дохлебывай и уходи</Button>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: '30%' }}>
                Компания
              </TableCell>
              <TableCell  align="center" sx={{ width: '30%' }}>
                <TableSortLabel
                  active={activeColumn === 'destination_city'}
                  direction={sortDirection}
                  onClick={() => handleSort('destination_city')}>
                  Город
                </TableSortLabel>
              </TableCell>
              <TableCell align="center" sx={{ width: '30%' }}>
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
            {sortedClientsData.map((item, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                <TableCell align="center">{item.client_name}</TableCell>
                <TableCell align="center">{renderCityName(item.destination_city)}</TableCell>
                <TableCell align="center">{item.contract_number}</TableCell>
                <TableCell>Rename</TableCell>
                <TableCell>Trash</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardWrapper>
  );
};