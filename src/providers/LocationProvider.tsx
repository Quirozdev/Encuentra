import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { getUserLocation } from '../services/users';
import { Location } from '../types/location.types';
import { AuthContext } from './AuthProvider';
interface ILocationContext {
  location: Location,
  setLocation: Dispatch<SetStateAction<Location>>;
}

const LocationContext = createContext<ILocationContext>({location:{
  estado: '',
  municipio: ''
},setLocation: ()=>{}});


const LocationProvider = ({ children }) => {
  const { session } = useContext(AuthContext);
  const [location, setLocation] = useState({
    estado: '',
    municipio: ''
  });

  useEffect(()=>{
    console.log(session);
    if (session != null){
      console.log('aqui1');
      getUserLocation(session.user.id).then((data)=> {
        console.log('aqui');
        setLocation(data.location);
        console.log(data.location);
      });
    }
    
   },[session]);
   
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
