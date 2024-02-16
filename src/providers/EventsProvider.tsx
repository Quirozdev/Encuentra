import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { getAllEventsWithCategories } from '../services/events';
import { Json } from '../types/database.types';
import { LocationContext } from './LocationProvider';
interface IEventsContext {
  events: any[],
  setEvents: Dispatch<SetStateAction<any[]>>,
  unfilteredEvents: any[],
  setUnfilteredEvents: Dispatch<SetStateAction<any[]>>
}

const EventsContext = createContext<IEventsContext>({events:[],setEvents: ()=>{},unfilteredEvents:[],setUnfilteredEvents: () =>{}});


const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [unfilteredEvents, setUnfilteredEvents] = useState<any[]>([]);
  const {location} = useContext(LocationContext);

  useEffect(() => {
    getAllEventsWithCategories(location).then(({ data, error }) => {
      setEvents(data);
      setUnfilteredEvents(data)
    });
  }, [location]);


  return (
    <EventsContext.Provider value={{ events, setEvents ,unfilteredEvents,setUnfilteredEvents}}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
