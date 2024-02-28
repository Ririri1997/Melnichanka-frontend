import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#58C256',
      dark: '#43B441',
      contrastText: '#fff',
      // light: 'red'
    },
  },
  shape: {
    borderRadius: 12, 
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #121212',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: '1px solid #121212',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline':{
            border: '1px solid #121212',
            color: '#121212', 
          },
        },
      },
    },
    
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#121212',
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0, // Убираем левый отступ
          color: 'red', // Устанавливаем цвет текста ошибки
        },
      },
    },
  },
});
export default theme;
