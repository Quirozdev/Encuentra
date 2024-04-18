import { useContext, useEffect, useState } from "react";
import { CategoryWithSelectedValue } from "../../../src/types/categories.types";
import { AuthContext } from "../../../src/providers/AuthProvider";
import {
  deleteFavoriteCategories,
  getFavoriteCategoriesFromUser,
  saveFavoriteCategories,
} from "../../../src/services/categories";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CategoryRow } from "../../events/FavoriteCategoriesSelector/FavoriteCategoriesSelector";
import styles from "./myCategories.style";
import Separator from "../../common/Separator/Separator";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import NotificationGreyIcon from "../../../assets/images/profile_screen/notification_grey_icon.svg";
import { useRouter } from "expo-router";
import ModalOneButton from "../../common/Modal_1Button/Modal_1Button";
import { COLORS } from "../../../constants/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function MyCategories() {
  const [categories, setCategories] =
    useState<Array<CategoryWithSelectedValue> | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesSaving, setCategoriesSaving] = useState(false);
  const [categoriesSelectionChanged, setCategoriesSelectionChanged] =
    useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { session } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    setCategoriesLoading(true);
    getFavoriteCategoriesFromUser(session.user.id).then(
      ({ favoriteCategories, error }) => {
        setCategoriesLoading(false);
        setCategories(favoriteCategories);
      }
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ paddingLeft: 16 }}>
          <ReturnButton />
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.headerText}>Mis categorías</Text>
        </View>
        <TouchableOpacity
          style={{ paddingRight: 16, marginLeft: 15 }}
          onPress={() => {
            router.push("/notifications/");
          }}
        >
          <NotificationGreyIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Recibirás notificaciones de eventos de tus categorías elegidas
          (preferencia "Eventos de interés" activa).
        </Text>
        {categoriesLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <>
            <View style={styles.categoriesContainer}>
              <FlatList
                data={categories}
                renderItem={({ item }) => {
                  return (
                    <CategoryRow
                      category={item}
                      categories={categories}
                      setCategories={setCategories}
                      setCategoriesSelectionChanged={
                        setCategoriesSelectionChanged
                      }
                    />
                  );
                }}
                keyExtractor={(item) => "" + item.id}
                ItemSeparatorComponent={() => {
                  return <Separator height={1} color="#B0B1BC" />;
                }}
                ListFooterComponent={() => {
                  return <Separator height={1} color="#B0B1BC" />;
                }}
                style={{ height: SCREEN_HEIGHT * 0.7 }}
              />
            </View>
            {categoriesSaving ? (
              <View style={{ justifyContent: "center" }}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.saveBtn,
                  !categoriesSelectionChanged && styles.disabledBtn,
                ]}
                onPress={async () => {
                  setCategoriesSaving(true);
                  const selectedFavoriteCategoryIds = categories
                    .filter((category) => {
                      return category.preferida;
                    })
                    .map((category) => category.id);
                  // reseteo
                  await deleteFavoriteCategories(session.user.id);
                  await saveFavoriteCategories(
                    session.user.id,
                    selectedFavoriteCategoryIds
                  );
                  setCategoriesSaving(false);
                  setCategoriesSelectionChanged(false);
                  setIsModalVisible(true);
                }}
                disabled={!categoriesSelectionChanged}
              >
                <Text style={styles.saveBtnText}>Guardar</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
      <ModalOneButton
        buttonText={"Aceptar"}
        title={"Guardado"}
        message={"!Se han guardado los cambios correctamente!"}
        buttonColor={"#735AFB"}
        exitButtonPress={() => {
          setIsModalVisible(false);
        }}
        isVisible={isModalVisible}
        textColor={COLORS.white}
        onPress={() => {
          setIsModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
