import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from "react";
import { Grid, Button, TableContainer } from "@mui/material";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import { clientsActions } from "../../../store/slice/clients.slice";
import ClientTable from "../../../components/ClientsTable/ClientsTable";
import SearchForm from "../../../components/SearchForm/SearchForm";
import EditModal from "../../../components/EditModal/EditModal";
import { PREFIX } from "../../../helpers/API";
import { getAccessToken } from "../../../utils/authService";
import axios from "axios";

export const Clients = ({ onCompleteStep }) => {
  const dispatch = useDispatch();
  const { clientsData, searchCriteria, sortDirection, activeColumn, cities, selectedRow, isModalOpen } = useSelector(state => state.clients);
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  // Fetch clients and cities
  useEffect(() => {
    if (!accessToken) navigate("/login");
    const fetchData = async () => {
      try {
        const [clientsRes, citiesRes] = await Promise.all([
          axios.get(`${PREFIX}clients/`, { headers: { Authorization: `Bearer ${accessToken}` } }),
          axios.get(`${PREFIX}logistics/city/`, { headers: { Authorization: `Bearer ${accessToken}` } }),
        ]);
        const citiesData = citiesRes.data.reduce((acc, city) => ({ ...acc, [city.id]: city.city }), {});
        dispatch(clientsActions.setClientsData(clientsRes.data));
        dispatch(clientsActions.setCities(citiesData));
      } catch (error) {
        if (error.response?.status === 401) navigate("/login");
        console.error("Error fetching data:", error);
      } finally {
        dispatch(clientsActions.setLoading(false));
      }
    };
    fetchData();
  }, [navigate, accessToken, dispatch]);

  // Обработчик сортировки
  const handleSortChange = (column, direction) => {
    dispatch(clientsActions.setSortDirection(direction)); // Установка нового направления сортировки
    dispatch(clientsActions.setActiveColumn(column)); // Установка активного столбца для сортировки
  };


  // Modal handlers
  const handleModalClose = () => {
    dispatch(clientsActions.setIsModalOpen(false));
    dispatch(clientsActions.setSelectedRow(null));
  };

  const handleModalSave = async (newValues) => {
    const token = getAccessToken();
    if (!token) return navigate("/login");

    try {
      const request = selectedRow
        ? axios.patch(`${PREFIX}clients/${selectedRow.id}/`, newValues, { headers: { Authorization: `Bearer ${token}` } })
        : axios.post(`${PREFIX}clients/`, newValues, { headers: { Authorization: `Bearer ${token}` } });

      const { data } = await request;
      const updatedData = selectedRow
        ? clientsData.map((client) => (client.id === selectedRow.id ? data : client))
        : [...clientsData, data];

      dispatch(clientsActions.setClientsData(updatedData));
      handleModalClose();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  // Search fields for clients
  const searchFields = [
   { name: "name", label: "Название" },
   { name: "city", label: "Город" },
 ];
  return (
    <CardWrapper borderRadius="medium" width="medium" padding="32px 28px">
      <Grid container justifyContent="space-between" alignItems="center">
       
      <Grid item>
      <SearchForm
            searchFields={searchFields}
            searchCriteria={searchCriteria}
            setSearchCriteria={(criteria) => dispatch(clientsActions.setSearchCriteria(criteria))}
          />
          </Grid>
        
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dispatch(clientsActions.setNewClientModal())}
        >
          + Компания
        </Button>
        </Grid>
      </Grid>

      <TableContainer>
        <ClientTable
          clientsData={clientsData}
          sortDirection={sortDirection}
          activeColumn={activeColumn}
          onSortChange={handleSortChange}  // Передаем функцию сортировки
          onCompleteStep = {onCompleteStep}
        />
      </TableContainer>

      <EditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        rowData={selectedRow}
        cities={cities}
        isCreating={!selectedRow}
      />
    </CardWrapper>
  );
};

export default Clients;
