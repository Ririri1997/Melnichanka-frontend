import StyledCardWrapper  from './CardWrapper.styles'
import TitleMedium from '../../style/settings.styles';

function CardWrapper({title, children, width }) {
  return (
    <StyledCardWrapper width={width}>
      <TitleMedium>{title}</TitleMedium>
      {children}
    </StyledCardWrapper>
  );
}

export default CardWrapper;
