import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions, StyleSheet, Switch } from "react-native";
import { getAllCategories, getFavoriteCategoriesFromUser } from "../../../src/services/categories";
import { COLORS, FONTS } from "../../../constants/theme";
import { CategoriesContext } from "../../../src/providers/CategoryProvider";
import { EventsContext } from "../../../src/providers/EventsProvider";
import { FilterContext } from "../../../src/providers/FilterProvider";
import ModalOneButton from "../../common/Modal_1Button/Modal_1Button";
import { CategoryWithSelectedValue } from "../../../src/types/categories.types";
import { AuthContext } from "../../../src/providers/AuthProvider";
import { useRouter } from "expo-router";


export default function FilterMyCategories() {
  const [categories, setCategories] = useState([])
  const {setSelectedCategories,selectedCategories} = useContext(CategoriesContext)
  const [categoriesFiltering, setCategoriesFiltering] = useState(false);
  const {events,setEvents,unfilteredEvents} = useContext(EventsContext);
  const { filterEvents} = useContext(FilterContext);
  const { session } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  function handleCategoryFilter(categoriesFiltering: boolean){
    if (categoriesFiltering){
      setSelectedCategories(categories);
      filterEvents(categories);
      setCategoriesFiltering(true);
    } else{
      setSelectedCategories([]);
      filterEvents([]);
      setCategoriesFiltering(false);
    }
  }

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.text}>Filtrar por categorías favoritas</Text>
        <Switch
          value={categoriesFiltering}
          onValueChange={async () =>{
              await getFavoriteCategoriesFromUser(session.user.id).then(
                ({ favoriteCategories, error }) => {
                  // console.log(favoriteCategories)
                  setCategories(favoriteCategories.filter((category) => category.preferida === true).map((category) => category.id));
                  if (categories.length > 0) {
                    handleCategoryFilter(!categoriesFiltering);
                  } else {
                    setIsModalVisible(true);
                    handleCategoryFilter(false);
                  }
                }
              );
              
            }}
        />
      </View>
      <ModalOneButton
        buttonText={"Ir a Mis categorías"}
        title={"Guardado"}
        message={"No cuentas con categorías favoritas guardadas.\nIngresa al apartado de “Mis categorías” en “Mi perfíl” para asignarlas."}
        buttonColor={"#735AFB"}
        exitButtonPress={() => {
          setIsModalVisible(false);
        }}
        isVisible={isModalVisible}
        textColor={COLORS.white}
        onPress={() => {
          setIsModalVisible(false);
          // envia a ventana de mis categorias
          router.push("/categories/favorite");
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 15,
      color: COLORS.lightDark,
      fontFamily: FONTS.RubikRegular,
    },
  });

