import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 48,
          fontWeight: 700,
        },
        h2: {
          fontSize: 36,
          fontWeight: 700,
        },
        h3: {
          fontSize: 24,
          fontWeight: 700,
        },
        h4: {
          fontSize: 18,
          fontWeight: 700,
        },
        h5: {
          fontSize: 16,
          fontWeight: 700,
        },
        h6: {
          fontSize: 14,
          fontWeight: 700,
        },
        body1: {
          fontSize: 16,
          fontWeight: 400,
        },
        body2: {
          fontSize: 14,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 16,
          fontWeight: 600,
        },
        subtitle2: {
          fontSize: 14,
          fontWeight: 600,
        },
        caption: {
          fontSize: 12,
          fontWeight: 400,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
        },
        filled: {
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "Poppins",
          paddingLeft: "0.25rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        filled: {
          fontSize: "14px",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "Poppins",
          paddingLeft: "0.25rem",
          "&.MuiInputLabel-shrink": {
            fontSize: "14px!important",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "unset",
            },
            "&:hover fieldset": {
              border: "unset",
            },
            "&.Mui-focused fieldset": {
              border: "unset",
            },
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
        },
        multiline: {
          padding: "1.75rem 1.25rem",
        },
        underline: {
          "&:before": {
            display: "none",
          },
          "&:after": {
            display: "none",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: "2px!important",
          borderRadius: "1rem",
          fontWeight: 600,
          textDecoration: "none",
          "&:hover": {
            borderWidth: "2px",
          },
        },
        root: {
          boxShadow: "none",
          textTransform: "none",
          borderRadius: "1rem",
          fontWeight: 600,
          textDecoration: "none",
        },
        sizeSmall: {
          fontSize: 14,
          padding: "0.2rem 1rem",
        },
        sizeMedium: {
          fontSize: 18,
          padding: "0.5rem 2rem",
          borderWidth: "3px",
        },
        sizeLarge: {
          fontSize: 22,
          padding: "0.5rem 2.5rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "1rem",
          border: "1px solid #e0e0e0",
        },
      },
    },
  },
});
