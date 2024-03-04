import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { getAllEventsWithCategories, subscribeEvents } from '../services/events';
import { Json } from '../types/database.types';
import { LocationContext } from './LocationProvider';
import { EventWithReactions } from '../types/events.types';
import { supabase } from '../supabase';
import { useFocusEffect } from 'expo-router';
interface IEventsContext {
  events: any[],
  setEvents: Dispatch<SetStateAction<EventWithReactions[]>>,
  unfilteredEvents: any[],
  setUnfilteredEvents: Dispatch<SetStateAction<EventWithReactions[]>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
}

const EventsContext = createContext<IEventsContext>({
  events:[],
  setEvents: ()=>{},
  unfilteredEvents:[],
  setUnfilteredEvents: () =>{},
  loading:false,
  setLoading: () => {}
});


const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState<EventWithReactions[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unfilteredEvents, setUnfilteredEvents] = useState<EventWithReactions[]>([]);
  const {location} = useContext(LocationContext);

  // useEffect(() => {
  //   setLoading(true);
  //   if( location.estado != null && location.municipio !=null){
  //   getAllEventsWithCategories(location).then(({ data, error }) => {
  //     setEvents(data);
  //     setUnfilteredEvents(data)
    
  //   }).then(()=>setLoading(false));
  // }
  // }, [location]);


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
    if( location.estado != null && location.municipio !=null){
    getAllEventsWithCategories(location).then(({ data, error }) => {
      setEvents(data);
      setUnfilteredEvents(data)
    
    }).then(()=>setLoading(false));
  }
    }, [location])
  );

  return (
    <EventsContext.Provider value={{ events, setEvents ,unfilteredEvents,setUnfilteredEvents,loading,setLoading}}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
