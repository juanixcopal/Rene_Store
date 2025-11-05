import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#7B2D26'
    },
    secondary: {
      main: '#D8A39D'
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
            fontWeight: 200,
            color: '#3E2F2F95',
            fontFamily: 'Playfair Display'
          },
          '& .MuiOutlinedInput-root': {
            background: '#FAF9F8',
            borderRadius: '4px',
            fontSize: '14px',
            '& .MuiInputBase-input': {
              fontSize: '14px',
              fontWeight: 400,
              color: '#424242',
              fontFamily: 'Playfair Display'
            }
          },
          '& .css-18p5xg2-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline': {
            borderColor: '#E6D5C3'
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#7B2D26'
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#7B2D26'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#7B2D26',
          color: '#ffffff',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 600,
          fontFamily: 'Playfair Display',
          // maxHeight: '36px',
          boxShadow: 'none',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#571e19',
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
          fontFamily: 'Playfair Display',
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
          fontFamily: 'Playfair Display',
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
          borderRadius: '10px',
          border: '1px solid #E6D5C3'
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        fontStyle: 'normal',
        color: '#7B2D26',
        fontFamily: 'Playfair Display'
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
          fontFamily: 'Playfair Display'
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
          fontFamily: 'Playfair Display'
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
          fontFamily: 'Playfair Display'
        },
        body: {
          color: '#212121',
          fontSize: '14px',
          fontWeight: 400,
          padding: '6px 16px',
          fontFamily: 'Playfair Display'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: 'Playfair Display',
          fontWeight: 400,
          fontSize: '16px',
          textTransform: 'inherit'
        }
      }
    }
  }
})

export default theme
