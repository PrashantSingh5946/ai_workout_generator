import { Box, Card, Grid } from "@mui/material";
import React from "react";
import ExcerciseCard from "./ExcerciseCard";
import { Padding } from "@mui/icons-material";

function Workout({ data }) {
  return (
    <Grid
      container
      className={""}
      spacing={2}
      justifyContent={"center"}
      justifyItems={"center"}
      padding={1}
      sx={{ background: "#eee" }}
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
