import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

function WorkoutCard({ data, index }) {
  const muscle_groups = data.excercises
    .map((excercise) => excercise.target_muscle)
    .filter((item, index, arr) => {
      return arr.indexOf(item) === index;
    });

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
      <CardMedia sx={{ height: 140 }} image={imgUrl} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Workout {index + 1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Target Muscle groups
        </Typography>
      </CardContent>
      <CardActions>
        {muscle_groups.map((muscle_group) => (
          <span>
            {muscle_group} {bull}
          </span>
        ))}
      </CardActions>
    </Card>
  );
}

export default WorkoutCard;
