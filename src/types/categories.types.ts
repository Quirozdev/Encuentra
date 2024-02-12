import { Database } from "./database.types";

export type CategoryBasicInfo = Pick<
  Database["public"]["Tables"]["categorias"]["Row"],
  "id" | "nombre"
>;
