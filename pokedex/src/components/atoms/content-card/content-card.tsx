import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";


export default function ContentCard() {
  return (
    <Card
      sx={{
        maxWidth:400,
        height:400,
        borderRadius: "0px 0px 20px 20px",
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.9)",
        marginBottom:10,
      }}
    >
      <CardMedia
        component="img"
        image="https://easydrawingart.com/wp-content/uploads/2019/08/How-to-draw-Bulbasaur.jpg"
        alt="Bullbasaur"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "center" }}
        >
          About Abilities Evolution Stat
        </Typography>

        <Typography variant="body2" color="black" align="left">
          <div>HP:</div>

          <div>Attack:</div>

          <div>Defense:</div>

          <div>Sp.Atk:</div>

          <div>Sp.Def:</div>

          <div>Sp.Def:</div>
        </Typography>
      </CardContent>
    </Card>
  );
}
