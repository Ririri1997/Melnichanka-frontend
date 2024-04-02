import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';

// Создаем новый стилизованный компонент на основе TableCell
 const StyledTableCell = styled(TableCell)`
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;
export default StyledTableCell