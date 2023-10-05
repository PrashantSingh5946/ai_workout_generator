import {
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  OPEN_WORKOUT_MODAL,
  CLOSE_WORKOUT_MODAL,
  OPEN_WORKOUT_LIST_MODAL,
  CLOSE_WORKOUT_LIST_MODAL,
  SET_CURRENT_WORKOUT_INDEX,
  CLOSE_ERROR_MODAL,
} from "./workoutActionTypes";

export const fetchDataRequest = (data) => ({
  type: FETCH_DATA_REQUEST,
  payload: data,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const openWorkoutModal = () => ({
  type: OPEN_WORKOUT_MODAL,
});

export const closeWorkoutModal = () => ({
  type: CLOSE_WORKOUT_MODAL,
});

export const openWorkoutListModal = () => ({
  type: OPEN_WORKOUT_LIST_MODAL,
});

export const closeWorkoutListModal = () => ({
  type: CLOSE_WORKOUT_LIST_MODAL,
});

export const setCurrentWorkoutIndex = (index) => ({
  type: SET_CURRENT_WORKOUT_INDEX,
  payload: index,
});

export const closeErrorModal = () => ({
  type: CLOSE_ERROR_MODAL,
});
