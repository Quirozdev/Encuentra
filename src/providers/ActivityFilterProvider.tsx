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
  filterEvents: (showComments:any,reactions:any) => void
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
  filterEvents: () => {},
});


const ActivityFilterProvider = ({ children }) => {
  const [filterUpcoming, setFilterUpcoming] = useState(false);
  const [filterFinished, setFilterFinished] = useState(false);
  const [includeComments, setIncludeComments] = useState(true);
  const [filterReactions, setFilterReactions] = useState(null);
  const [unfilteredEvents, setUnfilteredEvents] = useState<UserEventsWithActivities[]>([]);
  const [selectedRadio,setSelectedRadio] = useState('Todos los eventos')
  const [selectedMulti,setSelectedMulti] = useState<string[]>(["Me gusta","No me gusta", "Asistiré","Comentarios"])
  const { session } = useContext(AuthContext);
  //const {setActivityEvents} = useContext(EventsContext);
  const [activityEvents, setActivityEvents] = useState<UserEventsWithActivities[]>([]);

  function filterEvents(showComments=null,reactions=null) {
    console.log('comments',includeComments)
    getAllUserEventsWithActivities(
      session.user.id,
      reactions != null ? reactions :  selectedMulti,
      filterUpcoming,
      filterFinished,
      showComments != null ? showComments : includeComments,
    ).then(({ data, error }) => {console.log(activityEvents);setActivityEvents(data)});

  }

  const fetchEvents = () => {
    getAllUserEventsWithActivities(session.user.id)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          setUnfilteredEvents(data);
          setActivityEvents(data);
        }
      });
  };


  // useEffect for initial fetch
  useEffect(() => {
    fetchEvents();
  }, []);

   // Empty dependency array ensures it runs only once on mount
  useFocusEffect(
    React.useCallback(() => {
      fetchEvents();
  
    }, [])
  );
  // useEffect(() => {
  //   const unsubscribeFocus = navigation.addListener('focus', () => {
  //     fetchEvents();
  //   });

  //   // Cleanup function
  //   return unsubscribeFocus;
  // }, [navigation]);


  return (
    <ActivityFilterContext.Provider value={{selectedMulti,setSelectedMulti,selectedRadio,setSelectedRadio,unfilteredEvents, setUnfilteredEvents,includeComments, setIncludeComments,filterFinished, setFilterFinished,filterUpcoming, setFilterUpcoming,filterReactions, setFilterReactions,filterEvents,activityEvents, setActivityEvents}}>
      {children}
    </ActivityFilterContext.Provider>
  );
};

export { ActivityFilterContext, ActivityFilterProvider };
