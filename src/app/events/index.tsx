import { Stack } from "expo-router";
import BottomTabNavigator from "../../../components/common/Navigation/BottomTabNavigator/BottomTabNavigator";
import { LocationProvider } from "../../providers/LocationProvider";
import { PortalProvider } from "@gorhom/portal";
import { EventsProvider } from "../../providers/EventsProvider";
import { AuthProvider } from "../../providers/AuthProvider";
import { CategoriesProvider } from "../../providers/CategoryProvider";
import { FilterProvider } from "../../providers/FilterProvider";

export default function EventsPage() {
  return (
    <>
    {/* <AuthProvider> */}
      
<Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />
        <EventsProvider>
        <CategoriesProvider>
          <FilterProvider>
          <PortalProvider>
          <BottomTabNavigator />
          </PortalProvider>
          </FilterProvider>
         </CategoriesProvider>
        </EventsProvider>
    {/* </AuthProvider> */}
      

    </>
  );
}
