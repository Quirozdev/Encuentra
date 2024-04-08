import { Category } from "./categories.types";
import { Database } from "./database.types";

export enum Reaction{
  like = 'Me gusta',
  assist = 'Asistiré',
  dislike = 'No me gusta'
}

export interface EventFields {
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  duracion: number;
  costo: number;
  id_usuario:string;
  latitud_ubicacion: number;
  longitud_ubicacion: number;
  nombre_estado: string;
  nombre_municipio: string;
  direccion: string;
}

export interface EventImage {
  base64: string;
  uri: string;
  width: number;
  height: number;
}

export interface EventWithReactions extends EventoReacciones {
  categorias: Array<Pick<Category, "id" | "nombre" | "color" | "emoji">>;
}

export interface EventWithCategories extends Event {
  categorias: Array<Pick<Category, "id" | "nombre" | "color" | "emoji">>;
}

export interface EventWithUserReactions extends Event {
  categorias: Array<Pick<Category, "id" | "nombre" | "color" | "emoji">>;
  comentarios: Array<Comentarios> |null
  reaccion_usuario: Reaction | null

}

export interface UserEventsWithActivities {
  date: string;
  events: Array<EventWithUserReactions>;

}
export type Comentarios = Database["public"]["Tables"]["comentarios"]["Row"];

export type Event = Database["public"]["Tables"]["eventos"]["Row"];

export type EventoReacciones = Database["public"]["Views"]["eventos_con_conteo_reacciones"]["Row"];