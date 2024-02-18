import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants/theme";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Portal } from "@gorhom/portal";
import SearchBar from "../common/SearchBar/SearchBar";
import EventList from "../events/EventList/EventList";
import CategoryGrid from "../events/CategoryGrid/CategoryGrid";
import BottomSheet, {
  BottomSheetRefProps,
} from "../common/BottomSheet/BottomSheet";
import FilterEvent from "../events/FilterEvent/FilterEvent";
import ChangeLocationForm from "../events/ChangeLocationForm/ChangeLocationForm";
import { getAllEventsWithCategories } from "../../src/services/events";
import { EventsContext } from "../../src/providers/EventsProvider";
import { LocationContext } from "../../src/providers/LocationProvider";
import { getUserLocation } from "../../src/services/users";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface ModalType {
  type: "filter" | "location" | "";
}
const MainScreen = () => {
  const router = useRouter();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [openModal, setOpenModal] = useState<ModalType>({ type: "" });
  const ref = useRef<BottomSheetRefProps>(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const { events, setEvents, unfilteredEvents, setUnfilteredEvents } =
    useContext(EventsContext);
  const { location } = useContext(LocationContext);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllEventsWithCategories(location).then(({ data, error }) => {
      setEvents(data);
      setUnfilteredEvents(data);
      setRefreshing(false);
    });
  }, [location]);

  function searchEvents(searchTerm) {
    setSearchPhrase(searchTerm);

    if (searchTerm == "") {
      setEvents(unfilteredEvents);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      setEvents(
        events.filter((event) =>
          event.nombre.toLowerCase().includes(searchTermLower)
        )
      );
    }
  }

  function handleBottomSheet(scrollValue: number) {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(scrollValue);
    }
  }

  function openLocationModal() {
    setOpenModal({ type: "location" });
    handleBottomSheet(-SCREEN_HEIGHT / 2);
  }

  function openFilterModal() {
    setOpenModal({ type: "filter" });
    handleBottomSheet(-SCREEN_HEIGHT / 1.5);
  }

  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <BottomSheet ref={ref}>
          {openModal.type == "filter" ? (
            <FilterEvent scrollTo={ref?.current?.scrollTo} />
          ) : (
            <ChangeLocationForm scrollTo={ref?.current?.scrollTo} />
          )}
        </BottomSheet>
      </Portal>

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={[styles.content]}
          contentContainerStyle={{
            gap: 20,
            paddingBottom: 30,
          }}
          refreshControl={
            <RefreshControl
              style={{ paddingTop: 20 }}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <View style={[styles.header, styles.row, styles.center]}>
            <TouchableOpacity
              onPress={openLocationModal}
              style={[styles.location, styles.row, styles.center]}
            >
              <Text style={styles.title}>{location.municipio}</Text>
              <MaterialCommunityIcons
                name="menu-down"
                size={24}
                color={COLORS.dark}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/events/create")}>
              <MaterialCommunityIcons
                name="plus-circle"
                size={30}
                color={COLORS.purple}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.center, styles.search]}>
            <TouchableOpacity onPress={openFilterModal}>
              <MaterialCommunityIcons
                name="filter"
                size={30}
                color={COLORS.darkMint}
              />
            </TouchableOpacity>
            <SearchBar
              clicked={clicked}
              searchPhrase={searchPhrase}
              setSearchPhrase={searchEvents}
              setClicked={setClicked}
            />
          </View>
          <View>
            <Text style={styles.subtitle}>Categorías</Text>
            <CategoryGrid />
          </View>
          <View>
            <Text style={styles.subtitle}>Próximos eventos</Text>

            <EventList />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  center: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
    gap: 20,
  },
  header: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  search: {
    gap: 10,
  },
  location: {
    gap: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.dark,
    fontFamily: FONTS.RubikMedium,
  },
  title: {
    fontSize: 32,
    color: COLORS.dark,
    fontFamily: FONTS.RubikMedium,
  },
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 100,
  },
});
