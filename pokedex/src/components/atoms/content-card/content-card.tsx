
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
        image=""
        alt="Bullbasaur"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{ textAlign: "center" }}
        >
          
        </Typography>

        <Typography variant="body2" color="black" align="left">
          
        </Typography>
      </CardContent>
    </Card>
  );
}
