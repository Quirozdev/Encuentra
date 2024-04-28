import { Image, ScrollView, Text, TouchableOpacity, View,TextInput,StyleSheet,SafeAreaView} from "react-native";
import styles from "./reportEventForm.style";
import { router, Stack } from "expo-router";
import { COLORS } from "../../../constants/theme";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { FONTS, SIZES } from "../../../constants/theme";
import { useEffect, useState } from "react";
import reportDataForm from "./reportDataForm.json";
import CheckBox from "../../common/CheckboxComponent/CheckboxComponent";
import GeneralPurposeButton from "../../common/GeneralPurposeButton/GeneralPurposeButton";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "../../../src/supabase";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";

const ReportEventForm = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [otherReason, setOtherReason] = useState('');
  const [noItemSelected, setNoItemSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useLocalSearchParams();
  const eventId = String(params.eventId);
  const userId = String(params.userId);
  
  const handleCheckboxChange = (itemId) => {
    setSelectedItem(itemId);
    setOtherReason('');
  };

  const handleOtherReasonChange = (text) => {
    setOtherReason(text);
  };

  const handleSubmit = async () => {
    if ((!selectedItem && !otherReason) || (selectedItem === 5 && !otherReason)) {
      setNoItemSelected(true);
      setTimeout(() => {
        setNoItemSelected(false);
      }, 3000);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from('reportes').insert([
      { 
        id_usuario: userId,
        id_evento: eventId,
        motivo:  selectedItem,
        otro: otherReason,
      }
    ]);
    if (error) {
      // console.log('Error:', error);
      return;
    }
    let showModals= true;
    router.push({pathname: "/", params: {showModal:true}});
    setLoading(false);

  };

  return (
    
    <SafeAreaView 
    style={{backgroundColor:COLORS.white,flex:1}}
    >
      <Stack.Screen
                options={{
                    headerTransparent: false,
                    headerShown: true,
                    headerTitleStyle: { color: "#414141", fontFamily: FONTS.RubikMedium, fontSize:20},
                    headerStyle: { backgroundColor: COLORS.white},
                    headerShadowVisible: false,
                    headerLeft: () => (
                      <ReturnButton/>
                    ),
                    headerTitle: "Selecciona un problema",
                }} />
      {loading && <LoadingScreen/>}
                <Text style={[noItemSelected && {color:COLORS.red},!noItemSelected && {color:COLORS.white},{alignSelf:'center', marginBottom:10,marginTop:10, fontFamily:FONTS.RubikRegular, fontSize:13}]}>Selecciona o escribe un motivo para hacer tu denuncia</Text>
      <ScrollView
       style={styles.container}
       >
        {reportDataForm.items.map((item) => (
          <View key={item.id} style={styles.itemView}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
            </View>
            <CheckBox
              error = {noItemSelected}
              style={styles.checkbox}
              value={selectedItem === item.id}
              onValueChange={() => handleCheckboxChange(item.id)}
            />
          </View>
        ))}
      <View style={[styles.itemView,{flexDirection:'column'}]}>
              <Text style={styles.itemTitle}>{reportDataForm.another.title}</Text>
              <TextInput value={otherReason} key={reportDataForm.another.id} style={[styles.anotherReasonTextInput,noItemSelected && styles.anotherReasonTextInputError]} onChangeText={handleOtherReasonChange} placeholder={reportDataForm.another.placeholder} onPressIn={() => handleCheckboxChange(reportDataForm.another.id)}/>
        </View>
        <GeneralPurposeButton title="Enviar" onPress={handleSubmit} buttonStyle={styles.sendButton}/>
        <GeneralPurposeButton title="Cancelar" onPress={() => router.back()} buttonStyle={styles.cancelButton} textStyle={styles.cancelButtonText}/>
      </ScrollView>
</SafeAreaView>
  );
};

export default ReportEventForm;