import { Stack, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

export default function SecondStep() {
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
