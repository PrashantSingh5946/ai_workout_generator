import React, { useState } from "react";
import WeekCard from "../components/WeekCard";
import { Box, Card, Grid, Modal, Typography } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import Workout from "../components/Workout";

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
  const [isOpenWorkoutModal, setIsOpenWorkoutModal] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);

  const handleClose = () => {};

  return (
    <div>
      <Modal
        open={isOpenWorkoutModal}
        onClose={handleClose}
        onClick={() => {
          setIsOpenWorkoutModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Workout
            data={
              data.Months[0].plan_for_each_week_in_the_month.days[
                currentWorkout
              ]
            }
          />
        </Box>
      </Modal>

      <Grid container className={""} justify="center">
        {data.Months[0].plan_for_each_week_in_the_month.days.map(
          (dayData, currentIndex) => {
            console.log(currentIndex);
            return (
              <Grid item>
                <div
                  onClick={() => {
                    setCurrentWorkout(currentIndex);
                    setIsOpenWorkoutModal(true);
                  }}
                >
                  <Box sx={{ margin: 3 }}>
                    <WorkoutCard
                      data={dayData}
                      index={currentIndex}
                      key={currentIndex}
                    ></WorkoutCard>
                  </Box>
                </div>
              </Grid>
            );
          }
        )}
      </Grid>
    </div>
  );
}

export default Workouts;
