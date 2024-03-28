import { SafeAreaView } from "react-native-safe-area-context";
import { Switch, Text, View } from "react-native";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import styles from "./notificationsPreferences.style";
import ArrowIcon from "../../../assets/images/arrow.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetRefProps,
} from "../../common/BottomSheet/BottomSheet";
import { useEffect, useRef, useState } from "react";
import FavoriteCategoriesSelector from "../../events/FavoriteCategoriesSelector/FavoriteCategoriesSelector";

export default function NotificationsPreferences() {
  const ref = useRef<BottomSheetRefProps>(null);
  const viewRef = useRef(null);
  const [categorySelectorOpenedCount, setCategorySelectorOpenedCount] =
    useState(0);

  function handleBottomSheet(height: number) {
    const isActive = ref?.current?.isActive();
    console.log(isActive);
    if (isActive) {
      ref?.current?.scrollTo(500);
    } else {
      ref?.current?.scrollTo(height);
    }
  }

  useEffect(() => {
    // if (categorySelectorOpenedCount === 0) return;

    if (viewRef.current) {
      setTimeout(() => {
        viewRef.current.measure((_x, _y, _width, height) => {
          handleBottomSheet(-height);
        });
      }, 100);
    }
  }, [categorySelectorOpenedCount]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <ReturnButton />
        <Text style={styles.headerText}>Configuración de notificaciones</Text>
      </View>
      <View style={styles.preferencesContainer}>
        <Text style={styles.preferencesTitle}>Preferencias</Text>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Reacciones a mis eventos</Text>
          <Switch />
        </View>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Comentarios a mis eventos</Text>
          <Switch />
        </View>
        <View style={styles.preference}>
          <Text style={styles.preferenceText}>Eventos de interés</Text>
          <Switch />
        </View>
        <View style={[styles.preference, styles.favouriteCategoriesContainer]}>
          <Text style={[styles.preferenceText, styles.favouriteCategoriesText]}>
            Categorias favoritas
          </Text>
          <TouchableOpacity
            style={{ paddingRight: 12 }}
            onPress={() => {
              setCategorySelectorOpenedCount(
                (previousCount) => previousCount + 1
              );
            }}
          >
            <ArrowIcon style={{ color: "#404040" }} />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={ref}
        style={[categorySelectorOpenedCount === 0 && { opacity: 0 }]}
      >
        {categorySelectorOpenedCount !== 0 && (
          <View ref={viewRef} collapsable={false}>
            <FavoriteCategoriesSelector
              scrollTo={ref?.current?.scrollTo}
              categorySelectorOpenedCount={categorySelectorOpenedCount}
            />
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}
