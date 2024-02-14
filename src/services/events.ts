import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { Event, EventImage } from "../types/events.types";

export async function createEvent(
  event: Event,
  categoryIds: number[],
  image: EventImage
) {
  const insertResult = await supabase
    .from("eventos")
    .insert({
      nombre: event.name,
      descripcion: event.description,
      fecha: event.date,
      hora: event.hour,
      latitud_ubicacion: event.ubication_latitude,
      longitud_ubicacion: event.ubication_longitude,
      nombre_estado: event.state_name,
      nombre_municipio: event.city_name,
      duracion: event.duration,
    })
    .select("id");

  if (insertResult.error) {
    return insertResult.error;
  }

  const eventId = insertResult.data[0].id;

  const pivotTableData = categoryIds.map((categoryId) => {
    return { id_evento: eventId, id_categoria: categoryId };
  });

  const bulkInsertResult = await supabase
    .from("categorias_eventos")
    .insert(pivotTableData);

  if (bulkInsertResult.error) {
    return bulkInsertResult.error;
  }

  const imageCreationResult = await supabase.storage
    .from("imagenes_eventos")
    .upload(`${eventId}/mainPhoto.${image.extension}`, decode(image.base64Img));

  if (imageCreationResult.error) {
    return imageCreationResult.error;
  }
}
