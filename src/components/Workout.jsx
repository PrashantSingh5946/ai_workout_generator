import { Box, Card } from "@mui/material";
import React from "react";

function Workout({ data }) {
  return (
    <Card>
      <Box>
        {data?.excercises?.map((excercise) => (
          <div>
            <span>
              Do {excercise.name} with {excercise.reps} reps each for{" "}
              {excercise.sets} sets
            </span>
          </div>
        ))}
      </Box>
    </Card>
  );
}

export default Workout;
