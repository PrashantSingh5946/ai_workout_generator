import env from "react-dotenv";

import { openWorkoutModal, closeWorkoutModal } from "./workoutActions";
import {
  CLOSE_WORKOUT_MODAL,
  OPEN_WORKOUT_MODAL,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "./workoutActionTypes";

import deepClone from "../../../utils/deepClone";
//initial state
const initialState = {
  isModalOpen: false,
  currentWorkout: null,
  data: null,
  loading: false,
  error: null,
};

const workoutReducer = (state = initialState, action) => {
  console.log("Action called", action);

  switch (action.type) {
    case CLOSE_WORKOUT_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    case OPEN_WORKOUT_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };

    //For data fetching
    case FETCH_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: deepClone(action.payload),
        loading: false,
        error: null,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;
