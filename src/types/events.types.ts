import { Database } from "./database.types";

export interface EventFields {
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  duracion: number;
  costo: number;
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

export type Event = Database["public"]["Tables"]["eventos"]["Row"];
