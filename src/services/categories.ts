import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Category } from "../types/categories.types";

export async function getAllCategories(): Promise<{
  data: Pick<Category, "id" | "nombre" | "emoji" | "color">[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase
    .from("categorias")
    .select("id, nombre, emoji,color");

  return { data, error };
}
