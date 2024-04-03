import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { dateToString, timeToString } from '../lib/dates';
import { getFilteredEventsWithCategories } from '../services/events';
import { CategoriesContext } from './CategoryProvider';
import { LocationContext } from './LocationProvider';
import { EventsContext } from './EventsProvider';

interface IFilterContext {
  startDate: any,
  setStartDate: Dispatch<SetStateAction<any>>,
  startHour: any,
  setStartHour: Dispatch<SetStateAction<any>>,
  endDate: any,
  setEndDate: Dispatch<SetStateAction<any>>,
  endHour: any,
  setEndHour: Dispatch<SetStateAction<any>>,
  filterEvents: (cat:number[]) => void
}

const MyFilterContext = createContext<IFilterContext>({
  startDate:null,
  setStartDate: ()=>{},
  startHour:null,
  setStartHour: () =>{},
  endDate:null,
  setEndDate: () => {},
  endHour:null,
  setEndHour: () => {},
  filterEvents: ([]) => {},
});


const MyFilterProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const {location} = useContext(LocationContext);
  const {selectedCategories} = useContext(CategoriesContext);
  const {setEvents} = useContext(EventsContext);

  function filterEvents(cat:number[]=[-1]) {
    const start = startDate !== null ? dateToString(startDate) : null;
    const end = endDate !== null ? dateToString(endDate) : null;
    const startTime = startHour !== null ? timeToString(startHour) : null;
    const endTime = endHour !== null ? timeToString(endHour) : null;
    if(cat.includes(-1)){
      cat = selectedCategories.length == 0 ? null : selectedCategories;
    }
    cat = cat.length == 0 ? null : cat;
    


    getFilteredEventsWithCategories(
      location,
      start,
      startTime,
      end,
      endTime,
      cat
    ).then(({ data, error }) => setEvents(data));

  }


  return (
    <MyFilterContext.Provider value={{ startDate, setStartHour,startHour, setStartDate,endDate, setEndDate, endHour, setEndHour,filterEvents}}>
      {children}
    </MyFilterContext.Provider>
  );
};

export { MyFilterContext, MyFilterProvider };
