import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { StateBasicInfo } from "../types/geography.types";

export async function getAllStates(): Promise<{
  data: StateBasicInfo[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase.from("estados").select("id, nombre");
  return { data, error };
}

export async function getCitiesFromState(id_estado: StateBasicInfo["id"]) {
  const { data, error } = await supabase
    .from("municipios")
    .select("id, nombre")
    .eq("id_estado", id_estado);
  return { data, error };
}
