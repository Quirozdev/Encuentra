import { Text, View, ScrollView, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import styles from "./SelectLocationForm.style";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import SolidColorButton from "../../common/SolidColorButton/SolidColorButton";
import ModalOneButton from "../../common/Modal_1Button/Modal_1Button";
import Select from "../../common/Select/Select";

import { COLORS, FONTS } from "../../../constants/theme";

const SelectLocationForm = () => {
    const router = useRouter();
    const estados = [
        { label: "Estado1", value: "Estado1" },
        { label: "Estado2", value: "Estado2" },
        { label: "Estado3", value: "Estado3" },
        { label: "Estado4", value: "Estado4" },

    ];
    const municipios = [
        { label: "Municipio1", value: "Municipio1" },
        { label: "Municipio2", value: "Municipio2" },
        { label: "Municipio3", value: "Municipio3" },
        { label: "Municipio4", value: "Municipio4" },

    ];
    const localidades = [
        { label: "Localidades1", value: "Localidades1" },
        { label: "Localidades2", value: "Localidades2" },
        { label: "Localidades3", value: "Localidades3" },
        { label: "Localidades4", value: "Localidades4" },

    ];
    const [estado, setEstado] = useState(null);
    const [municipio, setMunicipio] = useState(null);
    const [localidad, setLocalidad] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handlePress = () => {
        if (estado && municipio) {
            Alert.alert("mandar a pantalla principal, loggeado");
        } else {
            setIsModalVisible(true);
        }
    }

      return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: {backgroundColor: COLORS.white},
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ReturnButton/>
                    ),
                    headerTitle: ""
                }}
            />
            <ScrollView style={styles.scrollView}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                        ¿En donde quieres buscar eventos?
                    </Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Por favor ingresa la ubicación en donde quieres buscar eventos.
                    </Text>
                </View>
                <View style={styles.selectEstado}>
                    <Select
                        placeholder="Estado *"
                        data={estados}
                        labelField="label"
                        valueField="value"
                        onChange={setEstado}
                        value={estado}
                    />
                </View>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1, marginLeft:10, marginRight: 10}}>
                        <Select
                            placeholder="Municipio *"
                            data={municipios}
                            labelField="label"
                            valueField="value"
                            onChange={setMunicipio}
                            value={municipio}
                        />
                    </View>
                    <View style={{flex:1, marginRight:10}}>
                        <Select
                            placeholder="Localidad"
                            data={localidades}
                            labelField="label"
                            valueField="value"
                            onChange={setLocalidad}
                            value={localidad}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <SolidColorButton
                    text="Continuar"
                    handleNavigate={() => {handlePress()}}
                    buttonColor={COLORS.lightPurple}
                    textColor={COLORS.white}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={{color:COLORS.red}}>
                        *
                        <Text style={styles.text}>
                            Campos son obligatorios
                        </Text>
                    </Text>
                </View>
            </ScrollView>
            <ModalOneButton
                isVisible={isModalVisible}
                title="ola"
                message="Por favor, llene los espacios necesarios."
                buttonText="Cerrar"
                onPress={() => {setIsModalVisible(false)}}
                buttonColor={COLORS.white}
                textColor={COLORS.lightOrange}
            />
        </SafeAreaView>
)};

export default SelectLocationForm;

