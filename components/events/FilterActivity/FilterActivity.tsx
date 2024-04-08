import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { getAllCategories } from "../../../src/services/categories";
import { ActivityFilterContext } from "../../../src/providers/ActivityFilterProvider";
import SelectionGroup, { SelectionHandler } from 'react-native-selection-group';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RadioButton from "../../common/RadioButton/RadioButton";
import Select from "../../common/SelectButton/SelectButton";
interface SelectableCategory {
  id: number;
  emoji: string;
  text: string;
  color: string;
  emojiAndText: string;
}

interface RadioOption {
  text: string;
  value: string;
  icon: string;
}

// interface MultiOption{
//   value: string;
//   color: string;
// }

interface FilterActivityProps {
  // Define prop typses here
  scrollTo: (num:number) => void; 
}
const radioOptions: RadioOption[] = [
    {
      text: 'Todos los eventos',
      value: 'todos',
      icon: "format-list-bulleted",
    },
    {
      text: 'Eventos próximos',
      value: 'upcoming',
      icon: "calendar-clock-outline",
    },
    {
      text: 'Eventos concluidos',
      value: 'finished',
      icon: "calendar-remove-outline",
    }
  ];
  const multiOptions = ["Me gusta","No me gusta", "Asistiré","Comentarios"]; 
  // const multiOptions: MultiOption[] = [
  //   {
  //     value:  "Me gusta",
  //     color:  "#2096F3"
  //   },
  //   {
  //     value:  "No me gusta",
  //     color:  "#FD6767"
  //   },
  //   {
  //     value:  "Asistiré",
  //     color:  "#FEC83C"
  //   },
  //   {
  //     value:  "Comentarios",
  //     color:  "#67FD6D"
  //   }
  // ];

  const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const FilterActivity: React.FC<FilterActivityProps> = ({ scrollTo }) => {
  const [formkey, setFormKey] = useState(new Date().toISOString());
  const {selectedMulti,setSelectedMulti,selectedRadio,setSelectedRadio,includeComments, setIncludeComments,filterFinished, setFilterFinished,filterUpcoming, setFilterUpcoming,filterReactions, setFilterReactions,filterEvents,activityEvents, setActivityEvents,unfilteredEvents, setUnfilteredEvents} = useContext(ActivityFilterContext);
  
  function filter() {
    filterEvents(null,null);
    scrollTo(SCREEN_HEIGHT);
  }

  function clearFilter() {
    setIncludeComments(true);
    setFilterFinished(false);
    setFilterUpcoming(false);
    setFilterReactions(null);
    setSelectedMulti(multiOptions);
    setSelectedRadio('Todos los eventos');
    setFormKey(new Date().toISOString());
    setActivityEvents(unfilteredEvents);
    scrollTo(SCREEN_HEIGHT);
  }


  function setSelected(text:string,value: string){
    switch (value){
      case 'todos':
        setFilterFinished(false);
        setFilterUpcoming(false);
        break;
      case 'upcoming':
        setFilterFinished(false);
        setFilterUpcoming(true);
        break;
      case 'finished':
        setFilterFinished(true);
        setFilterUpcoming(false);
        break;
    }
    console.log(text);
    console.log(selectedRadio);
    setSelectedRadio(text);
  }

  function setSelectedReactions(value: string){
    selectedMulti.includes(value) ? setSelectedMulti(prevState => prevState.filter(item => item !== value)) : setSelectedMulti([...selectedMulti,value]);


    if (value=='Comentarios'){
      setIncludeComments(!includeComments);
    }
    
  }


  return (
    <View key={formkey} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filtrar</Text>
        <TouchableOpacity onPress={clearFilter} style={styles.clearBtn}>
          <Text style={{ fontSize: 12, color: COLORS.grey }}>
            Borrar filtros
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:15}}>
  <View style={{flex: 0.05, height: 1, backgroundColor: COLORS.grey}} />
  <View>
    <Text style={[styles.title,{width:45}]}>Fecha</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: COLORS.grey}} />
</View>

      {radioOptions.map((option)=>
      <RadioButton key={option.value} isSelected={option.text==selectedRadio} icon={option.icon} text={option.text} onPress={()=>setSelected(option.text,option.value)
      }/>
      )}
      
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:15}}>
  <View style={{flex: 0.05, height: 1, backgroundColor: COLORS.grey}} />
  <View>
    <Text style={[styles.title,{width:80}]}>Reacciones</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: COLORS.grey}} />
</View>
      {multiOptions.map((select)=><Select key={select} value={select} onPress={()=>setSelectedReactions(select)} isSelected={selectedMulti.includes(select)} />)}
      
      
      {/* <SelectionGroup 
        renderContent={renderButton}
        items={sampleQuestions.options}
        onPress={selectionHandler.selectionHandler}
        isSelected={selectionHandler.isSelected}
        containerStyle={styles.answers}
        onItemSelected={(item) => setSelectedAnswer(item.value)}
      /> */}
                <TouchableOpacity
              style={[styles.btn, styles.shadow]}
              onPress={filter}
            >
              <Text style={styles.btnText}>Aplicar</Text>
            </TouchableOpacity>
    </View>
  );
};

export default FilterActivity;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom:60,

    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clearBtn: {
    borderRadius: 20,
    backgroundColor: COLORS.lightGrey,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontSize: SIZES.large,
    color: COLORS.dark,

    fontFamily: FONTS.RubikBold,
  },
  title: {
    textAlign:'center',
    fontSize: 13,
    color: COLORS.grey,
    fontFamily: FONTS.RubikRegular,
    fontWeight: "400",
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: FONTS.RubikRegular,
    fontWeight: "400",
  },
  dateInput: {
    flex: 1,
  },
  touchable: {
    margin: 10,
    height: 30,
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
  },
  answers: {
    marginBottom: 10,
  },outerCircle: {
    borderRadius: 10,
    borderWidth: 2,
    width: 20,
    height: 20,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    borderRadius: 10,
    width: 14,
    height: 14,
    borderColor: 'black',
    backgroundColor: 'black'
  },
  btn: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 10,
    paddingHorizontal:50,
    borderRadius: 10,
    alignSelf:'center'
  },
  btnText: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily:FONTS.RubikSemiBold,
    fontSize: 18,
  },
  shadow:{shadowColor: "#000000",
  shadowOpacity: 0.2,
  shadowRadius: 10,
  shadowOffset: {
    height: 5,
    width: 1
  }}
});
