import "./../gesture-handler";
import "@/global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

import { QueryClient, QueryClientProvider } from "react-query";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TodaysWorkout from "@/app/todays-workout";
import CreateMesocycle from "@/app/create-mesocycle";
import MyMesocycles from "@/app/my-mesocycles";
import CompletedWorkouts from "@/app/completed-workouts";
import Stats from "@/app/stats";
import Nutrition from "@/app/nutrition";
import { Icon } from "react-native-elements";
import {
  Box,
  Input,
  InputGroup,
  KeyboardAvoidingView,
  NativeBaseProvider,
  VStack,
} from "native-base";
import useUserStore from "@/store/user.store";
import SetUser from "@/components/modules/SetUser";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/i18n/i18n.config.ts";
import Settings from "./settings";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants/Colors";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import Login from "@/components/modules/Login";
import Register from "@/components/modules/Register";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLogin } from "@/api/queries/useLogin";
import useGetUser from "@/api/queries/useGetUser";
import Button from "@/components/atoms/Button";
import Dashboard from "@/app/dashboard";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const user = useUserStore((state) => state.user);
  const { t } = useTranslation();
  const { getItem } = useAsyncStorage("hypertrophy-userId");
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  
  useEffect(() => {
    getItem().then((item) => {
      if (item) {
        setUserId(item);
        console.log("ITEM: ", item);
      } else {
        setUserId(null);
      }
    });
  }, []);


  if (!loaded) {
    return null;
  }

  const Drawer = createDrawerNavigator();

  return (
    <GluestackUIProvider mode="light">
      <QueryClientProvider client={new QueryClient()}>
        <NativeBaseProvider>
          {!user?._id ? (
            <SetUser userId={userId} />
          ) : (
            <Drawer.Navigator
              screenOptions={{
                headerShown: true,
                headerTitleStyle: { color: Colors.white },
                headerTintColor: Colors.white,
                drawerStyle: { backgroundColor: "#1E293B" },
                drawerLabelStyle: styles.label,
                drawerInactiveBackgroundColor: "transparent",
                drawerInactiveTintColor: "#aaa",
                drawerActiveTintColor: "white",
                drawerType: "front",
                headerStyle: {
                  backgroundColor: Colors.primary,
                },
              }}
            >
              <Drawer.Screen
                  name={"dashboard"}
                  component={Dashboard}
                  options={{
                    drawerLabel: t("MENU.dashboard"),
                    title: t("MENU.dashboard"),
                    drawerIcon: () => (
                        <Icon name={"dashboard"} color={"white"} />
                    ),
                  }}
              />
              <Drawer.Screen
                name={"todays-workout"}
                component={TodaysWorkout}
                options={{
                  drawerLabel: t("MENU.todaysWorkout"),
                  title: t("MENU.todaysWorkout"),
                  drawerIcon: () => (
                    <Icon name={"fitness-center"} color={"white"} />
                  ),
                }}
              />
              <Drawer.Screen
                name={"create-mesocycle"}
                component={CreateMesocycle}
                options={{
                  drawerLabel: t("MENU.createMesocycle"),
                  title: t("MENU.createMesocycle"),
                  drawerIcon: () => (
                    <Icon name={"add-circle"} color={"white"} />
                  ),
                }}
              />
              <Drawer.Screen
                name={"my-mesocycles"}
                component={MyMesocycles}
                options={{
                  drawerLabel: t("MENU.myMesocycles"),
                  title: t("MENU.myMesocycles"),
                  drawerIcon: () => (
                    <Icon name={"folder-open"} color={"white"} />
                  ),
                }}
              />
              <Drawer.Screen
                name={"completed-workouts"}
                component={CompletedWorkouts}
                options={{
                  drawerLabel: t("MENU.completedWorkouts"),
                  title: t("MENU.completedWorkouts"),
                  drawerIcon: () => <Icon name={"task"} color={"white"} />,
                }}
              />
              <Drawer.Screen
                name={"stats"}
                component={Stats}
                options={{
                  drawerLabel: t("MENU.stats"),
                  title: t("MENU.stats"),
                  drawerIcon: () => (
                    <Icon name={"leaderboard"} color={"white"} />
                  ),
                }}
              />
              <Drawer.Screen
                name={"nutrition"}
                component={Nutrition}
                options={{
                  drawerLabel: t("MENU.nutrition"),
                  title: t("MENU.nutrition"),
                  drawerIcon: () => (
                    <Icon name={"restaurant"} color={"white"} />
                  ),
                }}
              />
              <Drawer.Screen
                name={"settings"}
                component={Settings}
                options={{
                  drawerLabel: t("MENU.settings"),
                  title: t("MENU.settings"),
                  drawerIcon: () => <Icon name={"settings"} color={"white"} />,
                }}
              />
            </Drawer.Navigator>
          )}
        </NativeBaseProvider>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Colors.white,
  },
  whiteText: {
    color: "white",
  },
  input: {
    backgroundColor: Colors.secondary,
    color: "white",
    marginHorizontal: "auto",
  },
});
