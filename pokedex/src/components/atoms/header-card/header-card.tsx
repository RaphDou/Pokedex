'use client'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import {Typography } from '@mui/material';


export default function headerCard() {
    return (
        
      <Card sx={{ maxWidth: 345, height: 150, backgroundColor: '#5B9C27', borderRadius: '20px 20px 0px 0px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.9)' }}>
        <Typography variant="h5" component="div" sx={{ color: '#FFFFFF', textAlign: 'center', marginTop: '25px',}}>
          BULBASAUR
        </Typography>
        
        <CardActionArea>
        <Typography variant="h5" component="div" sx={{ color: '#FFFFFF', textAlign: 'right', marginTop: '20px', marginRight:'25px'}}>
          #001
        </Typography>
        </CardActionArea> 
      </Card>
    );
  }