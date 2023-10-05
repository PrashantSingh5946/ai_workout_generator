import {
  CLOSE_WORKOUT_MODAL,
  OPEN_WORKOUT_MODAL,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  OPEN_WORKOUT_LIST_MODAL,
  CLOSE_WORKOUT_LIST_MODAL,
  SET_CURRENT_WORKOUT_INDEX,
} from "./workoutActionTypes";

import deepClone from "../../../utils/deepClone";
//initial state
const initialState = {
  isModalOpen: false,
  currentWorkout: null,
  data: null,
  loading: false,
  error: null,
  isWorkoutListModalOpen: false,
  currentWorkoutIndex: 0,
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
    case OPEN_WORKOUT_LIST_MODAL:
      return {
        ...state,

        isWorkoutListModalOpen: true,
      };
    case CLOSE_WORKOUT_LIST_MODAL:
      return {
        ...state,

        isWorkoutListModalOpen: false,
      };
    case SET_CURRENT_WORKOUT_INDEX:
      return {
        ...state,
        currentWorkoutIndex: action.payload,
      };
    default:
      return state;
  }
};

export default workoutReducer;
