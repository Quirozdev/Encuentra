import { configureStore } from "@reduxjs/toolkit";
import eventCreationFormReducer from "../slices/createEventFormSlice";

const store = configureStore({
  reducer: {
    eventCreationForm: eventCreationFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
