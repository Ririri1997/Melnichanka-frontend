import { useNavigate } from 'react-router-dom';
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import { Button, Grid, TextField } from '@mui/material';
import axios from "axios";
import { clientsReducer, INITIAL_STATE } from './Goods.state';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useReducer, useRef } from "react";

export const Goods = ({ onSelectRow }) => {
  const [state, dispatch] = useReducer(clientsReducer, INITIAL_STATE);
  const { goodsData, sortDirection, activeColumn, loading, activeStep, searchFlourName, searchBrand, selectedRows } = state;

  const navigate = useNavigate();
  const goodsDataRef = useRef(goodsData);

  useEffect(() => {
    goodsDataRef.current = goodsData;
  }, [goodsData]);

  const handleSort = (column) => {
    if (column === activeColumn) {
      dispatch({ type: 'setSortDirection', payload: sortDirection === 'asc' ? 'desc' : 'asc' });
    } else {
      dispatch({ type: 'setActiveColumn', payload: column });
      dispatch({ type: 'setSortDirection', payload: 'asc' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          navigate('/login');
          return;
        }

        const { data } = await axios.get('http://145.239.84.6/api/v1/goods/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const updatedData = data.map(item => ({
          ...item,
          sale: item.sale ?? 0
        }));

        dispatch({ type: 'setGoodsData', payload: updatedData });
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
  }, []);

  const sortedGoodsData = goodsData.sort((a, b) => {
    const columnA = a[activeColumn]?.toString();
    const columnB = b[activeColumn]?.toString();
    if (columnA && columnB) {
      return sortDirection === 'asc' ? columnA.localeCompare(columnB) : columnB.localeCompare(columnA);
    } else {
      return 0;
    }
  });

  const filteredGoodsData = sortedGoodsData.filter(item => {
    const goodsFlourName = item.flour_name.toLowerCase().includes(searchFlourName);
    const goodsBrand = item.brand.toLowerCase().includes(searchBrand);

    return goodsFlourName && goodsBrand;
  });

  const findFlourName = (text) => {
    dispatch({ type: 'setSearchFlourName', payload: text.toLowerCase() });
  };

  const findBrand = (text) => {
    dispatch({ type: 'setSearchBrand', payload: text.toLowerCase() });
  };

  const handleRowSelection = (ids) => {
    const selectedRowData = ids.map(id => goodsDataRef.current.find(row => row.id === id));
    dispatch({ type: 'setSelectedRows', payload: selectedRowData });
    dispatch({ type: 'setActiveStep', payload: 3 });
  };

  const handleButtonClick = () => {
    console.log(selectedRows);
  };

  const columns = [
    {
      field: 'flour_name',
      headerName: 'Сорт',
      width: 200,
    },
    {
      field: 'brand',
      headerName: 'Бренд',
      width: 153,
    },
    {
      field: 'package',
      headerName: 'Тип фасовки',
      type: 'number',
      width: 153,
      editable: false,
      sortable: false,
    },
    {
      field: 'price',
      headerName: 'Цена',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 108,
    },
    {
      field: 'sale',
      headerName: 'Скидка',
      type: 'number',
      sortable: false,
      editable: true,
      width: 108,
    },
  ];

  return (
    <CardWrapper borderRadius="medium" width="medium" padding="32px 28px">
      <Grid container>
        <Grid item>
          <TextField
            label="Сорт"
            variant="outlined"
            onChange={(e) => findFlourName(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ marginLeft: 2 }}>
          <TextField
            label="Бренд"
            variant="outlined"
            onChange={(e) => findBrand(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ marginLeft: 'auto' }}>
          <Button variant="outlined" onClick={handleButtonClick} color="primary">
            Отправить
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        rows={filteredGoodsData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        sx={{ width: '100%' }}
        disableColumnResize
        disableColumnMenu
        onRowSelectionModelChange={(ids) => handleRowSelection(ids)}
        onCellEditCommit={(params) => {
          const updatedRows = goodsData.map((row) =>
            row.id === params.id ? { ...row, sale: params.value } : row
          );
          dispatch({ type: 'setGoodsData', payload: updatedRows });
        }}
      />
    </CardWrapper>
  );
};