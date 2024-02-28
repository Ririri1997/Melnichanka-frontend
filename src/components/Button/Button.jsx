import { StyledButton, StyledButtonDisabled } from "./Button.styles";

function Button({text, tag, type, href, disabled }) {
return (
  disabled ? (
    <StyledButtonDisabled tag={tag} type={type} href={href} disabled>
      {text}
    </StyledButtonDisabled>
  ) : (
    <StyledButton tag={tag} type={type} href={href}>
      {text}
    </StyledButton>
  )

  );
}

export default Button;
