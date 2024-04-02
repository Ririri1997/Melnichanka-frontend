import axios from "axios";
import {useState, useReducer, useEffect} from "react";
import StyledLogin  from "./Login.styles";
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import Form from '../../../components/Form/Form';
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {useLocation, useNavigate } from 'react-router-dom'
import {formReducer, INITIAL_STATE } from './Login.state';


const Login = () => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValidText, values, isFormReadyToSubmit} = formState;
  const [serverErrors, setServerErrors] = useState({});
  const [localErrors, setLocalErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => { // Вызываем валидацию при первой загрузке компонента
    dispatchForm({type: 'SUBMIT', values});
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз после монтирования


  const fromPage = location.state?.from?.pathname || '/'
	

  const onChange =(e) => {
    dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
    dispatchForm({type: 'SUBMIT', values: {...values, [e.target.name]: e.target.value}});
  };

  const submit = async (e) => {
    e.preventDefault(); // Предотвращаем дефолтное поведение отправки формы

    const user = {
      email: values.email,
      password: values.password
    };

    setLocalErrors(prevErrors => ({ ...prevErrors, email: isValidText.email}));
    setLocalErrors(prevErrors => ({ ...prevErrors, password: isValidText.password}));
  
    if (!isFormReadyToSubmit) {
      return;
    }
  
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/api/v1/users/login/', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      }, {
        withCredentials: true
      });
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
      navigate(fromPage, { replace: true });

    } catch (error) {
      // console.error('An error occurred while logging in:', error);
      setServerErrors({ error: error.response.data.detail })
    }
  }

  return(
    <StyledLogin>
      <CardWrapper title='Авторизация' padding='48px 32px'>
        <Form onFormSubmit={(e) => {submit(e)}}>
          <TextField 
            variant="outlined" 
            id="email" 
            label="Логин" 
            placeholder="email" 
            name="email"
            onChange={onChange}
            error={!!localErrors.email|| !!serverErrors.email}
            helperText={localErrors.email  || serverErrors.email || ''}
          
          />
          <TextField 
            variant="outlined" 
            id="password" 
            label="Введите пароль" 
            placeholder="password" 
            type="password" 
            name='password'
            onChange={onChange}
            error={!!localErrors.password || !!serverErrors.error}
            helperText={localErrors.password || serverErrors.error || ''}
          
          />
          <Button variant="contained" type="submit">Войти</Button>
        </Form>
      </CardWrapper>
    </StyledLogin>
  )
}

export default Login;

