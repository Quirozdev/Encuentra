import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { getEventById } from "../../services/events";
import { EventFields } from "../../types/events.types";
import EventComponent from "../../../components/events/EventComponent";

export interface EventFieldsWithMainImage extends EventFields {
  id: number;
  portada: string;
}

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventFieldsWithMainImage>(null);
  const [isEventLoading, setIsEventLoading] = useState(false);

  useEffect(() => {
    setIsEventLoading(true);
    getEventById(Number(id))
      .then((eventInfo) => {
        console.log(eventInfo);
        setEvent(eventInfo);
      })
      .finally(() => {
        setIsEventLoading(false);
      });
  }, []);

  if (isEventLoading || !event) {
    return <ActivityIndicator />;
  }

  console.log("eventId: ", id);

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <EventComponent event={event} />
    </>
  );
}
