export const handleTel = (value) => {
  const trimmedValue = value.replace(/\s+/g, '');
  const errorText = trimmedValue.length < 12 ? "Введите корректный номер телефона" : false;
  return errorText; 
}
export const handleEmptyField = (value) => {
 const errorText = value.length === 0 ? "Это поле обязательно к заполнению" : false;
 return errorText; 
}

export const handleFullName = (nameValue) => {
 let fullName = nameValue.trim().replace(/\s+/g, ' ');
 const errorText = fullName.split(' ').length !== 3 ? 'Введите полное имя' : false;
 return errorText;
}

export const handlePasswordMatch = (passwordOne, passwordTwo) =>{
 const errorText = passwordOne !== passwordTwo ? 'Пароли не совпадают' : false;
 return errorText;
}

export const handlePasswordValid = (password) => {
 let errorText = '';

 if (password.length < 8) {
   errorText = 'Пароль должен содержать минимум 8 символов';
 } else if (!/\d/.test(password)) {
   errorText = 'Пароль должен содержать хотя бы одну цифру';
 } else if (!/[a-zA-Zа-яА-Я]/.test(password)) {
   errorText = 'Пароль должен содержать хотя бы одну букву';
 }

 return errorText;
}

export const handleEmailValid = (email) => {
  let errorText= '';
  if (email.length < 5) {
    errorText = 'Некорректный email';
  } if (!email.includes('@')){
    errorText = 'Поле должно содержать знак @';

  }
 return  errorText;
}