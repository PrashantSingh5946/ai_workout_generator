import React from "react";
import WeekCard from "../components/WeekCard";
import { Box, Card, Grid } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";

let data = {
  Workout_Plan_Description:
    "This is a 1-month workout plan for a 19-year-old female with a weight of 70kg and a height of 170cm. The plan focuses on targeting the abs, legs, and back muscles and is designed to be done over a period of 30 minutes each day. ",
  Months: [
    {
      plan_for_each_week_in_the_month: {
        days: [
          {
            excercises: [
              {
                name: "Crunches",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Leg Raises",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Squats",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Lunges",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Push-Ups",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
              {
                name: "Pull-Ups",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
            ],
            duration: 30,
          },
          {
            excercises: [
              {
                name: "Bicycle Crunches",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Plank",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Step-Ups",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Calf Raises",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Superman",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
              {
                name: "Lat Pull-Downs",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
            ],
            duration: 30,
          },
          {
            excercises: [
              {
                name: "Mountain Climbers",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Russian Twists",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Jump Squats",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Lateral Lunges",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Reverse Flys",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
              {
                name: "Bent-Over Rows",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
            ],
            duration: 30,
          },
          {
            excercises: [
              {
                name: "Leg Raises",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Plank",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Squats",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Lunges",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Push-Ups",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
              {
                name: "Pull-Ups",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
            ],
            duration: 30,
          },
          {
            excercises: [
              {
                name: "Bicycle Crunches",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Crunches",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Step-Ups",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Calf Raises",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Superman",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
              {
                name: "Lat Pull-Downs",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
            ],
            duration: 30,
          },
          {
            excercises: [
              {
                name: "Mountain Climbers",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Russian Twists",
                reps: "15",
                sets: "3",
                target_muscle: "Abs",
              },
              {
                name: "Jump Squats",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Lateral Lunges",
                reps: "15",
                sets: "3",
                target_muscle: "Legs",
              },
              {
                name: "Reverse Flys",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
              {
                name: "Bent-Over Rows",
                reps: "15",
                sets: "3",
                target_muscle: "Back",
              },
            ],
            duration: 30,
          },
        ],
      },
    },
  ],
};

function Workouts() {
  return (
    <div>
      <Grid container className={""} justify="center">
        {data.Months[0].plan_for_each_week_in_the_month.days.map(
          (data, index) => {
            return (
              <Grid item>
                <Box sx={{ margin: 3 }}>
                  <WorkoutCard
                    data={data}
                    index={index}
                    key={index}
                  ></WorkoutCard>
                </Box>
              </Grid>
            );
          }
        )}
      </Grid>
    </div>
  );
}

export default Workouts;
