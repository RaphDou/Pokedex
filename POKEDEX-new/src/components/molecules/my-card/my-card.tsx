'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



export default function MyCard() {
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: '#5D9C59', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.9)' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image="https://easydrawingart.com/wp-content/uploads/2019/08/How-to-draw-Bulbasaur.jpg"
          alt="Bullbazor"
        />
        <CardContent>
          <Typography  gutterBottom variant="h5" component="div" id='square' style={{ textAlign: 'center', color: 'white' }}>
            Bulbizzare
          </Typography>
          
        
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
