import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import React from 'react';
import { getAllEventsWithCategories } from '../services/events';
interface IEventsContext {
  events: any[],
  setEvents: Dispatch<SetStateAction<any[]>>;
}

const EventsContext = createContext<IEventsContext>({events:[],setEvents: ()=>{}});


const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEventsWithCategories().then(({ orderedData, error }) => {
      setEvents(orderedData);
    });
  }, []);


  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export { EventsContext, EventsProvider };
