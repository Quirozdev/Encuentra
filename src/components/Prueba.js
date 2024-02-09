import { Alert, Text, View } from 'react-native';
import { supabase } from '../supabase';
import { useEffect, useState } from 'react';

export default function Prueba() {
  const [textos, setTextos] = useState([]);
  const [cargando, setCargando] = useState(false);

  console.log(textos);

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      const { data, error } = await supabase.from('tabla_prueba').select('*');
      if (error) {
        Alert.alert(error.message);
      } else {
        setTextos(data);
      }
      setCargando(false);
    }
    fetchData();
  }, []);

  return (
    <View>
      {cargando ? (
        <Text>Cargando...</Text>
      ) : (
        textos.map((elemento) => {
          return (
            <Text key={elemento.id}>
              {elemento.id} - {elemento.texto}
            </Text>
          );
        })
      )}
    </View>
  );
}
