import { configureStore } from "@reduxjs/toolkit";
import eventCreationFormReducer from "../slices/createEventFormSlice";
import notificationsSliceReducer from "../slices/notificationsSlice";

const store = configureStore({
  reducer: {
    eventCreationForm: eventCreationFormReducer,
    notifications: notificationsSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
