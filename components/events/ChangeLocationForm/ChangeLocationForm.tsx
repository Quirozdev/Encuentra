import { Text, View, Alert, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import styles from "./ChangeLocationForm.style";
import Select from "../../common/Select/Select";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../../../constants/theme";
import React from "react";
import * as Location from "expo-location";
import { getAllStates, getCitiesFromState, getGeographicInformationFromLatLong } from "../../../src/services/geography";
import { LocationContext } from "../../../src/providers/LocationProvider";
import { BottomSheetRefProps } from "../../common/BottomSheet/BottomSheet";
import { getUserLocation, updateUserLocation } from "../../../src/services/users";
import { AuthContext } from "../../../src/providers/AuthProvider";

interface ChangeLocationFormProps {
  // Define prop typses here
  scrollTo: (num:number) => void; // Example of an optional prop
}

const ChangeLocationForm: React.FC<ChangeLocationFormProps> = ({scrollTo}) => {
    const [listaEstados, setListaEstados] = useState([]);
    const [listaCiudades, setListaCiudades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [estado, setEstado] = useState(null);
    const [municipio, setMunicipio] = useState(null);
    const {location,setLocation} = useContext(LocationContext);
    const { session } = useContext(AuthContext);

    useEffect(()=>{
      getAllStates().then((res)=>{
        setListaEstados(res.data);
        let state = res.data.find(dict => dict.nombre === location.estado);
        getCiudades(state,location.municipio);
      })
    },[location])

    function handlePress(){
      updateUserLocation(session.user.id,estado.id,municipio.id);
      setLocation({municipio:municipio.nombre,estado:estado.nombre});
      scrollTo(0);
    }
    async function handleLocationClick() {
      setLoading(true);
      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Low});
      getGeographicInformationFromLatLong(location.coords.latitude,location.coords.longitude).then((data)=>{
        let state = listaEstados.find(dict => dict.nombre === data.results[0].state);
        getCiudades(state,data.results[0].county);
      });
      
    }

    function getCiudades(selectedEstado,ciudad=''){
      if(selectedEstado != undefined){
        getCitiesFromState(selectedEstado.id).then((res)=>{
          setListaCiudades(res.data)
          const ciudadSeleccionada = res.data.find((cd) => cd.nombre === ciudad );

          if (ciudadSeleccionada != undefined){
            setMunicipio({id:ciudadSeleccionada.id,nombre:ciudadSeleccionada.nombre});
          }else{
            setMunicipio(null);
          }
        });
        
        setEstado(selectedEstado);
        setLoading(false);
      }
      
    
    }
  

      return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        Cambia tu ubicación
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Por favor ingresa la ubicación en donde quieres buscar eventos.
                    </Text>
                </View>
               
                <View style={styles.select}>
                    <Select
                        placeholder="Estado"
                        data={listaEstados}
                        labelField="nombre"
                        valueField="id"
                        onChange={getCiudades}
                        value={estado}
                    />
                </View>
                <View style={styles.select}>
                        <Select
                            placeholder="Municipio"
                            data={listaCiudades}
                            labelField="nombre"
                            valueField="id"
                            onChange={setMunicipio}
                            value={municipio}
                        />
                </View>

{loading ?
<ActivityIndicator style={styles.location}/>
:
<TouchableOpacity onPress={handleLocationClick} style={styles.location}>
                <FontAwesome name="location-arrow" size={20} color={COLORS.grey} />
                  <Text style={{color:COLORS.grey}}>Utilizar mi ubicación actual</Text>
                </TouchableOpacity>

}
<View style={styles.buttonContainer}>
                <TouchableOpacity  style={styles.button} onPress={handlePress}>

            <Text style={styles.btnText}>Guardar cambios</Text>
        </TouchableOpacity>

                </View>
            </View>
)};

export default ChangeLocationForm;
