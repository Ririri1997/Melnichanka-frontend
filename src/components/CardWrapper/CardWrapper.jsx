import StyledCardWrapper from './CardWrapper.styles';
import { TitleMedium } from '../../style/settings.styles';

function CardWrapper({ title, children, width, marginBottom, padding, borderRadius, justify, gap }) {
  return (
    <StyledCardWrapper $padding={padding} $bdrd={borderRadius} $marginBottom={marginBottom} width={width} $justify={justify} $gap={gap}>
      <TitleMedium>{title}</TitleMedium>
      {children}
    </StyledCardWrapper>
  );
}

export default CardWrapper;
