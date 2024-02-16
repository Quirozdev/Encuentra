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

const ChangeLocationForm = () => {
    const [listaEstados, setListaEstados] = useState([]);
    const [listaCiudades, setListaCiudades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [estado, setEstado] = useState(null);
    const [municipio, setMunicipio] = useState(null);
    const {setLocation} = useContext(LocationContext);

    useEffect(()=>{
      getAllStates().then((res)=>setListaEstados(res.data))
      
    },[])

    function handlePress(){
      setLocation({ciudad:municipio,estado:estado})
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
      getCitiesFromState(selectedEstado.id).then((res)=>{
        setListaCiudades(res.data)

        if (ciudad != ''){
          const ciudadSeleccionada = res.data.find((cd) => cd.nombre === ciudad );
          setMunicipio({id:ciudadSeleccionada.id,nombre:ciudadSeleccionada.nombre});
        }else{
          setMunicipio(null);
        }
      });
      
      setEstado(selectedEstado);
      setLoading(false);
      
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
