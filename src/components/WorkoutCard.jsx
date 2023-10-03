import { Box, Card, Typography } from "@mui/material";
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

  return (
    <Card variant="outlined" sx={{ padding: 2 }}>
      <Typography variant="h3" component="div">
        Day {index + 1}
      </Typography>

      <Typography variant="h5" component="div">
        Target Muscle groups
      </Typography>

      <Typography variant="h6" component="div">
        {muscle_groups.map((muscle_group) => (
          <span>
            {muscle_group} {bull}
          </span>
        ))}
      </Typography>
    </Card>
  );
}

export default WorkoutCard;
