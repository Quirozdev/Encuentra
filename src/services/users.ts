import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { User } from "../types/users.types";
import { Location } from "../types/location.types";
const userId='3e6e276c-c629-404c-b3b4-be6cc0eb904c';

export async function getUserLocation(): Promise<{
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

export async function updateUserLocation(estadoId:number,municipioId:number) {
  const { data, error } = await supabase
    .from("usuarios")
    .update({estado:estadoId,municipio:municipioId}).eq('id',userId);
}
