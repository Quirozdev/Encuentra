import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import { getUserLocation } from '../services/users';
import { Location } from '../types/location.types';
import { AuthContext } from './AuthProvider';
import { useNavigation, useRouter } from 'expo-router';
interface ILocationContext {
  location: Location,
  setLocation: Dispatch<SetStateAction<Location>>;
}

const LocationContext = createContext<ILocationContext>({location:{estado:null,municipio:null},setLocation: ()=>{}});
const LocationContext2 = createContext<ILocationContext>({location:{estado:null,municipio:null},setLocation: ()=>{}});

const LocationProvider = ({ children }) => {
  const { session } = useContext(AuthContext);
  const [location, setLocation] = useState({estado:null,municipio:null});

  useEffect(()=>{
    console.log(session)
    if (session != null){
      getUserLocation(session.user.id).then((data)=> {
        setLocation(data.location);
        console.log(data.location)
      });
    }
    
   },[session]);
   
  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationContext2, LocationProvider };
