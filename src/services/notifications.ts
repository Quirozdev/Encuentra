import { supabase } from "../supabase";
import {
  INotificationsPreferences,
  NotificationsPreferencesOptions,
} from "../types/notifications.types";

export async function getNotificationsPreferencesFromUser(userId: string) {
  const preferencias: INotificationsPreferences = {
    reaccion: false,
    comentario: false,
    evento_interes: false,
  };

  const { data, error } = await supabase
    .from("preferencias_notificaciones")
    .select("*")
    .eq("id_usuario", userId);

  data.forEach((preferencia) => {
    if (preferencia.preferencia_notificacion === "reaccion") {
      preferencias.reaccion = true;
    }
    if (preferencia.preferencia_notificacion === "comentario") {
      preferencias.comentario = true;
    }
    if (preferencia.preferencia_notificacion === "evento_interes") {
      preferencias.evento_interes = true;
    }
  });

  return { preferencias, error };
}

export default async function changeNotificationPreferenceStatus(
  userId: string,
  preference: NotificationsPreferencesOptions
) {
  const { data, error } = await supabase
    .from("preferencias_notificaciones")
    .select("id")
    .eq("id_usuario", userId)
    .eq("preferencia_notificacion", preference);

  if (error) {
    return { newState: null, error };
  }

  // si ese arreglo esta vacio, es porque no se encontro ese registro, por lo que el estado actual es "false"/"desactivado"
  // hay que cambiarlo a "true/activado"
  if (data.length === 0) {
    const insertResult = await supabase
      .from("preferencias_notificaciones")
      .insert({ id_usuario: userId, preferencia_notificacion: preference });

    return { newState: true, error: insertResult.error };
  } else {
    const deleteResult = await supabase
      .from("preferencias_notificaciones")
      .delete()
      .eq("id_usuario", userId)
      .eq("preferencia_notificacion", preference);

    return { newState: false, error: deleteResult.error };
  }
}
