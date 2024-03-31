import { Stack } from "expo-router";
import BottomTabNavigator from "../../../components/common/Navigation/BottomTabNavigator/BottomTabNavigator";
import { LocationProvider } from "../../providers/LocationProvider";
import { PortalProvider } from "@gorhom/portal";
import { EventsProvider } from "../../providers/EventsProvider";
import { AuthContext } from "../../providers/AuthProvider";
import { CategoriesProvider } from "../../providers/CategoryProvider";
import { FilterProvider } from "../../providers/FilterProvider";
import { UserProfileProvider } from "../../providers/UserProfileProvider";
import { useContext } from "react";


export default function EventsPage() {
  const { session } = useContext(AuthContext);
  console.log('SESSION EN EVENTSPAGE: ',session );
  return (
    <>
    {/* <AuthProvider> */}
      
<Stack.Screen options={{ contentStyle: { backgroundColor: "white" } }} />

        
        <EventsProvider>
        <CategoriesProvider>
          <FilterProvider>
          <PortalProvider>
          <UserProfileProvider>
          <BottomTabNavigator />
          </UserProfileProvider>
          </PortalProvider>
          </FilterProvider>
         </CategoriesProvider>
        </EventsProvider>
        
    {/* </AuthProvider> */}
      
    </>
  );
}
