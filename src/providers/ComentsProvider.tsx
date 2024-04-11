import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { getAllComentsFromEvent } from '../services/coments';

interface IComentsContext {
  coments: any[],
  setComents: Dispatch<SetStateAction<any[]>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
}

const ComentsContext = createContext<IComentsContext>({
  coments:[],
  setComents: ()=>{},
  loading:false,
  setLoading: () => {}
});

interface ComentsProviderProps {
  idEvento: string; // Aquí defines la prop idEvento
  children: React.ReactNode;
}

const ComentsProvider = ({ idEvento, children }: ComentsProviderProps) => {
  const [coments, setComents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("Parranda extrema ujjuuuuuu!!!!")

  useEffect(() => {
    setLoading(true);
    // Aquí pasas el idEvento a la función getAllComentsFromEvent()
    getAllComentsFromEvent(idEvento).then(({ data, error }) => {
      setComents(data);
      console.log(idEvento);
    }).then(() => setLoading(false));
  }, [idEvento]); // Asegúrate de agregar idEvento a las dependencias de useEffect

  return (
    <ComentsContext.Provider value={{ coments, setComents, loading, setLoading }}>
      {children}
    </ComentsContext.Provider>
  );
};

export { ComentsContext, ComentsProvider };
