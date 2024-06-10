import axios from "axios";
import { useState, useReducer, useEffect } from "react";
import StyledLogin from "./Login.styles";
import CardWrapper from '../../../components/CardWrapper/CardWrapper';
import Form from '../../../components/Form/Form';
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from 'react-router-dom';
import { formReducer, INITIAL_STATE } from './Login.state';

const Login = () => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValidText, values, isFormReadyToSubmit } = formState;
  const [serverErrors, setServerErrors] = useState({});
  const [localErrors, setLocalErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatchForm({ type: 'SUBMIT', values });
  }, [values]);

  const fromPage = location.state?.from?.pathname || '/';

  const onChange = (e) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
    dispatchForm({ type: 'SUBMIT', values: { ...values, [e.target.name]: e.target.value } });
    setLocalErrors(prevErrors => ({ ...prevErrors, [e.target.name]: isValidText[e.target.name] }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setLocalErrors({ email: isValidText.email, password: isValidText.password });

    if (!isFormReadyToSubmit) return;

    try {
      const { data } = await axios.post('http://145.239.84.6/api/v1/users/login/', values, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      localStorage.clear();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      navigate(fromPage, { replace: true });
    } catch (error) {
      setServerErrors({ error: error.response.data.detail });
    }
  }

  return (
    <StyledLogin>
      <CardWrapper title='Авторизация' padding='48px 32px'>
        <Form onFormSubmit={submit}>
          <TextField
            variant="outlined"
            id="email"
            label="Логин"
            placeholder="email"
            name="email"
            onChange={onChange}
            error={!!localErrors.email || !!serverErrors.email}
            helperText={localErrors.email || serverErrors.email || ''}
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
  );
}

export default Login;
// import axios from "axios";
// import { useState, useReducer, useEffect } from "react";
// import StyledLogin from "./Login.styles";
// import CardWrapper from '../../../components/CardWrapper/CardWrapper';
// import Form from '../../../components/Form/Form';
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { formReducer, INITIAL_STATE } from './Login.state';

// const Login = () => {
//   const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
//   const { isValidText, values, isFormReadyToSubmit } = formState;
//   const [serverErrors, setServerErrors] = useState({});
//   const [localErrors, setLocalErrors] = useState({});
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     dispatchForm({ type: 'SUBMIT', values });
//   }, []);

//   const fromPage = location.state?.from?.pathname || '/';

//   const onChange = (e) => {
//     dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
//     dispatchForm({ type: 'SUBMIT', values: { ...values, [e.target.name]: e.target.value } });
//     setLocalErrors(prevErrors => ({ ...prevErrors, [e.target.name]: isValidText[e.target.name] }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     setLocalErrors({ email: isValidText.email, password: isValidText.password });

//     if (!isFormReadyToSubmit) return;

//     try {
//       const { data } = await axios.post('http://145.239.84.6/api/v1/users/login/', values, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//       });
//       localStorage.clear();
//       localStorage.setItem('access_token', data.access);
//       localStorage.setItem('refresh_token', data.refresh);
//       axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
//       navigate(fromPage, { replace: true });
//     } catch (error) {
//       setServerErrors({ error: error.response.data.detail });
//     }
//   }

//   return (
//     <StyledLogin>
//       <CardWrapper title='Авторизация' padding='48px 32px'>
//         <Form onFormSubmit={submit}>
//           <TextField
//             variant="outlined"
//             id="email"
//             label="Логин"
//             placeholder="email"
//             name="email"
//             onChange={onChange}
//             error={!!localErrors.email || !!serverErrors.email}
//             helperText={localErrors.email || serverErrors.email || ''}
//           />
//           <TextField
//             variant="outlined"
//             id="password"
//             label="Введите пароль"
//             placeholder="password"
//             type="password"
//             name='password'
//             onChange={onChange}
//             error={!!localErrors.password || !!serverErrors.error}
//             helperText={localErrors.password || serverErrors.error || ''}
//           />
//           <Button variant="contained" type="submit">Войти</Button>
//         </Form>
//       </CardWrapper>
//     </StyledLogin>
//   );
// }

// export default Login;
