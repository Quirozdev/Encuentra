import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Dimensions, Switch, Text, View } from "react-native";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import styles from "./notificationsPreferences.style";
import ArrowIcon from "../../../assets/images/arrow.svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetRefProps,
} from "../../common/BottomSheet/BottomSheet";
import { useContext, useEffect, useRef, useState } from "react";
import FavoriteCategoriesSelector from "../../events/FavoriteCategoriesSelector/FavoriteCategoriesSelector";
import changeNotificationPreferenceStatus, {
  getNotificationsPreferencesFromUser,
} from "../../../src/services/notifications";
import { AuthContext } from "../../../src/providers/AuthProvider";
import { INotificationsPreferences } from "../../../src/types/notifications.types";
import PreferenceRow from "./PreferenceRow/PreferenceRow";
import useNotificationPreferences from "../../../src/hooks/useNotificationPreferences";
import { useRouter } from "expo-router";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function NotificationsPreferences() {
  const { session } = useContext(AuthContext);
  const router = useRouter();
  const { preferences, setPreferences } = useNotificationPreferences();
  const [isReactionPreferenceChanging, setIsReactionPreferenceChanging] =
    useState(false);
  const [isCommentaryPreferenceChanging, setIsCommentaryPreferenceChanging] =
    useState(false);
  const [
    isInterestEventsPreferenceChanging,
    setIsInterestEventsPreferenceChanging,
  ] = useState(false);

  const [categorySelectorOpenedCount, setCategorySelectorOpenedCount] =
    useState(0);
  const ref = useRef<BottomSheetRefProps>(null);
  const viewRef = useRef(null);

  function handleBottomSheet(height: number) {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(SCREEN_HEIGHT);
    } else {
      ref?.current?.scrollTo(height);
    }
  }

  useEffect(() => {
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
      {preferences == null ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <>
          <View style={styles.preferencesContainer}>
            <Text style={styles.preferencesTitle}>Preferencias</Text>
            <PreferenceRow
              preferenceText="Reacciones a mis eventos"
              value={preferences.reaccion}
              onValueChange={async () => {
                setPreferences({
                  ...preferences,
                  reaccion: !preferences.reaccion,
                });
                setIsReactionPreferenceChanging(true);
                const { newState, error } =
                  await changeNotificationPreferenceStatus(
                    session.user.id,
                    "reaccion"
                  );
                setIsReactionPreferenceChanging(false);
                // si hubo un error se revierte el estado
                if (error) {
                  setPreferences({
                    ...preferences,
                    reaccion: !preferences.reaccion,
                  });
                }
              }}
              loadingStateChange={isReactionPreferenceChanging}
            />
            <PreferenceRow
              preferenceText="Comentarios a mis eventos"
              value={preferences.comentario}
              onValueChange={async () => {
                setPreferences({
                  ...preferences,
                  comentario: !preferences.comentario,
                });
                setIsCommentaryPreferenceChanging(true);
                const { newState, error } =
                  await changeNotificationPreferenceStatus(
                    session.user.id,
                    "comentario"
                  );
                setIsCommentaryPreferenceChanging(false);
                // si hubo un error se revierte el estado
                if (error) {
                  setPreferences({
                    ...preferences,
                    comentario: !preferences.comentario,
                  });
                }
              }}
              loadingStateChange={isCommentaryPreferenceChanging}
            />
            <PreferenceRow
              preferenceText="Eventos de interés"
              value={preferences.evento_interes}
              onValueChange={async () => {
                setPreferences({
                  ...preferences,
                  evento_interes: !preferences.evento_interes,
                });
                setIsInterestEventsPreferenceChanging(true);
                const { newState, error } =
                  await changeNotificationPreferenceStatus(
                    session.user.id,
                    "evento_interes"
                  );
                setIsInterestEventsPreferenceChanging(false);
                // si hubo un error se revierte el estado
                if (error) {
                  setPreferences({
                    ...preferences,
                    evento_interes: !preferences.evento_interes,
                  });
                }
              }}
              loadingStateChange={isInterestEventsPreferenceChanging}
            />
          </View>
          {preferences.evento_interes && (
            <>
              <View
                style={[styles.preference, styles.favouriteCategoriesContainer]}
              >
                <Text
                  style={[
                    styles.preferenceText,
                    styles.favouriteCategoriesText,
                  ]}
                >
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
            </>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
