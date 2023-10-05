import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ExcerciseCard({ data }) {
  console.log(data);

  const [imgUrl, setImgUrl] = React.useState(null);

  React.useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://api.unsplash.com/search/photos?query=` +
        "gym workout" +
        `&client_id=i_fBz-g6EkznTcLmSgnNH_eCmjuybDK1SmwWqTDpfKk`,
      requestOptions
    )
      .then((response) => response.json())
      .then(({ results }) => {
        console.log(results);
        setImgUrl(results[0].urls["small"]);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={imgUrl} title="Workout image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.sets} Sets
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.reps} Reps
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <h4 style={{ marginBottom: "5px" }}>Target Muscle groups</h4>

          {data.target_muscle.split(",").map((muscle_group) => (
            <>
              {muscle_group} {bull}
            </>
          ))}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
