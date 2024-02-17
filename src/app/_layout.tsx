import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import { LocationProvider } from "../providers/LocationProvider";
import { EventsProvider } from "../providers/EventsProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <LocationProvider>
          <EventsProvider>
            <Provider store={store}>
              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </Provider>
          </EventsProvider>
        </LocationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
