import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import EmojiSelector from "react-native-emoji-selector";
import EmojiModal from "react-native-emoji-modal";
import styles from "./addCategory.style";
import EmojiFace from "../../../assets/images/emoji_face.svg";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  CategoryCreationValidationErrors,
  validateCategoryCreationData,
} from "../../../src/validations/categoryCreation";
import { createCategory } from "../../../src/services/categories";
import ModalOneButton from "../../common/Modal_1Button/Modal_1Button";
import { useRouter } from "expo-router";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<CategoryCreationValidationErrors>(null);

  const router = useRouter();

  const availableColors = [
    "#FF7208",
    "#06BB8E",
    "#735AFB",
    "#F5BE2F",
    "#2975FD",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{ paddingLeft: 16 }}>
          <ReturnButton />
        </View>
        <Text style={styles.headerText}>Agregar categoría</Text>
      </View>
      <View style={styles.addCategoryForm}>
        <Text style={styles.label}>Nombre de la nueva categoría</Text>
        <View>
          <View style={[styles.emojiInput, errors?.name && styles.nameError]}>
            <TextInput
              placeholder="Nueva categoría"
              style={styles.emojiInputText}
              value={categoryName}
              onChangeText={setCategoryName}
              maxLength={50}
            />
            <Pressable
              style={[styles.emojiInputBtn, errors?.emoji && styles.emojiError]}
              onPress={() => {
                setIsEmojiModalVisible(true);
              }}
            >
              {selectedEmoji ? (
                <Text style={{ fontSize: 25 }}>{selectedEmoji}</Text>
              ) : (
                <EmojiFace />
              )}
            </Pressable>
          </View>
          <View style={styles.textInputErrorsRow}>
            <Text style={styles.errorText}>{errors?.name && errors.name}</Text>
            <Text style={styles.errorText}>
              {errors?.emoji && errors.emoji}
            </Text>
          </View>
        </View>
        <View style={styles.colorSelectorContainer}>
          <Text style={styles.label}>Elegir color</Text>
          <View
            style={[
              styles.colors,
              errors?.color && styles.colorSelectorContainerError,
            ]}
          >
            {availableColors.map((availableColor) => {
              return (
                <TouchableOpacity
                  key={availableColor}
                  style={[
                    styles.colorBtn,
                    { backgroundColor: availableColor },
                    selectedColor === availableColor && {
                      borderWidth: 4,
                      borderColor: "#b4d8cc",
                    },
                  ]}
                  onPress={() => {
                    setSelectedColor(availableColor);
                  }}
                ></TouchableOpacity>
              );
            })}
          </View>
          <Text style={[styles.errorText, { alignSelf: "flex-end" }]}>
            {errors?.color && errors.color}
          </Text>
        </View>
        <View style={styles.previewSection}>
          <Text style={styles.label}>Vista previa</Text>
          <View
            style={[
              styles.previewCard,
              { backgroundColor: selectedColor ? selectedColor : "#735AFB" },
            ]}
          >
            {selectedEmoji ? (
              <Text style={styles.previewEmoji}>{selectedEmoji}</Text>
            ) : (
              <EmojiFace
                style={{
                  color: "white",
                  backgroundColor: "white",
                  borderRadius: 32,
                }}
              />
            )}
            <Text style={styles.previewCategoryName} numberOfLines={3}>
              {categoryName ? categoryName : "Nombre de la categoría"}
            </Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          {!loading ? (
            <>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={async () => {
                  setLoading(true);
                  const validationErrors = await validateCategoryCreationData({
                    name: categoryName,
                    color: selectedColor,
                    emoji: selectedEmoji,
                  });

                  setErrors(validationErrors);

                  const isThereAnError = Object.values(validationErrors).some(
                    (error) => error
                  );

                  if (isThereAnError) {
                    setLoading(false);
                    return;
                  }

                  createCategory({
                    nombre: categoryName,
                    emoji: selectedEmoji,
                    color: selectedColor,
                  })
                    .then(() => {
                      setIsSuccessModalVisible(true);
                    })
                    .finally(() => {
                      setLoading(false);
                    });
                }}
              >
                <Text style={styles.addText}>Agregar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  Alert.alert(
                    "¿Cancelar la creación de la categoría?",
                    "Se perderán los datos ingresados",
                    [
                      { text: "Si", onPress: () => router.back() },
                      { text: "No", onPress: () => {} },
                    ]
                  );
                }}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </>
          ) : (
            <ActivityIndicator size={"large"} />
          )}
        </View>
      </View>
      {isEmojiModalVisible && (
        <View style={styles.emojiModalContainer}>
          <EmojiModal
            onEmojiSelected={(emoji) => {
              setSelectedEmoji(emoji);
              setIsEmojiModalVisible(false);
            }}
            onPressOutside={() => {
              setIsEmojiModalVisible(false);
            }}
            containerStyle={styles.emojiModal}
          />
        </View>
      )}
      <ModalOneButton
        isVisible={isSuccessModalVisible}
        title={"Categoría creada"}
        message={"La categoría se creó exitosamente"}
        buttonText={"Aceptar"}
        buttonColor={"#FF7208"}
        textColor={"#FFFFFF"}
        exitButtonPress={() => {
          router.replace("/");
          setIsSuccessModalVisible(false);
        }}
        onPress={() => {
          router.replace("/");
          setIsSuccessModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
