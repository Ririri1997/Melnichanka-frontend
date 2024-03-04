import axios from "axios";
import {useState} from "react";
import StyledLogin  from "./Login.styles";
import CardForm from '../../../components/CardForm/CardForm';
import Form from '../../../components/Form/Form';
import {TextField } from "@mui/material";
import Button from "@mui/material/Button";




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverErrors, setServerErrors] = useState({});

  const submit = async e => {
    e.preventDefault();
    const user = {
      email: email,
      password: password
    };
    try{      
      const {data} = await axios.post('http://127.0.0.1:8000/api/v1/users/login/', user ,{
        headers: {
          'Content-Type': 'application/json'
        }
      }, {
        withCredentials: true
      });
      console.log(data)
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
      console.log(`Bearer ${data['access']}`)
      window.location.href = '/'
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
          />
          <TextField 
            variant="outlined" 
            id="password" 
            label="Введите пароль" 
            placeholder="password" 
            type="password" 
            name='password'
            error={!!serverErrors.error}
            helperText={serverErrors.error || ''}
            onChange={e => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">Войти</Button>
        </Form>
      </CardForm>
    </StyledLogin>
  )
}

export default Login;

