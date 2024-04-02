import StyledTableCell from './Home.styles'
import React, { useEffect, useState } from "react";
import axios from "axios";
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import { useNavigate } from 'react-router-dom'
import {Button, Stepper, Step, StepButton, IconButton,  Grid, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { SpanBold } from "../../../style/settings.styles";
import EditModal from "../../../components/EditModal/EditModal"; // Импортируем компонент модального окна
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import Header from '../../containers/Header/Header';



function getSteps() {
  return ['Компании', 'Товары', 'Способ доставки', 'Скачивание'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Компании';
    case 1:
      return 'Товары';
    case 2:
      return 'Способ доставки';
    case 3:
      return 'Скачивание';
    default:
      return 'Unknown step';
  }
}

export const Home = () => {
  const [clientsData, setClientsData] = useState([]);
  const [sortDirection, setSortDirection] = useState('asc');
  const [activeColumn, setActiveColumn] = useState('destination_city'); // Установить начальное значение для activeColumn
  const [loading, setLoading] = useState(true); // Добавлено состояние для отслеживания загрузки данных
  const [cities, setCities] = useState({});
  const [selectedRow, setSelectedRow] = useState(null); // Состояние для отслеживания выбранной строки
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна
  const [userName, setUserName] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();
  const navigate = useNavigate();



// steppers 

const totalSteps = () => {
  return steps.length;
};

const completedSteps = () => {
  return Object.keys(completed).length;
};

const isLastStep = () => {
  return activeStep === totalSteps() - 1;
};

const allStepsCompleted = () => {
  return completedSteps() === totalSteps();
};

const handleNext = () => {
  const newActiveStep =
    isLastStep() && !allStepsCompleted()
      ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
      : activeStep + 1;
  setActiveStep(newActiveStep);
};


const handleStep = (step) => () => {
  setActiveStep(step);
};

const handleComplete = () => {
  const newCompleted = completed;
  newCompleted[activeStep] = true;
  setCompleted(newCompleted);
  handleNext();
};

  useEffect(() => {
    const datafetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');

      const {data} = await axios.get('http://127.0.0.1:8000/api/v1/users/edit/', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
      setUserName(data.full_name);
      } catch(error){
        console.log(error);
      }
    }
    datafetchData();
  }, [navigate] );

// функция, которая меняет порядок сортировки
  const handleSort = (column) => {
    if (column === activeColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setActiveColumn(column);
      setSortDirection('asc'); // Установка направления сортировки сразу после смены столбца
    }
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

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null); // Сбросить selectedRow при закрытии модального окна
  };
// принимаем id и выводим sity
  const renderCityName = (cityId) => {
    return cities[cityId] || ''; // Если для данного id нет города, вернем пустую строку
  };

  // rename 
  const handleRenameClick = (row) => {
    setSelectedRow(row); // Устанавливаем выбранную строку
    setIsModalOpen(true); // Открываем модальное окно
  };

  const handleDeleteClick = async (itemId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/login'); 
        return;
      }
  
      await axios.delete(`http://127.0.0.1:8000/api/v1/clients/delete/${itemId}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json' 
        }
      });
  
      // После успешного удаления обновляем данные
      setClientsData(clientsData.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  
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

console.log(selectedRow)

  const handleModalSave = async (newValues) => {
    try {
      // Выполняем запрос на изменение данных с помощью axios
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        navigate('/login'); 
        return;
      }
  
      if (selectedRow) {
        // Если selectedRow не равен null, значит, мы пытаемся обновить существующую компанию
        const response = await axios.patch(`http://127.0.0.1:8000/api/v1/clients/${selectedRow.id}/`, newValues, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
          
        });
        // Обновляем данные после успешного изменения
        setClientsData(clientsData.map(item => (item.id === selectedRow.id ? response.data : item)));
      } else {
        // Иначе, если selectedRow равен null, значит, мы пытаемся создать новую компанию
        const response = await axios.post(`http://127.0.0.1:8000/api/v1/clients/`, newValues, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        // Добавляем новую компанию в список клиентов
        setClientsData([...clientsData, response.data]);
      }
  
      setIsModalOpen(false); // Закрываем модальное окно
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <>
    <Header userName={userName}/>
    <CardWrapper borderRadius="medium" width="medium" marginBottom="20px" padding='24px 28px'> 
      <Stepper nonLinear activeStep={activeStep} style={{ width: '100%' }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </CardWrapper>
    <CardWrapper borderRadius="medium" width="medium" padding="32px 28px">
      <Grid container justifyContent="space-between">
        <Grid item>
          <TextField
            label="Название"
            variant="outlined"
            onChange={(e) => console.log(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ marginLeft: 2 }}>
          <TextField
            label="Город"
            variant="outlined"
            onChange={(e) => console.log(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ marginLeft: 'auto' }}>
          <Button
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
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
            {sortedClientsData.map((item, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
                <TableCell>{item.client_name}</TableCell>
                <TableCell>{renderCityName(item.destination_city)}</TableCell>
                <TableCell>{item.contract_number}</TableCell>
                <StyledTableCell onClick={() => handleRenameClick(item)}>
                <IconButton aria-label="create" >
                    <CreateIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell onClick={() => handleDeleteClick(item.id)}>
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
    </>
  );
};

// при клике на компанию мы переходим на другой шаг - ставится кнопка выполнено и нас переносит на товары 
// реализовать поиск по вводу символов или по кнопке
//хедер 
// 