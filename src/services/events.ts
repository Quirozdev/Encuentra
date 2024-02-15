import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import { Event, EventImage } from "../types/events.types";
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

export async function createEvent(
  event: Event,
  categoryIds: number[],
  image: EventImage,
  userId: string
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
      direccion: event.direction,
      duracion: event.duration,
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

  const rutaPortada = `${eventId}/main.${image.extension}`;

  // const si = image.base64Img;
  // console.log("si", si);

  try {
    const imageCreationResult = await supabase.storage
      .from("imagenes_eventos")
      .upload(rutaPortada, decode(image.base64Img));
  } catch (error) {
    console.error(error);
  }

  // if (imageCreationResult.error) {
  //   return imageCreationResult.error;
  // }

  await supabase
    .from("eventos")
    .update({ portada: rutaPortada })
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
