import { Database } from "./database.types";

export type Category = Database["public"]["Tables"]["categorias"]["Row"];

export interface CategoryWithSelectedValue
  extends Omit<Category, "created_at"> {
  preferida: boolean;
}
