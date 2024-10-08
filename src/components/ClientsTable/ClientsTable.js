import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import StyledTableCell from "../../style/settings.styles";
import { useDispatch, useSelector } from "react-redux";
import { clientsActions } from "../../store/slice/clients.slice";
import { getAccessToken } from "../../utils/authService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ClientTable = ({
  clientsData,
  sortDirection,
  activeColumn,
  onCompleteStep
}) => {
  const { searchCriteria } = useSelector((state) => state.clients);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // Сортируем данные клиентов
  const sortedClientsData = [...clientsData].sort((a, b) => {
    const columnA = a[activeColumn]?.toString() || "";
    const columnB = b[activeColumn]?.toString() || "";
    if (columnA && columnB) {
      return sortDirection === "asc"
        ? columnA.localeCompare(columnB)
        : columnB.localeCompare(columnA);
    } else {
      return 0;
    }
  });

  // Фильтрация данных на основе одного или двух поисковых критериев
  const filteredClientsData = sortedClientsData.filter((item) => {
    const clientNameMatches = searchCriteria.name
      ? item.client_name.toLowerCase().includes(searchCriteria.name.toLowerCase())
      : true; // Если нет критериев для названия, показываем все
    
    const cityNameMatches = searchCriteria.city
      ? item.destination_city.toLowerCase().includes(searchCriteria.city.toLowerCase())
      : true; // Если нет критериев для города, показываем все

    return clientNameMatches && cityNameMatches; // Возвращаем совпадения для любого критерия
  });

  // Логика сортировки
  const handleSort = (column) => {
    if (column === activeColumn) {
      dispatch(
        clientsActions.setSortDirection(sortDirection === "asc" ? "desc" : "asc")
      );
    } else {
      dispatch(clientsActions.setActiveColumn(column));
      dispatch(clientsActions.setSortDirection("asc"));
    }
  };

  // Обработчик клика для переименования компании
  const handleRenameClick = (row) => {
    dispatch(clientsActions.setSelectedRow(row)); // Устанавливаем выбранную строку
    dispatch(clientsActions.setIsModalOpen(true)); // Открываем модальное окно
  };

  // Обработчик удаления компании
  const handleDeleteClick = async (itemId) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        navigate("/login");
        return;
      }
      await axios.delete(`clients/delete/${itemId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      // После успешного удаления обновляем данные
      dispatch(
        clientsActions.setClientsData(
          clientsData.filter((item) => item.id !== itemId)
        )
      );
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // Обработчик клика по строке таблицы
  const handleTableRowClick = (row) => {
    dispatch(clientsActions.setSelectedRow(row)); // Устанавливаем выбранную строку
    onCompleteStep();
  };

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Компания</TableCell>
          <TableCell>
            <TableSortLabel
              active={activeColumn === "destination_city"}
              direction={sortDirection}
              onClick={() => handleSort("destination_city")}
            >
              Город
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={activeColumn === "contract_number"}
              direction={sortDirection}
              onClick={() => handleSort("contract_number")}
            >
              № договора
            </TableSortLabel>
          </TableCell>
          <TableCell />
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredClientsData.map((item) => (
          <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={item.id}
            onClick={() => handleTableRowClick(item)}
          >
            <TableCell>{item.client_name}</TableCell>
            <TableCell>{item.destination_city}</TableCell>
            <TableCell>{item.contract_number}</TableCell>
            <StyledTableCell
              onClick={(e) => {
                e.stopPropagation();
                handleRenameClick(item);
              }}
            >
              <IconButton>
                <CreateIcon fontSize="small" />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(item.id);
              }}
            >
              <IconButton>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </StyledTableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
