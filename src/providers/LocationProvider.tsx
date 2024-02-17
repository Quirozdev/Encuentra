import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import React from 'react';
import { getUserLocation } from '../services/users';
import { Location } from '../types/location.types';
interface ILocationContext {
  location: Location,
  setLocation: Dispatch<SetStateAction<Location>>;
}

const LocationContext = createContext<ILocationContext>({location:{
  estado: '',
  municipio: ''
},setLocation: ()=>{}});


const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    estado: '',
    municipio: ''
  });

  useEffect(()=>{
    getUserLocation().then((data)=> {
      setLocation(data.location);
    });
   },[]);
   
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
