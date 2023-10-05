import React, { useEffect, useRef, useState } from "react";
import { Card, Button, TextField, Box } from "@mui/material";
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

import { fetchDataRequest } from "../redux/reducers/workout/workoutActions";

function GenerateWorkout(props) {
  const [data, setData] = useState([]);
  const fetchData = () => {
    return async (dispatch) => {
      dispatch(fetchDataRequest());

      try {
        let data = null;
        let TOKEN = env.OPEN_AI_TOKEN;
        let topic = `give me a weekwise fitness plan  with exercises for the following parameters
{
  "age": 19,
  "weight": "70kg",
  "height": "170cm",
  "length_of_days_array": 6,
  "preferred_duration": 30,
  "gender": "female",
  "muscle_groups_to_target": ["abs","legs","back"],
  "plan_duration_length_in_months": 1
}

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
    ]
}`;

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

        let response = await request;

        console.log(response);

        data = await response.json();

        response = JSON.parse(data.choices[0].text);

        console.log(response);

        let months = response["Months"];

        console.log("Outputted data", data);
      } catch (error) {
        console.log(error);
      }
    };
  };

  const ageRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();

  useEffect(() => {}, [data]);

  return (
    <div>
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
              />

              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                required
                id="outlined-required"
                label="Height"
                defaultValue="160"
                style={{ margin: "20px" }}
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
              />

              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                required
                id="outlined-required"
                label="Workouts per week"
                defaultValue="3"
                style={{ margin: "20px" }}
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
              id="tags-standard"
              options={muscle_groups}
              getOptionLabel={(musclegroup) => musclegroup.name}
              defaultValue={[muscle_groups[1]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Multiple values"
                  placeholder="Favorites"
                />
              )}
              style={{ marginBottom: "20px" }}
            />
          </form>
        </Box>

        <Button variant="contained" onClick={fetchData}>
          Generate Workout
        </Button>
      </Card>

      {data.map((month) => (
        <div className="month-card">
          <div className="week-card">
            {month["plan_for_each_week_in_the_month"]["days"].map((day) => (
              <Card variant="outlined">
                {day["excercises"].map((excercise) => (
                  <Card variant="outlined">
                    <h3>{excercise.name}</h3> {excercise.reps} reps{" "}
                    {excercise.sets} sets
                  </Card>
                ))}
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  //isModalOpen: state.workout.isModalOpen,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // openModal: () => dispatch({ type: "OPEN_WORKOUT_MODAL" }),
    // closeModal: () => dispatch({ type: "CLOSE_WORKOUT_MODAL" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateWorkout);
