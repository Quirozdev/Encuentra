import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import { useRouter, Stack, Link } from "expo-router";

import styles from "./RegisterForm.style";
import BaseTextInput from "../../common/BaseTextInput/BaseTextInput";
import LinkButton from "../../common/LinkButton/linkButton";
import ReturnButton from "../../common/ReturnButton/ReturnButton";
import PasswordInput from "../../common/PasswordTextInput/PasswordTextInput";
import ModalOneButton from "../../common/Modal_1Button/Modal_1Button";
import ModalTwoButton from "../../common/Modal_2Button/Modal_2Button";
import LoadingScreen from "../../common/LoadingScreen/LoadingScreen";
import { supabase } from "../../../src/supabase";

import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { useState } from "react";
import React from "react";

const RegisterForm = () => {
  const passwordRegex = new RegExp(
    "^(?=.*[A-ZÑ])(?=.*\\d)[A-Za-zÑñ\\d@$!%*?&-_]{8,15}$"
  );
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalTwoVisible, setIsModalTwoVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const verificationType = "Register";
  const [fields, setFields] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    contrasena: "",
    celular: "",
  });
  const [validFields, setValidFields] = useState({
    nombres: true,
    apellidos: true,
    email: true,
    contrasena: true,
    celular: true,
  });

  async function verifyEmail(email) {
    const { data } = await supabase
      .from("usuarios")
      .select("email")
      .eq("email", email);
    return !(data.length > 0);
  }

  async function verifyPhone(phone) {
    const { data } = await supabase
      .from("usuarios")
      .select("celular")
      .eq("celular", phone);
    return !(data.length > 0);
  }

  async function insertUser(user) {
    const { data, error } = await supabase.from("usuarios").insert({
      id: user.id,
      created_at: user.created_at,
      nombres: fields.nombres,
      apellidos: fields.apellidos,
      celular: user.user_metadata.phone,
      email: user.email,
    });
  }

  async function signUp() {
    const { data, error } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.contrasena,
      options: {
        data: {
          phone: fields.celular,
        },
      },
    });
    if (!error) {
      insertUser(data.user);
      return data.user;
    }
    if (error) console.log("Error:", error);
  }

  const handleSubmit = async () => {
    const newValidFields = { ...validFields };
    for (let field in fields) {
      newValidFields[field] = Boolean(fields[field]);
    }
    setValidFields(newValidFields);

    const allFieldsAreValid = Object.values(newValidFields).every(
      (value) => value === true
    );
    const allFieldsHaveInput = Object.values(fields).every(
      (value) => value != ""
    );


    if (allFieldsAreValid && allFieldsHaveInput) {
      if (!passwordRegex.test(fields.contrasena)) {
        setModalMessage(
          "La contraseña debe tener entre 8 y 15 caracteres, una letra mayúscula, un número y ningún espacio."
        );
        setIsModalVisible(true);
      } else {
        // poner pantalla a cargar
        setLoading(true);
        const [validEmail, validPhone] = await Promise.all([
          verifyEmail(fields.email),
          verifyPhone(fields.celular),
        ]);
        if (validEmail && validPhone) {
          const user = await signUp();
          setLoading(false);
          router.push({
            pathname: "/users/verificationCode",
            params: { id: user.id, email: user.email,verificationType: verificationType },
          });
        } else {
          if (!validEmail)
            setModalMessage("El correo ingresado ya está registrado");
          if (!validPhone)
            setModalMessage(
              "El número de teléfono ingresado ya está registrado"
            );
          setLoading(false);
          setIsModalTwoVisible(true);
        }
      }
    }
  };

  const handleChange = (field, value) => {
    setFields({
      ...fields,
      [field]: value,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: COLORS.white },
          headerShadowVisible: false,
          headerLeft: () => <ReturnButton />,
          headerTitle: "",
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Registrarse</Text>
        </View>

        <View style={styles.inputContainer}>
          <BaseTextInput
            placeholder="Nombre(s) *"
            style={validFields.nombres ? styles.input : styles.badInput}
            onChangeText={(value) => handleChange("nombres", value)}
            value={fields.nombres}
          />
          <Text style={validFields.nombres ? styles.goodText : styles.badText}>
            Por favor, complete este campo
          </Text>
          <BaseTextInput
            placeholder="Apellido(s) *"
            style={validFields.apellidos ? styles.input : styles.badInput}
            onChangeText={(value) => handleChange("apellidos", value)}
            value={fields.apellidos}
          />
          <Text
            style={validFields.apellidos ? styles.goodText : styles.badText}
          >
            Por favor, complete este campo
          </Text>
          <BaseTextInput
            placeholder="Correo electrónico *"
            inputMode="email"
            keyboardType="email-address"
            style={validFields.email ? styles.input : styles.badInput}
            onChangeText={(value) => handleChange("email", value)}
            value={fields.email}
          />
          <Text style={validFields.email ? styles.goodText : styles.badText}>
            Por favor, complete este campo
          </Text>
          <PasswordInput
            placeholder="Contraseña *"
            style={validFields.contrasena ? styles.input : styles.badInput}
            handleTextChange={(value) => handleChange("contrasena", value)}
          />
          <Text
            style={validFields.contrasena ? styles.goodText : styles.badText}
          >
            Por favor, complete este campo
          </Text>
          <BaseTextInput
            placeholder="Celular *"
            keyboardType="numeric"
            inputMode="numeric"
            style={validFields.celular ? styles.input : styles.badInput}
            onChangeText={(value) => handleChange("celular", value)}
            value={fields.celular}
          />
          <Text style={validFields.celular ? styles.goodText : styles.badText}>
            Por favor, complete este campo
          </Text>
        </View>

        <View style={styles.button}>
          <LinkButton
            text="Crear cuenta"
            handleNavigate={() => {
              handleSubmit();
            }}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={{ color: COLORS.red }}>
            *<Text style={styles.text}>Campos son obligatorios</Text>
          </Text>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.footer}>
        <Text style={styles.text}>
          ¿Ya tienes una cuenta?{" "}
          <Text
            style={{ color: COLORS.darkOrange, fontFamily: FONTS.RubikBold }}
            onPress={() => {
              router.replace("/users/login");
            }}
          >
            Inicia Sesión
          </Text>
        </Text>
      </SafeAreaView>

      {isLoading && <LoadingScreen/>}

      <ModalOneButton
        isVisible={isModalVisible}
        title="ola"
        message={modalMessage}
        buttonText="Cerrar"
        onPress={() => {
          setIsModalVisible(false);
        }}
        buttonColor={COLORS.white}
        textColor={COLORS.lightOrange}
        exitButtonPress={() => {
          setIsModalVisible(false);
        }}
      />

      <ModalTwoButton
        isVisible={isModalTwoVisible}
        title="ola"
        message={modalMessage}
        buttonText1="Iniciar Sesión"
        buttonText2="Recuperar Cuenta"
        onPress1={() => {
          setIsModalTwoVisible(false);
          router.push("/users/login");
        }}
        onPress2={() => {
          console.log("voy a recuperar cuenta");
        }}
        buttonColor={COLORS.white}
        textColor={COLORS.lightOrange}
        exitButtonPress={() => {
          setIsModalTwoVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

export default RegisterForm;
