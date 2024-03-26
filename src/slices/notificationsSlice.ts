import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification } from "../types/notifications.types";
import { supabase } from "../supabase";

interface NotificationsSliceState {
  notificaciones: Notification[];
  notificacionesPendientesDeVer: boolean;
}

const initialState: NotificationsSliceState = {
  notificaciones: [],
  notificacionesPendientesDeVer: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotificationsByUserId",
  async (userId: string) => {
    const { data } = await supabase
      .from("notificaciones")
      .select("*")
      .eq("id_usuario_a_notificar", userId)
      .order("created_at", { ascending: false });
    return data;
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    notificationAdded(state, action) {
      state.notificaciones.push(action.payload);
    },
    markAsViewed(state, action) {
      state.notificaciones = state.notificaciones.map((notificacion) => {
        const notificationId = action.payload.id;
        return {
          ...notificacion,
          vista:
            notificacion.vista === false && notificacion.id === notificationId
              ? true
              : false,
        };
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<Notification[]>) => {
        console.log(action.payload);
        state.notificaciones.push(action.payload);
      }
    );
  },
});

export default notificationsSlice.reducer;
