import styled from 'styled-components';
import { widths, borderRadius } from '../../theme/theme';

const StyledCardWrapper = styled.div`
  padding: ${(props) => props.$padding || '0px'};
  background-color: #fff;
  border-radius: ${(props) =>  (borderRadius[props.$bdrd] || '24px')};
  box-shadow: 0px 8px 20px 0px #0000000F;
  max-width: ${({ width }) => widths[width] || '440px'}; 
  margin: auto;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  gap: 24px;
  margin-bottom: ${(props) => props.$marginBottom || '0px'};
`;

export default StyledCardWrapper;
