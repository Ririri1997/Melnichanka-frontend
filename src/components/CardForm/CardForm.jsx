import StyledCardForm  from './CardForm.styles'
import TitleMedium from '../../style/settings.styles';

function CardForm({title, children}) {
  return (
    <StyledCardForm>
      <TitleMedium>{title}</TitleMedium>
      {children}
    </StyledCardForm>
  );
}

export default CardForm;
