import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { getAllEventsWithCategories } from '../services/events';
import { Json } from '../types/database.types';
import { LocationContext } from './LocationProvider';
interface IEventsContext {
  events: any[],
  setEvents: Dispatch<SetStateAction<any[]>>,
  unfilteredEvents: any[],
  setUnfilteredEvents: Dispatch<SetStateAction<any[]>>,
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
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [unfilteredEvents, setUnfilteredEvents] = useState<any[]>([]);
  const {location} = useContext(LocationContext);

  useEffect(() => {
    setLoading(true);
    getAllEventsWithCategories(location).then(({ data, error }) => {
      setEvents(data);
      setUnfilteredEvents(data)
      
    }).then(()=>setLoading(false));
  }, [location]);


  return (
    <EventsContext.Provider value={{ events, setEvents ,unfilteredEvents,setUnfilteredEvents,loading,setLoading}}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
