import { Database } from "./database.types";

export type StateBasicInfo = Pick<
  Database["public"]["Tables"]["estados"]["Row"],
  "id" | "nombre"
>;

export type CityBasicInfo = Pick<
  Database["public"]["Tables"]["municipios"]["Row"],
  "id" | "nombre"
>;

type GeographicInfo = {
  name: string;
  country: string;
  country_code: string;
  state: string;
  city: string;
  county: string;
  bbox: {
    lat1: number;
    lat2: number;
    lon1: number;
    lon2: number;
  };
  postcode: string;
  district: string;
  neighbourhood: string;
  suburb: string;
  street: string;
  housenumber: string;
  lon: number;
  lat: number;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  place_id: string;
};

export type GeographicApiInfoResult = {
  results: GeographicInfo[];
};
