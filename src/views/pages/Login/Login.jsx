import axios from "axios";
import {useState} from "react";
import StyledLogin  from "./Login.styles";
import CardForm from '../../../components/CardForm/CardForm';
import Form from '../../../components/Form/Form';
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";
import {handleEmailValid,  handlePasswordValid} from '../../../utils/formValidations';
import {useLocation, useNavigate } from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverErrors, setServerErrors] = useState({});
  const [localErrors, setLocalErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location)

  const fromPage = location.state?.from?.pathname || '/'


  const submit = async e => {
    e.preventDefault();

    const isValidEmail = handleEmailValid(e.target.email.value);
    setLocalErrors(prevErrors => ({ ...prevErrors, email: isValidEmail }));
    
    const isPasswordValid = handlePasswordValid(e.target.password.value);
    setLocalErrors(prevErrors => ({ ...prevErrors, password: isPasswordValid }));
    
    const user = {
      email: email,
      password: password
    };
     
    if ( isValidEmail || isPasswordValid) {
      return; 
    }
    try{      
      const {data} = await axios.post('http://127.0.0.1:8000/api/v1/users/login/', user ,{
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
    }
    catch (error){
      console.error('An error occurred while logging in:', error);
      setServerErrors({ error: error.response.data.detail })
    }
  } 

  return(
    <StyledLogin>
      <CardForm title='Авторизация'>
        <Form onFormSubmit={submit}>
          <TextField 
            variant="outlined" 
            id="email" 
            label="Логин" 
            placeholder="email" 
            name="email"
            onChange={e=> setEmail(e.target.value)}
            error={!!localErrors.email || !!serverErrors.email}
            helperText={localErrors.email  || serverErrors.email || ''}
          
          />
          <TextField 
            variant="outlined" 
            id="password" 
            label="Введите пароль" 
            placeholder="password" 
            type="password" 
            name='password'
            onChange={e => setPassword(e.target.value)}
            error={!!localErrors.password || !!serverErrors.error}
            helperText={localErrors.password || serverErrors.error || ''}
          
          />
          <Button variant="contained" type="submit">Войти</Button>
        </Form>
      </CardForm>
    </StyledLogin>
  )
}

export default Login;

