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
  updateUserProfile: (newProfile:IUserProfile)=>void;
}

const UserProfileContext = createContext<IUserProfileContext>({
  userProfile: null,
  error: null,
  updateUserProfile: (newProfile:IUserProfile)=>void {
      
  },
});

const UserProfileProvider = ({ children}) => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { session } = useContext(AuthContext);
  const updateUserProfile = (newProfile:IUserProfile) => {
    setUserProfile(newProfile)
  };


  useEffect(() => {
    setLoading(true);
    const fetchUserProfile = async () => {
      if(session){
        const { data, error } = await getUserProfileInformation(session.user.id);
        if (JSON.stringify(data) !== JSON.stringify(userProfile)) {
          setUserProfile(data);
        }
        setError(error);
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, [session]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setLoading(true);
  //     const fetchUserProfile = async () => {
  //       if(session){
  //         const { data, error } = await getUserProfileInformation(session.user.id);
  //         console.log(data.foto)
  //         console.log("tu print aqui",data)
  //         console.log(userProfile)
  //         if (JSON.stringify(data) !== JSON.stringify(userProfile)) {
  //           console.log("voy a cambiarl el user profile pa")
  //           setUserProfile(data);
  //         }
  //         setError(error);
  //         setLoading(false);
  //       }else{
  //         console.log("entró al else");
  //       }
  //     }
  //     fetchUserProfile();
  //   }, [session])
  // );

  if (loading && session) {
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
    <UserProfileContext.Provider value={{ userProfile, error, updateUserProfile
    //  editProfile
     }}>
      {children}
    </UserProfileContext.Provider>
  );
};


export { UserProfileContext, UserProfileProvider };