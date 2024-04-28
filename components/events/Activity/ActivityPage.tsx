import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTS } from "../../../constants/theme";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import { useContext, useRef, useState } from "react";
import { EventWithUserReactions } from "../../../src/types/events.types";
import {
  convertTimeTo12HourFormat,
  formatDateAndYearWithTextualMonth,
} from "../../../src/lib/dates";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Assist from "../../../assets/images/assist.svg";
import PortalBottomSheet, {
  PortalBottomSheetRefProps,
} from "../../common/PortalBottomSheet/PortalBottomSheet";
import { ActivityFilterContext } from "../../../src/providers/ActivityFilterProvider";
import { useNavigation } from "@react-navigation/native";

interface MultiOption {
  value: string;
  color: string;
}

const multiOptions: MultiOption[] = [
  {
    value: "Me gusta",
    color: "#2096F3",
  },
  {
    value: "No me gusta",
    color: "#FD6767",
  },
  {
    value: "Asistiré",
    color: "#FEC83C",
  },
  {
    value: "Comentarios",
    color: "#67FD6D",
  },
];

export default function ActivityPage() {
  const navigation = useNavigation();

  //const [events, setEvents] = useState<UserEventsWithActivities[]>(null);
  const {
    loading,
    resetFilters,
    activityEvents,
    selectedRadio,
    selectedMulti,
    setSelectedMulti,
    filterEvents,
    setIncludeComments,
    includeComments,
  } = useContext(ActivityFilterContext);
  const router = useRouter();
  const ref = useRef<PortalBottomSheetRefProps>(null);

  function removeReaction(value: string) {
    setSelectedMulti((prevState) => {
      const newArr = prevState.filter((item) => item !== value);
      if (value == "Comentarios") {
        setIncludeComments(!includeComments);
        filterEvents(!includeComments, newArr);
      } else {
        filterEvents(null, newArr);
      }
      return newArr;
    });
  }

  const getColor = (value) => {
    const option = multiOptions.find((option) => option.value === value);
    return option ? option.color : null;
  };

  function getIcon(event: EventWithUserReactions) {
    var backgroundColor = "transparent";
    var icon;
    switch (event.reaccion_usuario) {
      case "Asistiré":
        icon = <Assist width={36} height={36} />;
        break;
      case "No me gusta":
        backgroundColor = "#FD6767";
        icon = <AntDesign name="dislike1" size={20} color="#fff" />;
        break;
      case "Me gusta":
        backgroundColor = "#2096F3";
        icon = <AntDesign name="like1" size={20} color="#fff" />;
        break;
      case null:
        backgroundColor = "#67FD6D";
        icon = <Entypo name="message" size={20} color="white" />;
        break;
    }
    return (
      <View
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          backgroundColor: backgroundColor,
          borderRadius: 100,
          width: 32,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>
    );
  }
  function openFilterModal() {
    ref.current?.open("activity_filter");
  }
  const headerComponent = () => {
    return (
      <View style={{ gap: 10, paddingTop: 15 }}>
        <Text
          style={{
            fontSize: 18,
            fontFamily: FONTS.RubikMedium,
            color: COLORS.dark,
          }}
        >
          Eventos que interactuaste
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <TouchableOpacity
            onPress={openFilterModal}
            style={{
              borderRadius: 6,
              padding: 3,
              backgroundColor: "#D9D9D9",
              width: 45,
              height: 35,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="filter-list" size={26} color="black" />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{ gap: 5 }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ gap: 10 }}
          >
            <View
              style={{
                backgroundColor: COLORS.darkPurple,
                flexDirection: "row",
                gap: 5,
                paddingHorizontal: 8,
                height: 35,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* <AntDesign name="close" size={24} color="white" /> */}
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 16,
                  fontFamily: FONTS.RubikRegular,
                }}
              >
                {selectedRadio}
              </Text>
            </View>
            {selectedMulti.map((selection, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => removeReaction(selection)}
                style={{
                  backgroundColor: getColor(selection),
                  flexDirection: "row",
                  gap: 5,
                  paddingHorizontal: 8,
                  height: 35,
                  borderRadius: 5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <AntDesign name="close" size={24} color="white" />
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontFamily: FONTS.RubikRegular,
                  }}
                >
                  {selection}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <PortalBottomSheet ref={ref} />

      <View style={styles.headerContainer}>
        <View style={{ paddingLeft: 16 }}>
          <ReturnButton />
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.headerText}>Mi actividad</Text>
        </View>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"small"} />
        </View>
      ) : (
        <FlatList
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: FONTS.RubikRegular,
                  color: COLORS.grey,
                }}
              >
                No se encontraron eventos
              </Text>
              <TouchableOpacity
                style={[styles.btn, styles.shadowBtn]}
                onPress={resetFilters}
              >
                <Text style={styles.btnText}>Eliminar filtros</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ flexGrow: 1 }}
          ListHeaderComponent={headerComponent}
          style={{ flex: 1, paddingHorizontal: 15 }}
          data={activityEvents}
          renderItem={({ item }) => (
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: FONTS.RubikMedium,
                  color: COLORS.dark,
                  marginVertical: 15,
                }}
              >
                {formatDateAndYearWithTextualMonth(item.date)}
              </Text>
              <FlatList
                keyExtractor={(item, index) =>
                  `${item.id}_${index}_${item.comentarios == null ? "C" : "R"}`
                } // Use a unique key
                data={item.events}
                renderItem={({ item: event }) => (
                  <TouchableOpacity
                    onPress={() =>
                      router.navigate(`events/details/${event.id}`)
                    }
                    style={[
                      styles.shadow,
                      {
                        flexDirection: "row",
                        gap: 20,
                        marginBottom: 15,
                        borderRadius: 10,
                      },
                    ]}
                  >
                    <View style={{ width: 105, height: 107 }}>
                      <Image
                        style={{
                          width: 90,
                          height: 100,
                          resizeMode: "cover",
                          borderRadius: 10,
                        }}
                        source={{ uri: event.portada }}
                      />

                      {getIcon(event)}
                    </View>
                    <View
                      style={{
                        justifyContent: "space-around",
                        flex: 1,
                        gap: 5,
                        maxWidth: Dimensions.get("window").width / 1.8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: FONTS.RubikRegular,
                          color: COLORS.primaryBlue,
                        }}
                      >
                        {formatDateAndYearWithTextualMonth(event.fecha)} •{" "}
                        {convertTimeTo12HourFormat(event.hora)}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: FONTS.RubikRegular,
                          color: COLORS.dark,
                        }}
                      >
                        {event.nombre}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "flex-end",
                          gap: 4,
                        }}
                      >
                        {event.categorias != null &&
                          event.categorias.map((categoria, index) => {
                            if (categoria != null) {
                              return (
                                <View
                                  key={categoria.id}
                                  style={{
                                    backgroundColor: categoria.color,
                                    paddingHorizontal: 3,
                                    paddingVertical: 4,
                                    borderRadius: 100,
                                  }}
                                >
                                  <Text>{categoria.emoji}</Text>
                                </View>
                              );
                            }
                          })}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 6,
                          maxWidth: Dimensions.get("window").width / 2.1,
                        }}
                      >
                        <MaterialIcons
                          name="location-pin"
                          size={24}
                          color="#747688"
                        />
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: FONTS.RubikRegular,
                            color: "#747688",
                          }}
                        >
                          {event.direccion} • {event.nombre_municipio}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.white,
    gap: SIZES.large,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,

    // justifyContent: "space-between",
    // paddingRight: 16,
    // paddingLeft: 16,
  },
  flexContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 24,
    textAlign: "center",
    color: COLORS.darkBlue,
  },
  noAvailableNotificationsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAvailableNotificationsText: {
    fontFamily: FONTS.RubikRegular,
    fontSize: 18,
    color: "#706E8F",
    textAlign: "center",
  },
  noPreferencesSelectedBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
  },
  noPreferencesSelectedBtnText: {
    fontFamily: FONTS.RubikMedium,
    fontSize: 14,
    color: COLORS.grey,
  },
  shadow: {
    backgroundColor: "white",
    padding: 8,
    shadowColor: "#575C8A",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,

    elevation: 10,
  },
  btn: {
    backgroundColor: COLORS.darkPurple,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginVertical: 35,
    borderRadius: 10,
    alignSelf: "center",
  },
  btnText: {
    textAlign: "center",
    color: COLORS.white,
    fontFamily: FONTS.RubikSemiBold,
    fontSize: 16,
  },
  shadowBtn: {
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: 5,
      width: 1,
    },
  },
});
