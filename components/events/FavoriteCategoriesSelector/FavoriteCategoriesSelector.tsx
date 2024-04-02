import React, { useContext, useEffect, useState } from "react";
import { CheckBox } from "@rneui/themed";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./favoriteCategoriesSelector.style";
import categoryRowStyles from "./categoryRow.style";
import {
  deleteFavoriteCategories,
  getAllCategories,
  getFavoriteCategoriesFromUser,
  saveFavoriteCategories,
} from "../../../src/services/categories";
import {
  Category,
  CategoryWithSelectedValue,
} from "../../../src/types/categories.types";
import Separator from "../../common/Separator/Separator";
import { COLORS } from "../../../constants/theme";
import { supabase } from "../../../src/supabase";
import { AuthContext } from "../../../src/providers/AuthProvider";

interface CategoryRowProps {
  category: CategoryWithSelectedValue;
  categories: CategoryWithSelectedValue[];
  setCategories: React.Dispatch<
    React.SetStateAction<CategoryWithSelectedValue[]>
  >;
}

function CategoryRow({
  category,
  categories,
  setCategories,
}: CategoryRowProps) {
  return (
    <Pressable
      style={categoryRowStyles.container}
      onPress={() => {
        setCategories(
          categories.map((c) => {
            return c.id === category.id
              ? { ...category, preferida: !category.preferida }
              : c;
          })
        );
      }}
    >
      <View style={styles.emojiAndTextContainer}>
        <View
          style={[
            categoryRowStyles.emojiContainer,
            { backgroundColor: category.color },
          ]}
        >
          <Text style={categoryRowStyles.emoji}>{category.emoji}</Text>
        </View>
        <Text style={categoryRowStyles.text} numberOfLines={1}>
          {category.nombre}
        </Text>
      </View>
      <CheckBox
        checked={category.preferida}
        onPress={() => {
          setCategories(
            categories.map((c) => {
              return c.id === category.id
                ? { ...category, preferida: !category.preferida }
                : c;
            })
          );
        }}
        iconType="material-community"
        checkedIcon="checkbox-marked"
        uncheckedIcon="checkbox-blank-outline"
        checkedColor="#735AFB"
        style={styles.checkbox}
      />
    </Pressable>
  );
}

interface FavoriteCategoriesSelectorProps {
  scrollTo: (num: number) => void;
  categorySelectorOpenedCount: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function FavoriteCategoriesSelector({
  scrollTo,
  categorySelectorOpenedCount,
}: FavoriteCategoriesSelectorProps) {
  const [categories, setCategories] =
    useState<Array<CategoryWithSelectedValue> | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesSaving, setCategoriesSaving] = useState(false);
  const { session } = useContext(AuthContext);

  useEffect(() => {
    setCategoriesLoading(true);
    getFavoriteCategoriesFromUser(session.user.id).then(
      ({ favoriteCategories, error }) => {
        setCategoriesLoading(false);
        setCategories(favoriteCategories);
      }
    );
    // esa dependencia es para que se vuelvan a cargar las categorias preferidas, cada vez que
    // el modal aparece y desaparece ese conteo aumenta
  }, [categorySelectorOpenedCount]);

  return (
    <View style={[styles.container, { height: SCREEN_HEIGHT * 0.8 }]}>
      <Text style={styles.title}>Seleccionar categorías favoritas</Text>
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
              style={{ height: SCREEN_HEIGHT * 0.6 }}
            />
          </View>
          {categoriesSaving ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.saveBtn}
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
                scrollTo(500);
                setCategoriesSaving(false);
              }}
            >
              <Text style={styles.saveBtnText}>Guardar</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}
