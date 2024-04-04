import React, { createContext, useState, useEffect } from 'react';
import { getUserProfileInformation } from '../services/users';
import LoadingScreen from '../../components/common/LoadingScreen/LoadingScreen';
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useFocusEffect } from 'expo-router';

// import { updateUserProfileInfo } from '../services/users'; se tendría que hacer un servicio para editar el perfil

interface IUserProfile{
  nombres: string,
  apellidos: string,
  email: string,
  estado: string,
  municipio: string,
  celular: string,
  foto: string,
  rol: string,
}

interface IUserProfileContext {
  userProfile: IUserProfile | null;
  error: any;
//   editProfile:(newProfile:any)=>Promise<void>,
}

const UserProfileContext = createContext<IUserProfileContext>({
  userProfile: null,
  error: null,
//   editProfile: async() =>{},
});

const UserProfileProvider = ({ children}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session } = useContext(AuthContext);
  useEffect(() => {
      setLoading(true);
      const fetchUserProfile = async () => {
        if(session){
        const { data, error } = await getUserProfileInformation(session.user.id);
        console.log(data.foto)
        setUserProfile(data);
        setError(error);
        setLoading(false);
      }else{
        setLoading(false);
      };
    }
    fetchUserProfile();
  }, [session]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setLoading(true);
  //     const fetchUserProfile = async () => {
  //       if(session){
  //       const { data, error } = await getUserProfileInformation(session.user.id);
  //       setUserProfile(data);
  //       setError(error);
  //       setLoading(false);
  //     }else{
  //       setLoading(false);
  //     };
  //   }
  //   fetchUserProfile();
  //   }, [session])
  // );

  if (loading) {
    return <LoadingScreen/>;
  }

//   const editProfile = async (newProfile) => {
//     const { data, error } = await updateUserProfileInfo(userId, newProfile);
//     if (!error) {
//       setUserProfile(data);
//     }
//     setError(error);
//   };

  return (
    <UserProfileContext.Provider value={{ userProfile, error,
    //  editProfile
     }}>
      {children}
    </UserProfileContext.Provider>
  );
};


export { UserProfileContext, UserProfileProvider };