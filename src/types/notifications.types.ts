import { Database } from "./database.types";

export type Notification =
  Database["public"]["Tables"]["notificaciones"]["Row"];

export type NotificationsPreferencesOptions =
  | "reaccion"
  | "comentario"
  | "evento_interes";

export interface INotificationsPreferences {
  reaccion: boolean;
  comentario: boolean;
  evento_interes: boolean;
}
