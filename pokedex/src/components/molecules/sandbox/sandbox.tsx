"use client";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Typography, colors } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 200,
  marginLeft: 25,
  marginBottom:200,
 
  
 
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function SandBox() {
  return (
    <Grid container spacing={2}>
      {[lightTheme].map((theme, index) => (
        
          <ThemeProvider theme={theme}>
            {[6].map((elevation) => (
              <Item
                key={elevation}
                elevation={elevation}
                style={{
                  backgroundColor: "#5D9C59",
                  borderRadius: "20px",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.9)",
                  color: "white",
                }}
              >
                <Typography
                  variant="h5"
                  justifyContent={"center"}
                  alignItems={"center"}
                  style={{ marginTop: "5px" }}
                >Poison</Typography>
              </Item>
            ))}
          </ThemeProvider>
    
      ))}
    </Grid>
  );
}
