import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import React from 'react';
interface ILocationContext {
  location: {estado:string,ciudad:string},
  setLocation: Dispatch<SetStateAction<{estado:string,ciudad:string}>>;
}

const LocationContext = createContext<ILocationContext>({location:{
  estado: '',
  ciudad: ''
},setLocation: ()=>{}});


const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    estado: '',
    ciudad: ''
  });

  useEffect(() => {
    // getAllLocationWithCategories().then(({ orderedData, error }) => {
    //   setLocation(orderedData);
    // });
  }, []);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationContext, LocationProvider };
