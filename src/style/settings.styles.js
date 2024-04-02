import styled from 'styled-components'

import TableCell from '@mui/material/TableCell';
import {styled as styledMui } from '@mui/system';

export const TitleMedium = styled.span`
  font-family: "Gabriela", serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 46px;
  letter-spacing: 0em;
  text-align: center;
`


export const SpanBold = styled.span`
  font-family: "Roboto", serif;
  font-size: 14px;
  font-weight: 900;
  line-height: 24px;
  text-align: center;
`


// Создаем новый стилизованный компонент на основе TableCell
 const StyledTableCell = styledMui(TableCell)`
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
`;
export default StyledTableCell