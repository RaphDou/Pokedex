"use client";

import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";

interface HeaderCardProps{
  pokemonName: string;
  pokemonNumber: string;
}

export default function HeaderCard(props: HeaderCardProps) {
  return (
    
    <Card
      sx={{
        maxWidth: 400,
        height: 100,
        backgroundColor: "#5B9C27",
        borderRadius: "20px 20px 0px 0px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.9)",
        margingTop:10,
      }}
    >
       
      <Typography
        variant="h5"
        component="div"
        sx={{ color: "#FFFFFF", textAlign: "center", marginTop: "25px" }}
      >
<<<<<<< Updated upstream
       
=======
        {props.pokemonName}
>>>>>>> Stashed changes
      </Typography>
      
      <CardActionArea>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#FFFFFF",
            textAlign: "right",
            marginTop: "20px",
            marginRight: "25px",
          }}
        >
<<<<<<< Updated upstream
         
        </Typography>
      
=======
          #{props.pokemonNumber}
        </Typography>

>>>>>>> Stashed changes
      </CardActionArea>
    </Card>
  );
}
