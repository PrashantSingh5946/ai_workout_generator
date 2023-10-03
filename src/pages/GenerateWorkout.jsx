import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import env from "react-dotenv";

function GenerateWorkout() {
  const [data, setData] = useState([]);

  async function fetchData() {
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

      setData(months);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {}, [data]);
  return (
    <div>
      <button onClick={fetchData}>GenerateWorkout</button>

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

export default GenerateWorkout;
