import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Category, CategoryWithSelectedValue } from "../types/categories.types";

export async function getAllCategories(): Promise<{
  data: Pick<Category, "id" | "nombre" | "emoji" | "color">[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase
    .from("categorias")
    .select("id, nombre, emoji,color");

  return { data, error };
}

export async function getFavoriteCategoriesFromUser(userId: string) {
  let { data, error } = await supabase.rpc(
    "get_preferred_categories_from_user",
    {
      user_id: userId,
    }
  );

  const favoriteCategories = data as unknown as CategoryWithSelectedValue[];

  return { favoriteCategories, error };
}

export async function saveFavoriteCategories(
  userId: string,
  categoryIds: number[]
) {
  const pivotTableData = categoryIds.map((categoryId) => {
    return { id_usuario: userId, id_categoria: categoryId };
  });

  const { data, error } = await supabase
    .from("categorias_preferidas")
    .insert(pivotTableData);

  return { data, error };
}

export async function deleteFavoriteCategories(userId: string) {
  const { data, error } = await supabase
    .from("categorias_preferidas")
    .delete()
    .eq("id_usuario", userId);

  return { data, error };
}

export async function createCategory(
  category: Pick<Category, "nombre" | "emoji" | "color">
) {
  const { data, error } = await supabase.from("categorias").insert({
    nombre: category.nombre,
    emoji: category.emoji,
    color: category.color,
  });

  return data;
}
