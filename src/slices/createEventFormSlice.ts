import { createSlice } from "@reduxjs/toolkit";
import { Coordinates } from "../types/geography.types";
import { EventImage } from "../types/events.types";

interface EventFormSliceState {
  name: string;
  description: string;
  date: string;
  hour: string;
  categoryIds: number[];
  markerCoordinates: Coordinates;
  state_name: string;
  city_name: string;
  duration: number | string;
  image: EventImage;
}

interface Payload {
  payload: EventFormSliceState;
}

const initialState: EventFormSliceState = {
  name: "",
  description: "",
  date: "",
  hour: "",
  categoryIds: [],
  markerCoordinates: null,
  state_name: "",
  city_name: "",
  duration: null,
  image: null,
};

export const createEventFormSlice = createSlice({
  name: "eventCreationForm",
  initialState: initialState,
  reducers: {
    uploadFields: (state, action: Payload) => {
      state.name = action.payload.name;
      state.description = action.payload.description;
      state.date = action.payload.date;
      state.hour = action.payload.hour;
      state.categoryIds = action.payload.categoryIds;
      state.markerCoordinates = action.payload.markerCoordinates;
      state.state_name = action.payload.state_name;
      state.city_name = action.payload.city_name;
      state.duration = action.payload.duration;
      state.image = action.payload.image;
    },
  },
});

export const { uploadFields } = createEventFormSlice.actions;

export default createEventFormSlice.reducer;
