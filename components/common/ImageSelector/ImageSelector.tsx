import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "../../../src/supabase";
import { decode } from "base64-arraybuffer";
import { COLORS } from "../../../constants/theme";
import styles from "./imageSelector.style";

const uploadImageIcon = require("../../../assets/images/upload_file.png");

export default function ImageSelector({
  image,
  onImageChange,
}: {
  image: ImagePicker.ImagePickerAsset;
  onImageChange: (image: ImagePicker.ImagePickerAsset) => void;
}) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      const extension = result.assets[0].uri.split(".").pop().toLowerCase();

      // subir imagen, nanoid() uuidv4(), generar id unico

      // onImageChange(result.assets[0]);
      // const { data, error } = await supabase.storage
      //   .from("imagenes_eventos")
      //   .upload(`aver/prueba23.${extension}`, decode(result.assets[0].base64));
      // console.log("error", error);
      // console.log("data", data);

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
    <Pressable onPress={pickImage} style={styles.imageContainer}>
      <Image
        source={image ? { uri: image.uri } : uploadImageIcon}
        resizeMode="contain"
        resizeMethod="auto"
        style={styles.button}
      />
    </Pressable>
  );
}
