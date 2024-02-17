import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Location } from "../types/location.types";

export async function getUserLocation(userId): Promise<{
  location: Location;
  error: PostgrestError;
}> {
  const { data, error } = await supabase
    .from("usuarios")
    .select(`
    estados(
      nombre
    ),
    municipios(
      nombre
    )
    `).eq('id',userId);
      const location: Location =  
      {
        estado:data[0].estados.nombre,
        municipio:data[0].municipios.nombre
      }
  return { location, error };
}

export async function updateUserLocation(userId,estadoId:number,municipioId:number) {
  const { data, error } = await supabase
    .from("usuarios")
    .update({estado:estadoId,municipio:municipioId}).eq('id',userId);
}
