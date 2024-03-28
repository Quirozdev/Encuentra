import React, { useContext, useEffect, useState } from "react";
import { CheckBox } from "@rneui/themed";
import { Dimensions, Image, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import styles from "./favoriteCategoriesSelector.style";
import categoryRowStyles from "./categoryRow.style";
import { getAllCategories } from "../../../src/services/categories";
import { Category } from "../../../src/types/categories.types";
import Separator from "../../common/Separator/Separator";
import { COLORS } from "../../../constants/theme";
import { supabase } from "../../../src/supabase";
import { AuthContext } from "../../../src/providers/AuthProvider";

interface CategoryWithSelectedValue extends Omit<Category, "created_at"> {
  preferida: boolean;
}

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
    <View style={categoryRowStyles.container}>
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
    </View>
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
  const [categories, setCategories] = useState<
    Array<CategoryWithSelectedValue>
  >([]);
  const { session } = useContext(AuthContext);

  useEffect(() => {
    supabase
      .rpc("get_preferred_categories_from_user", {
        user_id: session.user.id,
      })
      .then(({ data, error }) => {
        setCategories(data as unknown as CategoryWithSelectedValue[]);
      });
    // esa dependencia es para que se vuelvan a cargar las categorias preferidas, cada vez que
    // el modal aparece y desaparece ese conteo aumenta
  }, [categorySelectorOpenedCount]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccionar categorías favoritas</Text>
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
          style={{ height: SCREEN_HEIGHT * 0.7 }}
        />
      </View>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={() => {
          scrollTo(500);
        }}
      >
        <Text style={styles.saveBtnText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
