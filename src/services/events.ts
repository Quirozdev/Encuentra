import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Event } from "../types/events.types";

async function insertEvent() {}

export async function getAllEvents(): Promise<{
    data: Event[];
    error: PostgrestError;
  }> {
    const { data, error } = await supabase
      .from("eventos")
      .select("*");
  
    return { data, error };
  }

  export async function getAllEventsWithCategories() {
    const { data, error } = await supabase
      .from('categorias_eventos')
      .select(`
      eventos (
        *
      ),
      categorias (
        emoji,
        color
      )
    `)
    const orderedData =reorderEventCategory(data);
  
    return { orderedData, error };
  }

  function reorderEventCategory(eventData){
    const uniqueEvents = [];
eventData.forEach((item) => {
  const existingEvent = uniqueEvents.find((event) => event.id === item.eventos.id);
  if (!existingEvent) {
    // If the event doesn't exist in the uniqueEvents array, add it
    uniqueEvents.push({
        ...item.eventos,
        categorias: [{emoji: item.categorias.emoji, color:item.categorias.color}]
    });
  } else {
    // If the event already exists, concatenate its emoji to the existing emoji string
    existingEvent.categorias.push({emoji: item.categorias.emoji, color:item.categorias.color})
  }
});
return uniqueEvents;
  }