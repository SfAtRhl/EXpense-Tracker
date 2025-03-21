import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className={`flex flex-col items-center flex-1 mt-3`}>
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  const { isDarkMode } = useTheme();
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? "black" : "white",
            position: "absolute",
            borderTopColor: "#0061FF1A",
            borderTopWidth: 0.2,
            minHeight: 50,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "#0061FF" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Statistics"
          options={{
            title: "Statistics",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="stats-chart"
                size={24}
                color={focused ? "#0061FF" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Category"
          options={{
            title: "Categories",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="grid"
                size={24}
                color={focused ? "#0061FF" : "gray"}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default TabsLayout;
