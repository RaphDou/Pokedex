'use client'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';



export default function CardStat() {
  return (
    <Card sx={{ maxWidth: 300, backgroundColor: 'white', borderRadius: '20px,20px', boxShadow: '0 10px 20px rgba(0, 0, 0, 0.9)' }}>
      <CardActionArea>
        <CardMedia
        
          component="img"
          height="300"
          image="https://easydrawingart.com/wp-content/uploads/2019/08/How-to-draw-Bulbasaur.jpg"
          alt="Bullbazor"
        />
        <CardContent>
          <Typography  gutterBottom variant="h5" component="div" id='square' style={{ textAlign: 'center', color: 'white' }}>
            BULLBAZOR
          </Typography>
          
    <div>
        <header>Stats</header>
        <p>HP:45</p>
        <p>Attack:49</p>
        <p>Defense:49</p>
        <p>Sp.Atk:65</p>
        <p>Sp.Def:65</p>
        <p>Sp.Def:45</p>
    </div>
        
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
