import { createSlice } from "@reduxjs/toolkit";
import { Coordinates } from "../types/geography.types";
import { EventImage } from "../types/events.types";

interface EventFormSliceState {
  name: string;
  description: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  hour: string;
  categoryIds: number[];
  country: string;
  markerCoordinates: Coordinates;
  state_name: string;
  city_name: string;
  direction: string;
  duration: number | string;
  cost: number | string;
  image: EventImage;
}

interface Payload {
  payload: EventFormSliceState;
}

const initialState: EventFormSliceState = {
  name: "",
  description: "",
  date: null,
  hour: "",
  categoryIds: [],
  country: "",
  markerCoordinates: null,
  state_name: "",
  city_name: "",
  direction: "",
  duration: null,
  cost: null,
  image: null,
};

export const createEventFormSlice = createSlice({
  name: "eventCreationForm",
  initialState: initialState,
  reducers: {
    uploadFields: (state, action: Payload) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.date = {
        year: action.payload.date.year,
        month: action.payload.date.month,
        day: action.payload.date.day,
      };
      state.hour = action.payload.hour;
      state.categoryIds = action.payload.categoryIds;
      state.country = action.payload.country;
      state.markerCoordinates = action.payload.markerCoordinates;
      state.state_name = action.payload.state_name;
      state.city_name = action.payload.city_name;
      state.direction = action.payload.direction;
      state.duration = action.payload.duration;
      state.cost = action.payload.cost;
      state.image = action.payload.image;
    },
  },
});

export const { uploadFields } = createEventFormSlice.actions;

export default createEventFormSlice.reducer;
