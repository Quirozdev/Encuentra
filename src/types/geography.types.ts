import { Database } from "./database.types";

export type StateBasicInfo = Pick<
  Database["public"]["Tables"]["estados"]["Row"],
  "id" | "nombre"
>;

export type CityBasicInfo = Pick<
  Database["public"]["Tables"]["municipios"]["Row"],
  "id" | "nombre"
>;
