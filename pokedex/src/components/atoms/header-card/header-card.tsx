"use client";

import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import { Typography } from "@mui/material";
import SandBox from "@/components/molecules/sandbox/sandbox";

export default function headerCard() {
  return (
    
    <Card
      sx={{
        maxWidth: 100,
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
        BULBASAUR
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
          #001
        </Typography>
        <SandBox/>
      </CardActionArea>
    </Card>
  );
}
