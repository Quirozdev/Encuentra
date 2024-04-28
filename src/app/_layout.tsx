import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import { LocationProvider } from "../providers/LocationProvider";
import { EventsProvider } from "../providers/EventsProvider";
import { AuthProvider } from "../providers/AuthProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

function useNotificationObserver() {
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;

    function redirect(notification: Notifications.Notification) {
      const url = notification.request.content.data?.redirectUrl;
      if (url) {
        router.push(url);
      }
    }

    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (!isMounted || !response?.notification) {
        return;
      }
      console.log(response?.notification);
      redirect(response?.notification);
    });

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        redirect(response.notification);
      }
    );

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);
}

const Layout = () => {
  useNotificationObserver();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <LocationProvider>
          <Provider store={store}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </Provider>
        </LocationProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
