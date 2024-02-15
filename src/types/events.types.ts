export interface Event {
  name: string;
  description: string;
  date: string;
  hour: string;
  ubication_latitude: number;
  ubication_longitude: number;
  state_name: string;
  city_name: string;
  direction: string;
  duration: number;
}

export interface EventImage {
  base64: string;
  uri: string;
  width: number;
  height: number;
}
