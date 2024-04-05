import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { dateToString, timeToString } from '../lib/dates';
import { getFilteredEventsWithCategories, getFilteredEventsWithCategoriesNoLocation } from '../services/events';
import { CategoriesContext } from './CategoryProvider';
import { LocationContext, LocationContext2 } from './LocationProvider';
import { EventsContext } from './EventsProvider';
import { AuthContext } from './AuthProvider';

interface IFilterContext {
  startDate: any,
  setStartDate: Dispatch<SetStateAction<any>>,
  startHour: any,
  setStartHour: Dispatch<SetStateAction<any>>,
  estatus: any,
  setEstatus: Dispatch<SetStateAction<any>>,
  filterEvents: (cat:number[]) => void
}

const MyFilterContext = createContext<IFilterContext>({
  startDate:null,
  setStartDate: ()=>{},
  startHour:null,
  setStartHour: () =>{},
  estatus:null,
  setEstatus: () => {},
  // recibe un string y un array de numeros
  filterEvents: ([]) => {},
});


const MyFilterProvider = ({ children }) => {
  const [startDate, setStartDate] = useState(null);
  const [startHour, setStartHour] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endHour, setEndHour] = useState(null);
  const [estatus, setEstatus] = useState(null);
  const {location, setLocation} = useContext(LocationContext2);
  const {selectedCategories} = useContext(CategoriesContext);
  const {events,setEvents} = useContext(EventsContext);
  const { session } = useContext(AuthContext)

  function filterEvents(cat:number[]=[-1]) {
    const start = startDate !== null ? dateToString(startDate) : null;
    const end = endDate !== null ? dateToString(endDate) : null;
    const startTime = startHour !== null ? timeToString(startHour) : null;
    const endTime = endHour !== null ? timeToString(endHour) : null;
    if(cat.includes(-1)){
      cat = selectedCategories.length == 0 ? null : selectedCategories;
    }
    cat = cat.length == 0 ? null : cat;
    console.log(location);
    if (location.estado == null && location.municipio == null) {
      console.log("a");
      getFilteredEventsWithCategoriesNoLocation(
        start,
        startTime,
        end,
        endTime,
        cat
      ).then(({ data, error }) => filterStatus(data));
    } else {
      console.log("b");
      getFilteredEventsWithCategories(
        location,
        start,
        startTime,
        end,
        endTime,
        cat
      ).then(({ data, error }) => filterStatus(data));
    }
  }

  function filterStatus(data) {
    console.log(data);
    if (estatus != null) {
      console.log(estatus+"a");
      let filtered = data.filter((event) => event.estatus == estatus);
      setEvents(filtered);
    } else {
      setEvents(data);
    }
  }


  return (
    <MyFilterContext.Provider value={{ startDate, setStartHour, startHour, setStartDate, estatus, setEstatus, filterEvents}}>
      {children}
    </MyFilterContext.Provider>
  );
};

export { MyFilterContext, MyFilterProvider };
