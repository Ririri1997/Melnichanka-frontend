import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import { goodsActions } from "../../../store/slice/goods.slice";
import { DataGrid } from "@mui/x-data-grid";
import { PREFIX } from "../../../helpers/API";
import { getAccessToken } from "../../../utils/authService";
import { useSelector, useDispatch } from "react-redux";
import SearchForm from "../../../components/SearchForm/SearchForm";

export const Goods = ({ onCompleteStep }) => {
 const dispatch = useDispatch();
 const { goodsData, searchCriteria, selectedRows } = useSelector(
  (state) => state.goods
 );
 const navigate = useNavigate();
 const goodsDataRef = useRef(goodsData);
 const [filteredGoodsData, setFilteredGoodsData] = useState([]);

 useEffect(() => {
  goodsDataRef.current = goodsData;
  setFilteredGoodsData(goodsData); // При загрузке данных устанавливаем отфильтрованные данные
 }, [goodsData]);

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
    dispatch(goodsActions.setGoodsData(updatedData));
   } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response && error.response.status === 401) {
     navigate("/login");
    }
   } finally {
    dispatch(goodsActions.setLoading(false));
   }
  };
  fetchData();
 }, [navigate, accessToken, dispatch]);

 // Фильтрация данных
 useEffect(() => {
  const applyFilters = () => {
   const { flourName, brand } = searchCriteria;

   const filteredData = goodsDataRef.current.filter((item) => {
    const matchesFlourName = item.flour_name
     .toLowerCase()
     .includes(flourName.toLowerCase());
    const matchesBrand = item.brand.toLowerCase().includes(brand.toLowerCase());
    return matchesFlourName && matchesBrand;
   });
   setFilteredGoodsData(filteredData); // Обновляем отфильтрованные данные
  };

  applyFilters(); // Вызываем фильтрацию при изменении параметров поиска
 }, [searchCriteria]);

 // Выбор строк
 const handleRowSelection = (newSelection) => {
  const selectedRowData = newSelection.map((id) =>
   goodsDataRef.current.find((row) => row.id === id)
  );
  dispatch(goodsActions.setSelectedRows(selectedRowData));
 };

 // Отправка данных
 const handleButtonClick = () => {
  const rowsToSend = selectedRows.map((row) => ({
   ...row,
   discount: row.discount,
   quantity: row.quantity,
  }));
  onCompleteStep();
 };

 // Поля для поиска
 const searchFields = [
  { name: "flourName", label: "Сорт" },
  { name: "brand", label: "Бренд" },
 ];

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
  dispatch(goodsActions.setGoodsData(updatedGoodsData));
 };

 return (
  <CardWrapper borderRadius="medium" width="medium" padding="32px 28px">
   <Grid container spacing={2} alignItems="center" sx={{ height: "100px" }}>
    <Grid item>
     <SearchForm
      searchFields={searchFields}
      searchCriteria={searchCriteria}
      setSearchCriteria={(criteria) =>
       dispatch(goodsActions.setSearchCriteria(criteria))
      }
     />
    </Grid>
    <Grid item sx={{ marginLeft: "auto" }}>
     <Button variant="outlined" onClick={handleButtonClick} color="primary">
      Отправить
     </Button>
    </Grid>
   </Grid>
   <div style={{ height: 400, width: "100%", marginTop: 16 }}>
    <DataGrid
     rows={filteredGoodsData}
     columns={columns}
     pageSize={6}
     checkboxSelection
     onRowSelectionModelChange={(newSelection) => {
      handleRowSelection(newSelection);
     }}
     onCellEditCommit={handleCellEditCommit}
    />
   </div>
  </CardWrapper>
 );
};

export default Goods;
