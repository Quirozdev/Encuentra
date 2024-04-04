import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import FullScreenLoading from "../../../../components/common/FullScreenLoading/FullScreenLoading";
import { getEventById } from "../../../services/events";
import { Category } from "../../../types/categories.types";
import { EventFields, EventWithReactions } from "../../../types/events.types";
import EventDetailsComponent from "../../../../components/events/details/EventDetailsComponent";
import { EventsContext } from "../../../providers/EventsProvider";

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<EventWithReactions>(null);
  const [isEventLoading, setIsEventLoading] = useState(true);
  const {events} =useContext(EventsContext)


  useEffect(() => {
    setIsEventLoading(true);
    getEventById(Number(id))
      .then((eventInfo) => {
        setEvent(eventInfo);
      })
      .finally(() => {
        setIsEventLoading(false);
      });
      // async function fetchData() {
      //   // Call the subscribeEvent function and store the unsubscribe function
      //   const unsubscribe = await subscribeEvent(setEvent);
  
      //   // Unsubscribe when component unmounts
      //   return () => {
      //     unsubscribe();
      //   };
      // }
      // fetchData();
  }, []);

  if (event==null) {
    return (
      <FullScreenLoading loadingText="Cargando información del evento..." />
    );
  }


  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <EventDetailsComponent event={event} />
    </>
  );
}
