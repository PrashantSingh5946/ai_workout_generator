import React, { useState } from "react";
import WeekCard from "../components/WeekCard";
import { Box, Card, Dialog, Grid, Modal, Typography } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import Workout from "../components/Workout";
import { connect } from "react-redux";

import {
  openWorkoutModal,
  closeWorkoutModal,
  setCurrentWorkoutIndex,
} from "../redux/reducers/workout/workoutActions";

function Workouts({
  isModalOpen,
  data,
  currentWorkout,
  openModal,
  closeModal,
  setCurrentWorkout,
}) {
  const handleClose = (e) => {
    console.log("Workout modal closed");
    e.stopPropagation();
    closeModal();
  };

  return (
    <>
      {data && (
        <div>
          <Dialog
            disableAutoFocus // Let the user focus on elements outside the dialog
            style={{ position: "absolute", width: "100%", height: "100%" }} // This was the key point, reset the position of the dialog, so the user can interact with other elements
            open={isModalOpen}
            onClose={handleClose}
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
          </Dialog>

          <Grid container spacing={1} className={""} justify="center">
            {data.Months[0].plan_for_each_week_in_the_month.days.map(
              (dayData, currentIndex) => {
                return (
                  <Grid item key={currentIndex}>
                    <div
                      onClick={() => {
                        setCurrentWorkout(currentIndex);
                        openModal();
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
      )}
      {!data && <h3>Data not available</h3>}
    </>
  );
}

const mapStateToProps = (state) => ({
  isModalOpen: state.workout.isModalOpen,
  data: state.workout.data,
  currentWorkout: state.workout.currentWorkoutIndex,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openWorkoutModal()),
    closeModal: () => dispatch(closeWorkoutModal()),
    setCurrentWorkout: (index) => dispatch(setCurrentWorkoutIndex(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workouts);
