import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function CrearEvento() {
  return (
    <View>
      <Text>Creando evento!</Text>
      <Link
        href={'/'}
        style={{ backgroundColor: 'green', padding: 12, borderRadius: 8 }}
      >
        Volver a la pagina principal
      </Link>
    </View>
  );
}
