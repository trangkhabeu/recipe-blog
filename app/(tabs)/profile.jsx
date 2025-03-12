import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import TopBooking from "../../components/Profile/TopBooking";
import TopTrip from "../../components/Profile/TopTrip";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileInfor from "../../components/Profile/ProfileInfor";
const Tab = createMaterialTopTabNavigator();
export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      {/* Profile */}
      <ProfileInfor />
      <Tab.Navigator>
        <Tab.Screen name="Booked" component={TopBooking} />
        <Tab.Screen name="Trips" component={TopTrip} />
        {/* <Tab.Screen name="Information" component={TopInfo} /> */}
      </Tab.Navigator>
    </View>
  );
}
