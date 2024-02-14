import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

// codigo obtenido de https://blog.logrocket.com/create-react-native-search-bar-from-scratch/

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={styles.searchBar}
      >
        
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          onBlur={() => setClicked(false)}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {!clicked && searchPhrase === '' ?
        <Feather
        name="search"
        size={20}
        color={COLORS.grey}
        />
          
         : 
         <Feather name="x" size={20} color={COLORS.grey} onPress={() => {
            setSearchPhrase("")
        }}/>
        }
      </View>

    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flex:1
    

  },
  searchBar: {
    padding: 14,
    flexDirection: "row",
    borderRadius:16,
    backgroundColor: COLORS.darkWhite,
    alignItems: "center",
  },
  input: {
    flex:1,
    fontSize: 15,
    color:COLORS.dark,
    fontFamily: FONTS.RubikRegular,
    marginLeft: 10,
  },
});