import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Event } from "../types/events.types";
import { Json } from "../types/database.types";
import { Location } from "../types/location.types";

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

  export async function getAllEventsWithCategories(
    location:Location,
    ) : Promise<{
    data:any[],
    error:PostgrestError
  }> {
    const { data, error } = await supabase.rpc('get_events_with_categories',{
      city_name:location.municipio,
      state_name:location.estado,
    });

    let parsedData = JSON.parse(JSON.stringify(data));
    if (parsedData == null) {
      parsedData = []
    }
    return { data: parsedData, error };
  }

  export async function getFilteredEventsWithCategories(
    location:Location,
    startDate:string | null,
    startTime:string | null,
    endDate:string | null,
    endTime:string | null,
    categories:number[] | null) : Promise<{
      data: any[];
      error: PostgrestError;
    }>{
    const { data, error } = await supabase.rpc('get_events_with_categories',{
      city_name:location.municipio,
      state_name:location.estado,
      filter_start_date:startDate,
      filter_end_date:endDate,
      filter_categories:categories,
      filter_end_time:endTime,
      filter_start_time:startTime
    });

    let parsedData = JSON.parse(JSON.stringify(data));

    if (parsedData == null) {
      parsedData = []
    }
    return { data: parsedData, error };
  }

