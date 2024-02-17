import React, { useState } from "react";
import {
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  StyleSheetProperties,
  ViewStyle,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../src/supabase";
import { decode } from "base64-arraybuffer";
import { COLORS } from "../../../constants/theme";
import styles from "./imageSelector.style";
import UploadImageIcon from "../../../assets/images/upload_file.svg";

export default function ImageSelector({
  image,
  onImageChange,
  style,
}: {
  image: ImagePicker.ImagePickerAsset;
  onImageChange: (image: ImagePicker.ImagePickerAsset) => void;
  style: StyleProp<ViewStyle>;
}) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      const extension = result.assets[0].uri.split(".").pop().toLowerCase();

      // subir imagen, nanoid() uuidv4(), generar id unico

      onImageChange(result.assets[0]);

      // obtener la url de una imagen, id_evento/{imagen} (portada o las otras imagenes)

      // const url = supabase.storage
      //   .from("imagenes_eventos")
      //   .getPublicUrl("aver/portada.png");

      // console.log("url", url);

      // obtener/descargar una imagen

      // const { data, error } = await supabase.storage
      //   .from("imagenes_eventos")
      //   .download("prueba/prueba3.jpeg");
      // console.log(data, error);
      // const fr = new FileReader();
      // fr.readAsDataURL(data);
      // fr.onload = () => {
      //   setImage(fr.result as string);
      // };

      // listar todos las imagenes en una carpeta

      // const { data, error } = await supabase.storage
      //   .from("imagenes_eventos")
      //   .list("prueba/");

      // // console.log(data, error);
      // console.log(data[0], error);
      // console.log(data.length);
    }
  };

  return (
    <Pressable onPress={pickImage} style={[styles.imageContainer, style]}>
      {image ? (
        <Image
          source={{ uri: image.uri }}
          resizeMode="cover"
          resizeMethod="auto"
          style={styles.button}
        />
      ) : (
        <UploadImageIcon />
      )}
    </Pressable>
  );
}
