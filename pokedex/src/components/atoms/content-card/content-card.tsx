import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ContentCard() {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '0px 0px 20px 20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.9)'   }}>
      <CardMedia
        
        component="img"
         image="https://easydrawingart.com/wp-content/uploads/2019/08/How-to-draw-Bulbasaur.jpg"
        alt="Bullbazor"
      />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div"style={{ textAlign: 'center'}}>
           About  Abilities Evolution Stat
           </Typography>
          
          <Typography variant="body2" color="text.secondary" align='left'>
            
            HP:45
            Attack:49 
            Defense:49 
            Sp.Atk:65 
            Sp.Def:65 
            Sp.Def:45 

          </Typography>
        </CardContent>
     
    </Card>
  );
}