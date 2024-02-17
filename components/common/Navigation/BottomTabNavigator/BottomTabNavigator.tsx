import React from "react";
import MainScreen from "../../../screens/MainScreen";
import TrendingScreen from "../../../screens/TrendingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../../../constants/theme";
import BottomTabIcon from "../BottomTabIcon/BottomTabIcon";
import CustomBottomTab from "../CustomBottomTab/CustomBottomTab";
import LikedScreen from "../../../screens/LikedScreen";
import ProfileScreen from "../../../screens/ProfileScreen";

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <BottomTabIcon isFocused={focused} route={route.name} />
        ),
        tabBarLabel: () => {
          return null;
        },
      })}
      tabBar={(props) => (
        <CustomBottomTab
          state={props.state}
          descriptors={props.descriptors}
          navigation={props.navigation}
          insets={props.insets}
        />
      )}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Liked"
        component={LikedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
