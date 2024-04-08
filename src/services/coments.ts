import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Coments} from "../types/coments.types";

export async function getAllComentsFromEvent(idEvento: string): Promise<{
  data: Pick<Coments, "id" | "comentario" | "id_usuario" | "id_evento"| "fecha" |"hora">[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase
    .from("comentarios")
    .select("id, comentario, id_usuario,id_evento,fecha,hora")
    .eq("id_evento",idEvento);

  return { data, error };
}

export async function addComent(comentario: string,idEvento: number, idUsuario: string): Promise<{
  data: Coments;
  error: PostgrestError;
}> {
  const { data, error } = await supabase
    .from("comentarios")
    .insert({
      id_evento: idEvento,
      id_usuario: idUsuario,
      comentario: comentario,
    })
    .single();

  return { data, error };
}
export async function getAutor(idUser: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select(`*`)
    .eq("id", idUser);

  return data[0];
}
