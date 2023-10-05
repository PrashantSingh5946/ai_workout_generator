import React, { useEffect, useRef, useState } from "react";
import { Card, Button, TextField, Box, Modal, Dialog } from "@mui/material";
import env from "react-dotenv";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { connect } from "react-redux";
import muscle_groups from "../utils/muscleGroups";

//Actions

import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  openWorkoutListModal,
  closeWorkoutListModal,
} from "../redux/reducers/workout/workoutActions";
import Spinner from "../components/Spinner";
import Workouts from "./Workouts";

function GenerateWorkout({
  isLoading,
  isWorkoutListModalOpen,
  startRequest,
  sendRequestFailureStatus,
  sendRequestSuccessStatus,
  showWorkoutListModal,
  hideWorkoutListModal,
}) {
  //Local State data
  const [selectedMuscleGroups, setSelectedMuscleGroups] =
    useState(muscle_groups);
  const [gender, setGender] = useState("female");

  //Refs to store the formData
  const ageRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const workoutDurationRef = useRef();
  const workoutsNoRef = useRef();
  const genderRef = useRef();
  const muscleGroupsRef = useRef();

  //Prepare the data for the submission
  const submitData = () => {
    let age = ageRef.current.value;
    let height = heightRef.current.value;
    let weight = weightRef.current.value;
    let workoutDuration = workoutDurationRef.current.value;
    let numberOfDaysToWorkOut = workoutsNoRef.current.value;
    let muscle_groups = selectedMuscleGroups;

    //Flatten the array
    muscle_groups = muscle_groups.map((muscleGroup) => muscleGroup.name);

    fetchData({
      age,
      height,
      weight,
      workoutDuration,
      numberOfDaysToWorkOut,
      gender,
      muscle_groups,
    });
  };

  const fetchData = async (formData) => {
    try {
      startRequest({ age: 13 });
      let TOKEN = env.OPEN_AI_TOKEN;
      let topic = `give me a weekwise fitness plan  with exercises for the following parameters
${JSON.stringify(formData)}

in the form of a json schema like this
 {
    "Workout_Plan_Description":"200 letters max",
    "Months" : [
      {
        "plan_for_each_week_in_the_month":
          {
            "days":[

              {
                "excercises": [
                  {
                    "name": "",
                    "reps":"",
                  "sets":"",
                  "target_muscle":""

                  }
                ],
                "duration": 30
              }

            ]
          }

      }
    ]}. Make sure to split the muscle groups throughout the week`;

      let request = fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: topic,
            max_tokens: 3500,
            n: 1,
            stop: null,
            temperature: 0,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        }
      );

      console.log("Fetching request");
      let response = await request;
      let data = await response.json();
      console.log("Outputted data", data);
      response = JSON.parse(data.choices[0].text);
      sendRequestSuccessStatus(response);
      showWorkoutListModal();
    } catch (error) {
      console.log(error);
      sendRequestFailureStatus(error);
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div>
          {/* Modal to show the loaded workout */}

          <Dialog
            //hideBackdrop // Disable the backdrop color/image
            disableAutoFocus // Let the user focus on elements outside the dialog
            style={{ position: "absolute", width: "100%", height: "100%" }}
            open={isWorkoutListModalOpen}
            onClose={(e) => {
              e.stopPropagation();
              hideWorkoutListModal();
            }}
          >
            <Box>
              <Workouts />
            </Box>
          </Dialog>

          {/* Form */}

          <Card style={{ padding: "15px" }}>
            <Box style={{ innerWidth: "60vw" }}>
              <form>
                <Box>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    id="outlined-required"
                    label="Age"
                    defaultValue="23"
                    style={{ margin: "20px" }}
                    inputRef={ageRef}
                  />

                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    id="outlined-required"
                    label="Weight"
                    defaultValue="23"
                    style={{ margin: "20px" }}
                    inputRef={weightRef}
                  />

                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    id="outlined-required"
                    label="Height"
                    defaultValue="160"
                    style={{ margin: "20px" }}
                    inputRef={heightRef}
                  />
                </Box>

                <Box>
                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    id="outlined-required"
                    label="Workout duration"
                    defaultValue="30"
                    style={{ margin: "20px" }}
                    inputRef={workoutDurationRef}
                  />

                  <TextField
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    required
                    id="outlined-required"
                    label="Workouts per week"
                    defaultValue="3"
                    style={{ margin: "20px" }}
                    inputRef={workoutsNoRef}
                  />

                  {/* <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                required
                id="outlined-required"
                label="No of Months"
                defaultValue="1"
                style={{ margin: "20px" }}
              /> */}
                </Box>

                <Box>
                  <FormControl style={{ margin: "20px" }}>
                    <FormLabel id="demo-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      ref={genderRef}
                      onChange={(e, genderData) => setGender(genderData)}
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Autocomplete
                  multiple
                  limitTags={4}
                  id="tags-standard"
                  onChange={(e, tags) => setSelectedMuscleGroups(tags)}
                  options={muscle_groups}
                  getOptionLabel={(musclegroup) => musclegroup.name}
                  defaultValue={[]}
                  ref={muscleGroupsRef}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Multiple values"
                      placeholder="Select the muscle groups you want to target"
                    />
                  )}
                  style={{ marginBottom: "20px" }}
                />
              </form>
            </Box>

            <Button
              sx={{ background: "white", color: "white" }}
              variant="contained"
              onClick={submitData}
            >
              Generate Workout
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isWorkoutListModalOpen: state.workout.isWorkoutListModalOpen,
  isLoading: state.workout.loading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    startRequest: (payload) => dispatch(fetchDataRequest(payload)),
    sendRequestSuccessStatus: (data) => dispatch(fetchDataSuccess(data)),
    sendRequestFailureStatus: (error) => dispatch(fetchDataFailure(error)),
    showWorkoutListModal: () => dispatch(openWorkoutListModal()),
    hideWorkoutListModal: () => dispatch(closeWorkoutListModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateWorkout);
