import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import RouterApp from './router'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validarSessao } from './store/autenticacao.slice'; 

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validarSessao());
    }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
