import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { Event } from "../types/events.types";
import { Json } from "../types/database.types";

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

  export async function getAllEventsWithCategories(): Promise<{
    data:any[],
    error:PostgrestError
  }> {
    const { data, error } = await supabase.rpc('get_events_with_categories');
    console.log(JSON.stringify(data))
    console.log(JSON.parse(JSON.stringify(data)))
    const parsedData = JSON.parse(JSON.stringify(data));
    return { data: parsedData, error };
  }

  export async function getFilteredEventsWithCategories(
    startDate:string | null,
    startTime:string | null,
    endDate:string | null,
    endTime:string | null,
    categories:number[] | null) : Promise<{
      data: any[];
      error: PostgrestError;
    }>{
    const { data, error } = await supabase.rpc('get_events_with_categories',{
      filter_start_date:startDate,
      filter_end_date:endDate,
      filter_categories:categories,
      filter_end_time:endTime,
      filter_start_time:startTime
    });

    const parsedData = JSON.parse(JSON.stringify(data));
    return { data: parsedData, error };
  }

