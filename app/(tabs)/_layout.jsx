import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
//import { Loader } from "../../components";
//import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", gap: 2 }}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 24, height: 24 }}
      />
      <Text
        style={{
          fontFamily: focused ? "font-psemibold" : "font-pregular",
          fontSize: 12,
          color: color,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#0384fc",
          tabBarInactiveTintColor: "#383b40",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "white",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: "Order",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Order"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              
                <TabIcon
                  icon={icons.cart}
                  color={color}
                  name="Cart"
                  focused={focused}
                />
                         ),
          }}
        />
        <Tabs.Screen
          name="prescription"
          options={{
            title: "Prescription",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.prescription}
                color={color}
                name="Prescription"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="white" style="light" />
    </>
  );
};

export default TabLayout;
