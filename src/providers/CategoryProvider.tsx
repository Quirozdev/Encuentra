import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { LocationContext } from './LocationProvider';
import { getAllCategories } from '../services/categories';
interface ICategoriesContext {
  categories: any[],
  setCategories: Dispatch<SetStateAction<any[]>>,
  selectedCategories: any[],
  setSelectedCategories: Dispatch<SetStateAction<any[]>>,
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>,
}

const CategoriesContext = createContext<ICategoriesContext>({
  categories:[],
  setCategories: ()=>{},
  selectedCategories:[],
  setSelectedCategories: () =>{},
  loading:false,
  setLoading: () => {}
});


const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    getAllCategories().then(({ data, error }) => {
      setCategories(data);

    }).then(()=>setLoading(false));
  }, []);


  return (
    <CategoriesContext.Provider value={{ categories, setCategories ,selectedCategories,setSelectedCategories,loading,setLoading}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export { CategoriesContext, CategoriesProvider };
