import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000", // Dark background
          borderTopWidth: 0, // Remove the top border
          height: 70, // Adjust height for better spacing
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarActiveTintColor: "#FFD700", // Yellow for active tab
        tabBarInactiveTintColor: "#B3B3B3", // Gray for inactive tabs
      }}
    >
      {/* Rewards Tab */}
      <Tabs.Screen
        name="rewards"
        options={{
          title: "Rewards",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "star" : "star-outline"}
              size={24}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      {/* Bookings Tab */}
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "check-circle" : "check-circle-o"}
              size={24}
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      {/* Activity Tab */}
      <Tabs.Screen
        name="activity"
        options={{
          title: "Activity",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "chart-line" : "chart-line-variant"}
              size={24}
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user-circle" : "user-circle-o"}
              size={24}
              color={color}
            />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
}
