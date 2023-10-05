import { Box, Card, Grid } from "@mui/material";
import React from "react";
import ExcerciseCard from "./ExcerciseCard";
import { Padding } from "@mui/icons-material";

function Workout({ data }) {
  return (
    <Grid
      container
      sx={{ background: "#eee" }}
      spacing={2}
      justifyContent={"center"}
    >
      {data?.excercises?.map((excercise, index) => (
        <Grid item key={index}>
          <ExcerciseCard data={excercise} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Workout;
