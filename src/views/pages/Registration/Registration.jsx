import StyledRegistration from "./Registration.styles";
import CardWrapper from "../../../components/CardWrapper/CardWrapper";
import Form from "../../../components/Form/Form";
import {
 FormControl,
 InputLabel,
 Select,
 MenuItem,
 TextField,
 FormHelperText,
} from "@mui/material";
import React, { useEffect, useState, useReducer } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";
import { formReducer, INITIAL_STATE } from "./Registration.state";
import { saveTokens, clearTokens } from "../../../utils/authService";

import { PREFIX } from "../../../helpers/API";
function Registration() {

 const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
 const { isValidText, values, isFormReadyToSubmit } = formState;
 const [departments, setDepartments] = useState([]);
 const [positions, setPositions] = useState([]);
 const [localErrors, setLocalErrors] = useState({});
 const [serverErrors, setServerErrors] = useState({});
 const navigate = useNavigate();

 useEffect(() => {
  if (isFormReadyToSubmit) {
   dispatchForm({ type: "SUBMIT", values });
  }
 }, [isFormReadyToSubmit, values]);

 const onChange = (name, value) => {
  dispatchForm({ type: "SET_VALUE", payload: { [name]: value } });
  dispatchForm({ type: "SUBMIT", values: { ...values, [name]: value } });
 };

 useEffect(() => {
  const fetchPositions = async () => {
   try {
    const response = await axios.get(
     `${PREFIX}users/positions/`
    );
    setPositions(response.data);
   } catch (error) {
    console.error("Ошибка при получении списка позиций: ", error);
   }
  };
  fetchPositions();
 }, []);

 useEffect(() => {
  const fetchDepartments = async () => {
   try {
    const response = await axios.get(
      `${PREFIX}users/departments/`
    );
    setDepartments(response.data);
   } catch (error) {
    console.error("Ошибка при получении списка департаментов:", error);
   }
  };
  fetchDepartments();
 }, []);

 // Функция для обработки отправки формы
 const handleFormSubmit = async (event) => {
  event.preventDefault();

  onChange(event.target.name, event.target.value);

  // Устанавливаем локальные ошибки для каждого поля
  setLocalErrors((prevErrors) => ({
    ...prevErrors,
    full_name: isValidText.full_name,
    phone_number_personal: isValidText.phone_number_personal,
    phone_number_work: isValidText.phone_number_work,
    department: isValidText.department,
    position: isValidText.position,
    email: isValidText.email,
    password_confirm: isValidText.password_confirm,
    password: isValidText.password,
  }));

  // Проверка на готовность формы
  if (!isFormReadyToSubmit) {
    return;
  }

  try {
    // Отправляем данные регистрации
    const response = await axios.post(
      `${PREFIX}users/registration/`,
      values
    );

    // Авторизация после успешной регистрации
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const { data } = await axios.post(
        `${PREFIX}users/login/`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      );

      // Очищаем старые токены и сохраняем новые с помощью authService
      clearTokens();
      saveTokens(data.access, data.refresh);

      // Переадресация на главную страницу после успешной авторизации
      navigate("/", { replace: true });

      // Сброс формы
      event.target.reset();
    } catch (error) {
      // Обработка ошибок при авторизации
      setServerErrors({ error: error.response.data.detail });
    }
  } catch (error) {
    // Обработка ошибок при регистрации
    setServerErrors(error.response.data);
  }
};

 return (
  <StyledRegistration>
   <CardWrapper title="Регистрация" padding="48px 32px">
    <Form
     onFormSubmit={(e) => {
      handleFormSubmit(e);
     }}
    >
     <TextField
      variant="outlined"
      id="full_name"
      placeholder="Иванов Иван Иванович"
      label="Введите ваше ФИО"
      name="full_name"
      onChange={(e) => onChange(e.target.name, e.target.value)}
      error={!!localErrors.full_name}
      helperText={localErrors.full_name || ""}
     />
     <div className="registration-group">
      <InputMask
       value={values.phone_number_personal}
       mask="+79999999999"
       maskChar=" "
       defaultValue=""
       onChange={(e) => onChange(e.target.name, e.target.value)}
      >
       {() => (
        <TextField
         variant="outlined"
         id="personal-tel"
         label="Личный телефон"
         type="tel"
         name="phone_number_personal"
         error={
          !!localErrors.phone_number_personal ||
          !!serverErrors.phone_number_personal
         }
         helperText={
          localErrors.phone_number_personal ||
          serverErrors.phone_number_personal ||
          ""
         }
        />
       )}
      </InputMask>
      <InputMask
       value={values.phone_number_work}
       mask="+79999999999"
       maskChar=" "
       defaultValue=""
       onChange={(e) => onChange(e.target.name, e.target.value)}
      >
       {() => (
        <TextField
         variant="outlined"
         id="work-tel"
         label="Рабочий телефон"
         type="tel"
         name="phone_number_work"
         error={
          !!localErrors.phone_number_work || !!serverErrors.phone_number_work
         }
         helperText={
          localErrors.phone_number_work || serverErrors.phone_number_work || ""
         }
        />
       )}
      </InputMask>
     </div>

     <FormControl variant="outlined" fullWidth error={!!localErrors.position}>
      <InputLabel id="position">Позиция</InputLabel>
      <Select
       labelId="position"
       id="demo-simple-select"
       label="Позиция"
       onChange={(e) => onChange("position", e.target.value)}
       value={values.position}
       required
      >
       {positions.map((item, i) => (
        <MenuItem value={item.id} key={i}>
         {item.position}
        </MenuItem>
       ))}
      </Select>
      {!!localErrors.position && (
       <FormHelperText>{localErrors.position}</FormHelperText>
      )}
     </FormControl>
     <FormControl variant="outlined" fullWidth error={!!localErrors.department}>
      <InputLabel id="department">Департамент</InputLabel>
      <Select
       labelId="department"
       id="demo-simple-select"
       label="Департамент"
       onChange={(e) => onChange("department", e.target.value)}
       value={values.department}
      >
       {departments.map((item, i) => (
        <MenuItem value={item.id} key={i}>
         {item.department}
        </MenuItem>
       ))}
      </Select>
      {!!localErrors.department && (
       <FormHelperText>{localErrors.department}</FormHelperText>
      )}
     </FormControl>

     <TextField
      variant="outlined"
      id="email"
      label="Email"
      placeholder="example@domain.ru"
      type="email"
      name="email"
      onChange={(e) => onChange(e.target.name, e.target.value)}
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
      onChange={(e) => onChange(e.target.name, e.target.value)}
      error={!!localErrors.password || !!serverErrors.password}
      helperText={localErrors.password || serverErrors.password || ""}
     />
     <TextField
      variant="outlined"
      id="second-password"
      label="Повторите пароль"
      placeholder="password"
      type="password"
      name="password_confirm"
      onChange={(e) => onChange(e.target.name, e.target.value)}
      error={!!localErrors.password_confirm || !!serverErrors.non_field_errors}
      helperText={
       localErrors.password_confirm || serverErrors.non_field_errors || ""
      }
     />
     <Button variant="contained" type="submit">
      Зарегистироваться
     </Button>
    </Form>
   </CardWrapper>
  </StyledRegistration>
 );
}

export default Registration;
