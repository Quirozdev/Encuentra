import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Location } from "../types/location.types";
import { Reaction } from "../types/events.types";

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
    `).eq('id',userId).single();
      const location: Location =  
      {
        estado: data.estados?.nombre || '',
        municipio:data.municipios?.nombre || ''
      }
  return { location, error };
}

export async function updateUserLocation(userId,estadoId:number,municipioId:number) {
  const { data, error } = await supabase
    .from("usuarios")
    .update({estado:estadoId,municipio:municipioId}).eq('id',userId);
}

export async function updateReaction(reaccion:Reaction,userId:string,eventId:number) {
  const { data, error } = await supabase
  .from('reacciones')
  .upsert({ id_evento:eventId,id_usuario:userId, tipo_reaccion: reaccion, updated_at: new Date().toISOString() });
}

export async function deleteReaction(userId:string,eventId:number) {
  const { data, error } = await supabase
  .from('reacciones')
  .delete().eq('id_evento',eventId).eq('id_usuario',userId);
}

export async function getReaction(userId:string,eventId:number): 
Promise<{
  data: {
    tipo_reaccion: "Me gusta" | "No me gusta" | "Asistiré";
}[];
  error: PostgrestError;
}>  {
  const { data, error } = await supabase
  .from('reacciones')
  .select('tipo_reaccion').eq('id_evento',eventId).eq('id_usuario',userId);
   

  

  return {data,error}

}