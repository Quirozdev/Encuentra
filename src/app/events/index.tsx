import { Stack } from "expo-router";
import BottomTabNavigator from "../../../components/common/Navigation/BottomTabNavigator/BottomTabNavigator";

export default function EventsPage() {
  return (
    <>
      <Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
      <BottomTabNavigator />
    </>
  );
}
