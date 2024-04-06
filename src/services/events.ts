import { decode } from "base64-arraybuffer";
import { supabase } from "../supabase";
import {
  EventFields,
  EventImage,
  EventWithCategories,
  EventWithReactions,
  Reaction,
  UserEventsWithActivities,
} from "../types/events.types";
import { dateToString, getMonthsDifferenceBetweenDates } from "../lib/dates";
import { PostgrestError } from "@supabase/supabase-js";
import { Event } from "../types/events.types";
import { Json } from "../types/database.types";
import { Location } from "../types/location.types";
import { useContext } from "react";
import { EventsContext } from "../providers/EventsProvider";
import { LocationContext } from "../providers/LocationProvider";

export interface PriceDetail {
  month: string;
  price: number;
}

export interface EventPayDetails {
  detailsText: string;
  priceDetails: PriceDetail[];
  total: number;
}

export async function getOrganizador(idUser: string) {
  const { data, error } = await supabase
    .from("usuarios")
    .select(`*`)
    .eq("id", idUser);

  return data[0];
}

export async function getEventById(id: number) {
  const { data, error } = await supabase
    .from("eventos_con_conteo_reacciones")
    .select(
      `*, categorias (
        id,
        nombre,
        color,
        emoji
      )`
    )
    .eq("id", id);

  return data[0];
}

// export async function subscribeEvent(setEvent){
//   const subscription = supabase
//       .channel('public:reacciones')
//       .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'reacciones' },
//       (payload) => updateEvent(Number(payload.new.id_evento),setEvent))
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reacciones' },
//       (payload) => updateEvent(Number(payload.new.id_evento),setEvent)).subscribe()

//     // Unsubscribe when component unmounts
//     return () => {
//       subscription.unsubscribe();
//     };
// }

function updateEvent(eventId: number, setEvent) {
  getEventById(eventId).then((eventInfo) => {
    setEvent(eventInfo);
  });
}

export async function subscribeEvents(setEvents, location: Location) {
  const subscription = supabase
    .channel("public:reacciones")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "reacciones" },
      (payload) => {
        getAllEventsWithCategories(location).then(({ data, error }) => {
          setEvents(data);
        });
      }
    )
    .subscribe();

  // Unsubscribe when component unmounts
  return () => {
    subscription.unsubscribe();
  };
}

export async function createEvent(
  event: EventFields,
  categoryIds: number[],
  image: EventImage,
  userId: string
) {
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
      costo: event.costo,
      id_usuario: userId,
    })
    .select("id");

  // console.log(insertResult);

  // if (insertResult.error) {
  //   return insertResult.error;
  // }

  const eventId = insertResult.data[0].id;

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

  const pivotTableData = categoryIds.map((categoryId) => {
    return { id_evento: eventId, id_categoria: categoryId };
  });

  const bulkInsertResult = await supabase
    .from("categorias_eventos")
    .insert(pivotTableData);

  // if (bulkInsertResult.error) {
  //   return bulkInsertResult.error;
  // }

  const { data: publicUrlData } = await supabase.storage
    .from("imagenes_eventos")
    .getPublicUrl(rutaPortada);

  await supabase
    .from("eventos")
    .update({ portada: publicUrlData.publicUrl })
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

export async function getAllEvents(): Promise<{
  data: Event[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase.from("eventos").select("*");

  return { data, error };
}

export async function getAllEventsWithCategories(location: Location,finished=false): Promise<{
  data: EventWithReactions[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase.rpc(
    "get_events_with_categories_and_reactions",
    {
      city_name: location.municipio,
      state_name: location.estado,
      filter_start_date: !finished ? dateToString(new Date()) : null
    }
  );

  let parsedData: EventWithReactions[] = JSON.parse(JSON.stringify(data));
  if (parsedData == null) {
    parsedData = [];
  }
  return { data: parsedData, error };
}

export async function getAllUserEventsWithActivities(userId: string,filterReactions: string[] = null,
  filterUpcoming: boolean = false,
  filterFinished: boolean = false,
  includeComments: boolean = true): Promise<{
  data: UserEventsWithActivities[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase.rpc(
    "get_user_filtered_events_with_reactions_and_comments",
    {
      user_id: userId,
        filter_reactions: filterReactions,
          filter_upcoming: filterUpcoming,
          filter_finished: filterFinished,
          include_comments: includeComments
    }
  );

  let parsedData: UserEventsWithActivities[] = JSON.parse(JSON.stringify(data));
  if (parsedData == null) {
    parsedData = [];
  }
  return { data: parsedData, error };
}

export async function getFilteredEventsWithCategories(
  location: Location,
  startDate: string | null,
  startTime: string | null,
  endDate: string | null,
  endTime: string | null,
  categories: number[] | null
): Promise<{
  data: any[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase.rpc(
    "get_events_with_categories_and_reactions",
    {
      city_name: location.municipio,
      state_name: location.estado,
      filter_start_date: startDate,
      filter_end_date: endDate,
      filter_categories: categories,
      filter_end_time: endTime,
      filter_start_time: startTime,
    }
  );

  let parsedData = JSON.parse(JSON.stringify(data));

  if (parsedData == null) {
    parsedData = [];
  }
  return { data: parsedData, error };
}
