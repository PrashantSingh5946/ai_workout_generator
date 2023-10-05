import React, { useState } from "react";
import WeekCard from "../components/WeekCard";
import { Box, Card, Grid, Modal, Typography } from "@mui/material";
import WorkoutCard from "../components/WorkoutCard";
import Workout from "../components/Workout";
import { connect } from "react-redux";

function Workouts({ isModalOpen, data, openModal, closeModal }) {
  const [currentWorkout, setCurrentWorkout] = useState(null);

  const handleClose = () => {};

  return (
    <>
      {data && (
        <div>
          <Modal
            open={isModalOpen}
            onClose={handleClose}
            onClick={() => closeModal()}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: () => dispatch({ type: "OPEN_WORKOUT_MODAL" }),
    closeModal: () => dispatch({ type: "CLOSE_WORKOUT_MODAL" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workouts);
