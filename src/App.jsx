import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import RouterApp from './router'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom';

function App() {

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
