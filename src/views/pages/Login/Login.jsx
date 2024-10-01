import { useState, useReducer, useEffect } from "react";
import StyledLogin from "./Login.styles";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import Form from "../../../components/Form/Form";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { formReducer, INITIAL_STATE } from "./Login.state";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/slice/authReducer.slice.js";

const Login = () => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValidText, values, isFormReadyToSubmit } = formState;
  const [serverErrors, setServerErrors] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const {jwt} = useSelector((s)=> s.user);
  useEffect(()=>{
   if(jwt){
    navigate('/');
    console.log(jwt);
   }
  }, [jwt, navigate]);



  useEffect(() => {
    dispatchForm({ type: "SUBMIT", values });
    setLocalErrors({
      email: isValidText.email,
      password: isValidText.password,
    });
  }, [values]);

  const fromPage = location.state?.from?.pathname || "/";


  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
    dispatchForm({
      type: "SUBMIT",
      values: { ...values, [e.target.name]: e.target.value },
    });
    setLocalErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: isValidText[e.target.name],
    }));
  };

  const submit = async (e) => {
   e.preventDefault();
   setLocalErrors({ email: isValidText.email, password: isValidText.password });
   if (!isFormReadyToSubmit) {
     console.log("Form is not ready to submit:", !isFormReadyToSubmit);
     return;
   }
   try {
    const disp = await dispatch(login(values)); 
      navigate(fromPage, { replace: true });
    } catch (error) {
     console.error("Error during login:", error);
     setServerErrors({ error: error.response?.data?.detail || 'Unknown error' });
   }
 };

 
  return (
    <StyledLogin>
      <CardWrapper title="Авторизация" padding="48px 32px">
        <Form onFormSubmit={submit}>
          <TextField
            variant="outlined"
            id="email"
            label="Логин"
            placeholder="email"
            name="email"
            onChange={onChange}
            error={!!localErrors.email || !!serverErrors.email}
            helperText={localErrors.email || serverErrors.email || ""}
          />
          <TextField
            variant="outlined"
            id="password"
            label="Введите пароль"
            placeholder="password"
            type="password"
            name="password"
            onChange={onChange}
            error={!!localErrors.password || !!serverErrors.error}
            helperText={localErrors.password || serverErrors.error || ""}
          />
          <Button variant="contained" type="submit">
            Войти
          </Button>
        </Form>
      </CardWrapper>
    </StyledLogin>
  );
};

export default Login;
