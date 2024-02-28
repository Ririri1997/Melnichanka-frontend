import styled from 'styled-components';

const StyledButton = styled(({ tag, ...rest }) => {
  const Tag = tag || 'div';
  return <Tag {...rest} />;
})`
  background: #58C256;
  padding: 16px;
  border-radius: 12px;
  font-family: 'Manrope';
  font-size: 15px;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: 0px;
  text-align: left;
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: center;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 250ms;

  &:hover, &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    background-color: #43B441;
    transition: 250ms;
  }
`;


const StyledButtonDisabled = styled(StyledButton)`
 color: #AAAAAA;
 background-color: #F2F2F2;
 &:hover{
  background-color: #F2F2F2;
 }
`
export { StyledButton, StyledButtonDisabled };
