import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#181411', // Espresso Black
      contrastText: '#f6f1ea',
    },
    secondary: {
      main: '#5b3a29', // Warm Walnut
      contrastText: '#f6f1ea',
    },
    warning: {
      main: '#c68a4b', // Caramel — the signature accent, used for CTAs
      contrastText: '#181411',
    },
    background: {
      default: '#f6f1ea', // Cream
      paper: '#ede4d8', // Cream Muted
    },
    text: {
      primary: '#181411',
      secondary: '#8c7b6b',
    },
    error: {
      main: '#b4432d',
    },
    success: {
      main: '#6b8f71',
    },
    divider: '#e3d8c8',
  },

  typography: {
    fontFamily: "'Figtree', sans-serif",
    h1: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 600,
      fontSize: '3.5rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      fontSize: '1.85rem',
      lineHeight: 1.2,
    },
    h4: {
      fontFamily: "'Fraunces', serif",
      fontWeight: 500,
      fontSize: '1.4rem',
    },
    subtitle1: {
      fontFamily: "'Figtree', sans-serif",
      fontWeight: 500,
      color: '#8c7b6b',
    },
    body1: {
      fontFamily: "'Figtree', sans-serif",
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'Figtree', sans-serif",
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },

  shape: {
    borderRadius: 18,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // pill-shaped buttons — premium minimal look
          padding: '10px 28px',
          boxShadow: 'none',
          transition:
            'transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(24, 20, 17, 0.16)',
          },
          '&:active': {
            transform: 'scale(0.97)',
          },
        },
        containedWarning: {
          backgroundColor: '#c68a4b',
          color: '#181411',
          '&:hover': {
            backgroundColor: '#b87a3d',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: 'none',
          boxShadow: '0 8px 24px rgba(24, 20, 17, 0.08)', // shadow only, no border
          backgroundColor: '#ede4d8',
          transition: 'transform 280ms cubic-bezier(0.16,1,0.3,1), box-shadow 280ms ease',
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 14,
            transition: 'box-shadow 200ms ease, border-color 200ms ease',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#c68a4b',
              borderWidth: '2px',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 4px rgba(198, 138, 75, 0.15)',
            },
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 500,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
