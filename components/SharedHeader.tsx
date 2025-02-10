"use client";

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

const SharedHeader: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View
      className={`flex-row justify-between items-center p-4 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <Text
        className={`text-xl font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        EXpense Tracker
      </Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={isDarkMode ? "sunny" : "moon"}
          size={24}
          color={isDarkMode ? "white" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SharedHeader;
