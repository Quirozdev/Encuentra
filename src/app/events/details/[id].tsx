import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import FullScreenLoading from "../../../../components/common/FullScreenLoading/FullScreenLoading";
import { getEventById } from "../../../services/events";
import { Category } from "../../../types/categories.types";
import { EventFields } from "../../../types/events.types";
import EventDetailsComponent from "../../../../components/events/details/EventDetailsComponent";
export interface EventFieldsViewProps extends EventFields {
  id: number;
  categorias: Array<Pick<Category, "id" | "nombre" | "color" | "emoji">>;
  portada: string;
}

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventFieldsViewProps>(null);
  const [isEventLoading, setIsEventLoading] = useState(true);

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

  if (isEventLoading) {
    return (
      <FullScreenLoading loadingText="Cargando información del evento..." />
    );
  }

  console.log("eventId: ", id);

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <EventDetailsComponent event={event} />
    </>
  );
}
