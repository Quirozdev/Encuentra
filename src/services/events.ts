import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { EventFields, EventImage } from "../types/events.types";
import { getMonthsDifferenceBetweenDates } from "../lib/dates";

export interface PriceDetail {
  month: string;
  price: number;
}

interface EventPayDetails {
  detailsText: string;
  priceDetails: PriceDetail[];
  total: number;
}

// (
//   categoria:id(id, nombre),
//   categoria:nombre(id, nombre)
// )

export async function getEventById(id: number) {
  const { data, error } = await supabase
    .from("eventos")
    .select(
      `id, nombre, descripcion, fecha, hora, duracion, latitud_ubicacion, longitud_ubicacion, nombre_estado, nombre_municipio, direccion, portada, categorias_eventos!inner(id_categoria)`
    )
    .eq("id", id);

  return data[0];
}

export async function createEvent(
  event: EventFields,
  categoryIds: number[],
  image: EventImage,
  userId: string
) {
  console.log("event???", event);
  const insertResult = await supabase
    .from("eventos")
    .insert({
      nombre: event.nombre,
      descripcion: event.descripcion,
      fecha: event.fecha,
      hora: event.hora,
      latitud_ubicacion: event.latitud_ubicacion,
      longitud_ubicacion: event.longitud_ubicacion,
      nombre_estado: event.nombre_estado,
      nombre_municipio: event.nombre_municipio,
      direccion: event.direccion,
      duracion: event.duracion,
      id_usuario: userId,
    })
    .select("id");

  // console.log(insertResult);

  // if (insertResult.error) {
  //   return insertResult.error;
  // }

  const eventId = insertResult.data[0].id;

  const pivotTableData = categoryIds.map((categoryId) => {
    return { id_evento: eventId, id_categoria: categoryId };
  });

  const bulkInsertResult = await supabase
    .from("categorias_eventos")
    .insert(pivotTableData);

  // if (bulkInsertResult.error) {
  //   return bulkInsertResult.error;
  // }

  const extension = image.uri.split(".").pop().toLowerCase();

  const rutaPortada = `${eventId}/main.${extension}`;

  const imageCreationResult = await supabase.storage
    .from("imagenes_eventos")
    .upload(rutaPortada, decode(image.base64), {
      contentType: `image/${extension}`,
    });

  // if (imageCreationResult.error) {
  //   return imageCreationResult.error;
  // }

  await supabase
    .from("eventos")
    .update({ portada: `main.${extension}` })
    .eq("id", eventId);

  return eventId;
}

export async function getEventPayDetails(
  userId: string,
  eventDate: Date
): Promise<EventPayDetails> {
  const { count, error } = await supabase
    .from("eventos")
    .select("*", { count: "exact", head: true })
    .eq("id_usuario", userId);

  if (count < 3) {
    return {
      detailsText: `Has publicado ${count} evento${
        count === 1 ? "" : "s"
      }, ¡puedes publicar ${3 - count} eventos más de manera gratuita!`,
      priceDetails: [
        {
          month: "Gratis",
          price: 0.0,
        },
      ],
      total: 0.0,
    };
  }

  // +1 porque se empieza a contar desde el primer dia en que se entra a un nuevo mes
  const monthsDifference =
    getMonthsDifferenceBetweenDates(new Date(), eventDate) + 1;

  const priceDetails: PriceDetail[] = [];
  for (let i = 1; i <= monthsDifference; i++) {
    priceDetails.push({ month: `Mes ${i}`, price: 10.0 });
  }

  const total = priceDetails.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

  return {
    detailsText: `Tienes ${monthsDifference} mes${
      monthsDifference === 1 ? "" : "es"
    } de anticipación a tu evento`,
    priceDetails: priceDetails,
    total: total,
  };
}
