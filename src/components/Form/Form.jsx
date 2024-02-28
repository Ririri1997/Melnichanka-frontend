import StyledForm from "./Form.styles";

function Form({className, children, onFormSubmit}) {
  let cn = className ? `${className} form` : 'form';

  return (
    <StyledForm className={cn} onSubmit={onFormSubmit} noValidate>
      {children}
     </StyledForm>
  );
}

export default Form;
