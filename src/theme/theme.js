import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#58C256',
      dark: '#43B441',
      contrastText: '#fff'
    },
    error: {
      main: '#d32f2f', // Цвет ошибки
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
          color: '#d32f2f', // Устанавливаем цвет текста ошибки
        },
      },
    },
  },
});
export default theme;

export const widths = {
small: '440px',
medium: '880px',
large: '1200px',
};