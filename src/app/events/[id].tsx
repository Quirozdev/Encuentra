import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log("eventId: ", id);

  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <SafeAreaView>
        <ScrollView></ScrollView>
      </SafeAreaView>
      <Text>{id}</Text>
    </>
  );
}
