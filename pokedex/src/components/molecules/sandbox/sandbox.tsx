'use client'

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Typography, colors } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  width:300,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function SandBox() {
  return (
    <Grid container spacing={2}>
      {[lightTheme,].map((theme, index) => (
        <Grid item xs={6} key={index}>
          <ThemeProvider theme={theme}>
            <Box
              sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
              }}
            >
              {[ 6,].map((elevation) => (
                <Item key={elevation} elevation={elevation} style={{ backgroundColor: '#5D9C59',borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.9)', color: 'white' }}>
                  <Typography variant='h4'  justifyContent={'center'} alignItems={'center'} style={{ marginTop: '10px' }}> 
                    Poison
                    </Typography>
                </Item>
              ))}
            </Box>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}