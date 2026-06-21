import { createTheme } from '@mui/material/styles';

// Tema customizado para a aplicação de proteção animal
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B50303',
      light: '#B50303',
      dark: '#B50303',
    },
    secondary: {
      main: '#E2EAFA',
      light: '#E2EAFA',
      dark: '#E2EAFA',
    },
    background: {
      default: '#F5F5F5',
      paper: '#efefef',
    },
    text: {
      primary: '#000000',
      secondary: '#B50303',
      disabled: '#000000dd',
    },
    grey: {
      400: '#BDBDBD',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Arial, sans-serif',
        },
        h5: {
          fontSize: '18px',
          fontWeight: '600'
        },
        h6: {
          fontSize: '16px',
          fontWeight: '600',
          padding: 0,
        },
        subtitle1: {
          color: '#000000DD'
        },
        body1: {
          color: '#000000DD',
          marginTop: 0,
        },
        body2: {
          marginTop: 0,
        }
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          boxShadow: 'none',
          whiteSpace: 'nowrap', 
          textTransform: 'capitalize'
        },
        containedPrimary: {
          backgroundColor: '#B50303',
          color: '#FFFFFF'
        },
        containedSecondary: {
          backgroundColor: '#E2EAFA',
          color: '#B50303'
        }
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#727272',

          '&.Mui-focused': {
            color: '#727272',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          borderWidth: 0,

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(218, 218, 218)',
          },
        },

        notchedOutline: {
          borderColor: '#939393',
          borderWidth: 0,
        },

        input: {
          padding: '14px',
          fontSize: 14,
        },
      },
    },
    MuiBottomNavigationAction: {
        styleOverrides: {
          root: {
            color: '#000000',
          },
        },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          maxWidth: 86,
        },
        paper: {
          maxWidth: 86,
          position: 'relative',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: 20,
          border: '1px solid #B50303',
          color: '#B50303',
        },
        icon: {
          color: '#B50303',
        },
        select: {
          padding: '6px 14px',
        },
      },
    },
  },
});

export default theme;