import { Stack, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/app/store";

export default function EventCreationConfirmation() {
  const values = useSelector((state: RootState) => state.eventCreationForm);

  console.log(values);

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <View>
        <Text>soy el segundo paso</Text>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <Text>holaaa</Text>
        </Pressable>
      </View>
    </>
  );
}
