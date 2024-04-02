import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification } from "../types/notifications.types";
import { supabase } from "../supabase";
import { PostgrestError } from "@supabase/supabase-js";

interface NotificationsSliceState {
  notificaciones: Notification[];
  notificacionesPendientesDeVer: boolean;
  cantidadNotificacionesPendientes: number;
  loading: boolean;
}

const initialState: NotificationsSliceState = {
  notificaciones: [],
  notificacionesPendientesDeVer: false,
  cantidadNotificacionesPendientes: 0,
  loading: false,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotificationsByUserId",
  async (userId: string) => {
    const { data } = await supabase
      .from("notificaciones")
      .select("*")
      .eq("id_usuario_a_notificar", userId)
      .order("fecha", { ascending: false })
      .order("hora", { ascending: false });

    if (!data) {
      return [];
    }
    return data;
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationsAsReadByNotificationId",
  async (notificationId: number) => {
    const { data, error } = await supabase
      .from("notificaciones")
      .update({
        vista: true,
      })
      .eq("id", notificationId);
    return { updatedNotificationId: notificationId, error };
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllNotificationsAsReadByUserId",
  async (userId: string) => {
    const { data, error } = await supabase
      .from("notificaciones")
      .update({
        vista: true,
      })
      .eq("id_usuario_a_notificar", userId);
    return { data, error };
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    notificationAdded(state, action) {
      state.notificaciones.push(action.payload);
      state.notificacionesPendientesDeVer = true;
      state.cantidadNotificacionesPendientes += 1;
    },
    resetState(state = initialState) {
      state.notificaciones = [];
      state.notificacionesPendientesDeVer = false;
      state.cantidadNotificacionesPendientes = 0;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action: PayloadAction<Notification[]>) => {
        state.loading = false;
        state.cantidadNotificacionesPendientes = 0;
        state.notificacionesPendientesDeVer = false;
        state.notificaciones = action.payload;
        state.notificaciones.forEach((notificacion) => {
          if (!notificacion.vista) {
            state.notificacionesPendientesDeVer = true;
            state.cantidadNotificacionesPendientes += 1;
          }
        });
      }
    );
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchNotifications.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(
      markNotificationAsRead.fulfilled,
      (
        state,
        action: PayloadAction<{
          updatedNotificationId: number;
          error: PostgrestError;
        }>
      ) => {
        let notificacionesPendientesDeVerConteo = 0;
        // si no hubo error en el update
        if (!action.payload.error) {
          state.cantidadNotificacionesPendientes -= 1;
          state.notificaciones = state.notificaciones.map((notificacion) => {
            if (!notificacion.vista) {
              notificacionesPendientesDeVerConteo++;
            }
            if (notificacion.id === action.payload.updatedNotificationId) {
              // la notificacion recien vista
              notificacionesPendientesDeVerConteo--;
              return { ...notificacion, vista: true };
            } else {
              return notificacion;
            }
          });
        }

        if (notificacionesPendientesDeVerConteo > 0) {
          state.notificacionesPendientesDeVer = true;
        } else {
          state.notificacionesPendientesDeVer = false;
        }
      }
    );

    builder.addCase(
      markAllNotificationsAsRead.fulfilled,
      (state, action: PayloadAction<{ data: null; error: PostgrestError }>) => {
        // si no hubo error en el update
        if (!action.payload.error) {
          state.notificaciones = state.notificaciones.map((notificacion) => {
            return { ...notificacion, vista: true };
          });
          state.notificacionesPendientesDeVer = false;
          state.cantidadNotificacionesPendientes = 0;
        }
      }
    );
  },
});

const { actions, reducer } = notificationsSlice;

export const { notificationAdded, resetState } = actions;

export default notificationsSlice.reducer;
