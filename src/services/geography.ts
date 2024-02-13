import { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import {
  GeographicApiInfoResult,
  StateBasicInfo,
} from "../types/geography.types";
import { GEOAPIFY_KEY } from "@env";
import axios from "axios";

const geoapifyKey = GEOAPIFY_KEY;

export async function getAllStates(): Promise<{
  data: StateBasicInfo[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase.from("estados").select("id, nombre");
  return { data, error };
}

export async function getCitiesFromState(
  id_estado: StateBasicInfo["id"]
): Promise<{
  data: StateBasicInfo[];
  error: PostgrestError;
}> {
  const { data, error } = await supabase
    .from("municipios")
    .select("id, nombre")
    .eq("id_estado", id_estado);
  return { data, error };
}

export async function geocodeFromCityAndState(city: string, state: string) {
  const { data } = await axios.get<GeographicApiInfoResult>(
    `https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=${geoapifyKey}`
  );
  return data;
}

export async function getGeographicInformationFromLatLong(
  latitude: number,
  longitude: number
) {
  const { data } =
    await axios.get<GeographicApiInfoResult>(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${geoapifyKey}
  `);
  return data;
}
