import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { getEventById } from "../../services/events";
import { EventFields, EventWithCategories } from "../../types/events.types";
import EventComponent from "../../../components/events/EventComponent";
import { Category } from "../../types/categories.types";
import FullScreenLoading from "../../../components/common/FullScreenLoading/FullScreenLoading";

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventWithCategories>(null);
  const [isEventLoading, setIsEventLoading] = useState(true);

  useEffect(() => {
    setIsEventLoading(true);
    getEventById(Number(id))
      .then((eventInfo) => {
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

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <EventComponent event={event} />
    </>
  );
}
