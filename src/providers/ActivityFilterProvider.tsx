import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { getAllUserEventsWithActivities } from '../services/events';
import { Reaction, UserEventsWithActivities } from '../types/events.types';
import { AuthContext } from './AuthProvider';
import { useFocusEffect } from 'expo-router';
import React from 'react';

interface IActivityFilterContext {
  filterUpcoming: boolean,
  setFilterUpcoming: Dispatch<SetStateAction<boolean>>,
  filterFinished: boolean,
  setFilterFinished: Dispatch<SetStateAction<boolean>>,
  includeComments: boolean,
  setIncludeComments: Dispatch<SetStateAction<boolean>>,
  filterReactions: Reaction[],
  setFilterReactions: Dispatch<SetStateAction<Reaction[]>>,
  activityEvents:any[],
  
  setActivityEvents: Dispatch<SetStateAction<UserEventsWithActivities[]>>,
  unfilteredEvents:any[],
  setUnfilteredEvents: Dispatch<SetStateAction<UserEventsWithActivities[]>>,
  selectedRadio: string,
  selectedMulti: string[],
  
  setSelectedMulti:Dispatch<SetStateAction<string[]>>,
  setSelectedRadio: Dispatch<SetStateAction<string>>,
  loading: boolean,
  
  setLoading:Dispatch<SetStateAction<boolean>>,
  filterEvents: (showComments:any,reactions:any) => void,
  resetFilters:()=>void
}

const ActivityFilterContext = createContext<IActivityFilterContext>({
  filterUpcoming: false,
setFilterUpcoming: () => {},
filterFinished: false,
setFilterFinished: () => {},
includeComments: true,
setIncludeComments: () => {},
filterReactions: [],
setFilterReactions: () => {},
activityEvents:[],

setActivityEvents: ()=>{},
unfilteredEvents:[],
setUnfilteredEvents:()=>{},
selectedRadio: '',
  
  setSelectedRadio:()=>{},
  selectedMulti: [],
  
  setSelectedMulti:()=>{},
  loading: true,
  
  setLoading:()=>{},
  filterEvents: () => {},
  resetFilters:() => {},
});
const reactions = ["Me gusta","No me gusta", "Asistiré","Comentarios"]
const date = 'Todos los eventos'

const ActivityFilterProvider = ({ children }) => {
  const [filterUpcoming, setFilterUpcoming] = useState(false);
  const [filterFinished, setFilterFinished] = useState(false);
  const [includeComments, setIncludeComments] = useState(true);
  const [filterReactions, setFilterReactions] = useState(null);
  const [unfilteredEvents, setUnfilteredEvents] = useState<UserEventsWithActivities[]>([]);
  const [selectedRadio,setSelectedRadio] = useState(date)
  const [selectedMulti,setSelectedMulti] = useState<string[]>(reactions)
  const { session } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  //const {setActivityEvents} = useContext(EventsContext);
  const [activityEvents, setActivityEvents] = useState<UserEventsWithActivities[]>([]);

  function filterEvents(showComments=null,reactions=null) {
    getAllUserEventsWithActivities(
      session.user.id,
      reactions != null ? reactions :  selectedMulti,
      filterUpcoming,
      filterFinished,
      showComments != null ? showComments : includeComments,
    ).then(({ data, error }) => setActivityEvents(data));

  }

  const fetchEvents = () => {
    setLoading(true);
    getAllUserEventsWithActivities(session.user.id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          setUnfilteredEvents(data);
          setActivityEvents(data);
        }
        setLoading(false);
      });
  };


  // useEffect for initial fetch
  useEffect(() => {
    fetchEvents();
  }, []);

   // Empty dependency array ensures it runs only once on mount
  useFocusEffect(
    React.useCallback(() => {
      resetFilters();
    }, [])
  );

  function resetFilters(){
    fetchEvents();
    setSelectedMulti(reactions);
    setSelectedRadio(date);
    setIncludeComments(true);
    setFilterUpcoming(false);
    setFilterFinished(false);
  }
  // useEffect(() => {
  //   const unsubscribeFocus = navigation.addListener('focus', () => {
  //     fetchEvents();
  //   });

  //   // Cleanup function
  //   return unsubscribeFocus;
  // }, [navigation]);


  return (
    <ActivityFilterContext.Provider value={{loading,setLoading,resetFilters,selectedMulti,setSelectedMulti,selectedRadio,setSelectedRadio,unfilteredEvents, setUnfilteredEvents,includeComments, setIncludeComments,filterFinished, setFilterFinished,filterUpcoming, setFilterUpcoming,filterReactions, setFilterReactions,filterEvents,activityEvents, setActivityEvents}}>
      {children}
    </ActivityFilterContext.Provider>
  );
};

export { ActivityFilterContext, ActivityFilterProvider };
