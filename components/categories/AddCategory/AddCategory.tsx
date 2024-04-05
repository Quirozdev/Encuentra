import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import EmojiSelector from "react-native-emoji-selector";
import EmojiModal from "react-native-emoji-modal";
import styles from "./addCategory.style";
import EmojiFace from "../../../assets/images/emoji_face.svg";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function AddCategory() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isEmojiModalVisible, setIsEmojiModalVisible] = useState(false);

  // mejor hacer un map con este arreglo
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
        <View style={styles.emojiInput}>
          <TextInput
            placeholder="Nueva categoría"
            style={styles.emojiInputText}
          />
          <Pressable
            style={styles.emojiInputBtn}
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
        <View style={styles.colorSelectorContainer}>
          <Text style={styles.label}>Elegir color</Text>
          <View style={styles.colors}>
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
            backgroundStyle={{}}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
