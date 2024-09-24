import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { clientsReducer, INITIAL_STATE } from "./Goods.state";
import { DataGrid } from "@mui/x-data-grid";
import { PREFIX } from "../../../helpers/API";
import { getAccessToken } from "../../../utils/authService";


export const Goods = ({ onCompleteStep, onSelectRow }) => {
  const [state, dispatch] = useReducer(clientsReducer, INITIAL_STATE);
  const { goodsData, searchFlourName, searchBrand, selectedRows } = state;

  const navigate = useNavigate();
  const goodsDataRef = useRef(goodsData);
  const [filteredGoodsData, setFilteredGoodsData] = useState([]);

  useEffect(() => {
    goodsDataRef.current = goodsData;
    setFilteredGoodsData(goodsData); // При загрузке данных устанавливаем отфильтрованные данные
    
  }, [goodsData, selectedRows]);
  console.log(goodsData); // Логирование selectedRows при обновлении goodsData

  const accessToken = getAccessToken();
  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          navigate("/login");
          return;
        }
        const { data } = await axios.get(`${PREFIX}goods/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        const updatedData = data.map((item) => ({
          ...item,
          discount: item.discount ?? 0,
          quantity: 0,
        }));
        dispatch({ type: "setGoodsData", payload: updatedData });
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      } finally {
        dispatch({ type: "setLoading", payload: false });
      }
    };
    fetchData();
  }, [navigate, accessToken]);

  // Фильтрация данных
  useEffect(() => {
    const applyFilters = () => {
      const filteredData = goodsDataRef.current.filter((item) => {
        const goodsFlourName = item.flour_name.toLowerCase().includes(searchFlourName);
        const goodsBrand = item.brand.toLowerCase().includes(searchBrand);
        return goodsFlourName && goodsBrand;
      });
      setFilteredGoodsData(filteredData); // Обновляем отфильтрованные данные
    };

    applyFilters(); // Вызываем фильтрацию при загрузке компонента
  }, [searchFlourName, searchBrand]);

  // Поиск по сорту и бренду
  const findFlourName = (text) => {
    dispatch({ type: "setSearchFlourName", payload: text.toLowerCase() });
  };

  const findBrand = (text) => {
    dispatch({ type: "setSearchBrand", payload: text.toLowerCase() });
  };

  // Выбор строк
  const handleRowSelection = (newSelection) => {
    const selectedRowData = newSelection.selectionModel.map((id) =>
      goodsDataRef.current.find((row) => row.id === id)
    );
    console.log(selectedRowData);
    dispatch({ type: "setSelectedRows", payload: selectedRowData });
  };
  // Отправка данных
  const handleButtonClick = () => {
    const rowsToSend = selectedRows.map((row) => ({
      ...row,
      discount: row.discount,
      quantity: row.quantity,
    }));

    onSelectRow(rowsToSend);
    onCompleteStep();
  };

  // Колонки в таблице
  const columns = [
    {
      field: "flour_name",
      headerName: "Сорт",
      width: 150,
    },
    {
      field: "brand",
      headerName: "Бренд",
      width: 153,
    },
    {
      field: "package",
      headerName: "Тип фасовки",
      width: 108,
      sortable: false,
    },
    {
      field: "price",
      headerName: "Цена",
      sortable: false,
      width: 108,
    },
    {
      field: "quantity",
      headerName: "Количество",
      type: "number",
      sortable: false,
      editable: true,
      width: 108,
    },
    {
      field: "discount",
      headerName: "Скидка",
      type: "number",
      sortable: false,
      editable: true,
      width: 108,
    },
  ];

  // Обработчик изменения ячеек
  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    const updatedGoodsData = goodsData.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    dispatch({ type: "setGoodsData", payload: updatedGoodsData });
  };

  return (
    <CardWrapper borderRadius="medium" width="medium" padding="32px 28px">
      <Grid container spacing={2} alignItems="center" sx={{ height: '100px' }}>
        <Grid item>
          <TextField
            label="Сорт"
            variant="outlined"
            onChange={(e) => findFlourName(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Бренд"
            variant="outlined"
            onChange={(e) => findBrand(e.target.value)}
          />
        </Grid>
        <Grid item sx={{ marginLeft: "auto" }}>
          <Button variant="outlined" onClick={handleButtonClick} color="primary">
            Отправить
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%', marginTop: 16 }}>
        <DataGrid
          rows={filteredGoodsData}
          columns={columns}
          pageSize={6}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
           onSelectRow(newSelection);
          }}
          onCellEditCommit={handleCellEditCommit}
          onRowModesModelChange={(rowModesModel, details) => {
           console.log('Row modes model changed:', rowModesModel);
           console.log(details);
         }}
        />
      </div>
    </CardWrapper>
  );
};
export default Goods;