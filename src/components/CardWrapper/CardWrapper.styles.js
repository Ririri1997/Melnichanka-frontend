import styled from 'styled-components';
import { widths } from '../../theme/theme'; // Импортируем значения ширины из темы

const CardWrapper = styled.div`
 padding: 48px 32px;
 background-color: #fff;
 border-radius: 24px;
 box-shadow: 0px 8px 20px 0px #00000026;
 max-width: ${({ width }) => widths[width] || '440px'}; 
 margin: auto;
 display: grid;
 grid-template-columns: 1fr;
 place-items: center;
 gap: 24px;
`
export default CardWrapper;