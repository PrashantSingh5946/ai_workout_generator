import { combineReducers } from "redux";
import workoutReducer from "./workout/workoutReducer";

const rootReducer = combineReducers({
  // Add your reducers here
  workout: workoutReducer,
});

export default rootReducer;
