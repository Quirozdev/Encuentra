export interface Event {
  name: string;
  description: string;
  date: string;
  hour: string;
  ubication_latitude: number;
  ubication_longitude: number;
  state_name: string;
  city_name: string;
  duration: number;
}

export interface EventImage {
  base64Img: string;
  extension: string;
}
