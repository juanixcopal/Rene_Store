import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    neutral: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      white: '#FFFFFF'
    },
    primary: {
      main: '#01579B',
      50: '#E1F5FE',
      100: '#B3E5FC',
      200: '#81D4FA',
      300: '#4FC3F7',
      400: '#29B6F6',
      500: '#03A9F4',
      600: '#039BE5',
      700: '#0288D1',
      800: '#0277BD',
      900: '#01579B'
    },
    critical: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C'
    },
    high: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100'
    },
    medium: {
      50: '#FFFDE7',
      100: '#FFF9C4',
      200: '#FFF59D',
      300: '#FFF176',
      400: '#FFEE58',
      500: '#FFEB3B',
      600: '#FDD835',
      700: '#FBC02D',
      800: '#F9A825',
      900: '#F57F17'
    },
    success: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20'
    },
    informative: {
      50: '#E8F0FE',
      100: '#C4D9FD',
      200: '#9DBFFB',
      300: '#76A6F9',
      400: '#4F8DF8',
      500: '#2873F6',
      600: '#0A5CEB',
      700: '#084DC4',
      800: '#073E9D',
      900: '#052E76'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: '60px',
          background: '#01579B'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          display: 'block'
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          minHeight: '56px'
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        fullWidth: true
      },
      styleOverrides: {
        root: {
          '& .MuiInputLabel-asterisk': {
            display: 'none'
          },
          '& .MuiInputLabel-root': {
            fontSize: '14px',
            fontWeight: 400,
            color: '#757575',
            fontFamily: 'Open Sans'
          },
          '& .MuiOutlinedInput-root': {
            background: '#FFFFFF',
            borderRadius: '4px',
            fontSize: '14px',
            '& .MuiInputBase-input': {
              fontSize: '14px',
              fontWeight: 400,
              color: '#424242',
              fontFamily: 'Open Sans'
            }
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#01579B'
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#01579B'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#01579B',
          color: '#ffffff',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          fontFamily: 'Open Sans',
          maxHeight: '36px',
          boxShadow: 'none',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#004174',
            boxShadow: 'none',
            borderRadius: '8px'
          }
        },
        outlined: {
          borderColor: '#01579B',
          color: '#01579B',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          maxHeight: '36px',
          fontFamily: 'Open Sans',
          boxShadow: 'none',
          borderRadius: '8px',
          '&:hover': {
            borderColor: '#01579B',
            backgroundColor: '#E8F0FE',
            boxShadow: 'none',
            borderRadius: '8px'
          }
        },
        text: {
          color: '#01579B',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          fontFamily: 'Open Sans',
          borderRadius: '8px'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '16px',
          boxShadow: 'none',
          borderRadius: '8px'
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontSize: '16px',
          fontWeight: 600,
          color: '424242',
          display: 'flex',
          justifyContent: 'center'
        },
      }
    },
    MuiTypography: {
      defaultProps: {
        fontStyle: 'normal',
        color: '#424242',
        fontFamily: 'Open Sans'
      }
    },
    MuiChip: {
      styleOverrides: {
        filled: {
          padding: '6px 6px',
          gap: '8px',
          fontSize: '12px',
          fontWeight: 400,
          fontStyle: 'normal',
          fontFamily: 'Open Sans',
          color: '#424242'
        },
        iconSmall: {
          width: '14px',
          height: '14px'
        },
        iconMedium: {
          width: '20px',
          height: '20px',
          marginLeft: '0',
          marginRight: '0'
        }
      }
    },
    MuiPagination: {
      styleOverrides: {
        ul: {
          gap: '10px',
          justifyContent: 'center',
          display: 'flex'
        }
      }
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#01579B',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#004174'
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 400,
          fontStyle: 'normal',
          color: '#212121',
          fontFamily: 'Open Sans, sans-serif'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: '#E8F5E9',
          color: '#1B5E20',
          borderRadius: '8px'
        },
        standardError: {
          backgroundColor: '#FFEBEE',
          color: '#B71C1C',
          borderRadius: '8px'
        },
        standardWarning: {
          backgroundColor: '#FFFDE7',
          color: '#E65100',
          borderRadius: '8px'
        },
        standardInfo: {
          backgroundColor: '#E8F0FE',
          color: '#084DC4',
          borderRadius: '8px'
        },
        message: {
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'Open Sans'
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #E0E0E0',
          borderRadius: '8px'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#EEEEEE',
          color: '#424242',
          fontWeight: 600,
          fontSize: '14px',
          padding: '10px 16px',
          fontFamily: 'Open Sans'
        },
        body: {
          color: '#212121',
          fontSize: '14px',
          fontWeight: 400,
          padding: '6px 16px',
          fontFamily: 'Open Sans'
        }
      }
    }



  }
})

export default theme
