import './../gesture-handler'
import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

import {useColorScheme} from '@/hooks/useColorScheme';
import {ColorValue, StyleSheet, Text, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import WelcomeScreen from "@/screens/WelcomeScreen";
import {styled} from "nativewind";
import {HamburgerIcon, NativeBaseProvider} from "native-base";
import {QueryClient, QueryClientProvider} from "react-query";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import DrawerContent from "@/components/molecules/DrawerContent";
import TodaysWorkout from "@/app/todays-workout";
import CreateMesocycle from "@/app/create-mesocycle";
import MyMesocycles from "@/app/my-mesocycles";
import CompletedWorkouts from "@/app/completed-workouts";
import Stats from "@/app/stats";
import Nutrition from "@/app/nutrition";
import {Icon} from "react-native-elements";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const Drawer = createDrawerNavigator()


    return (
        <QueryClientProvider client={new QueryClient()}>
            <NativeBaseProvider>
                {/*<Text style={{color: '#fff'}} onPress={() => }>Close/Open</Text>*/}
                <Drawer.Navigator screenOptions={{
                    headerShown: true,
                    drawerStyle: {backgroundColor: '#1E293B'},
                    drawerLabelStyle: styles.label,
                    drawerInactiveBackgroundColor: 'transparent',
                    drawerInactiveTintColor: '#aaa',
                    drawerActiveTintColor: 'white',
                    drawerType: 'slide'
                }}>
                    <Drawer.Screen name={'todays-workout'} component={TodaysWorkout} options={{
                        drawerLabel: "Today's Workout",
                        title: "Today's workout",
                        drawerIcon: () => <Icon name={'fitness-center'} color={'white'}/>
                    }}/>
                    <Drawer.Screen name={'create-mesocycle'} component={CreateMesocycle} options={{
                        drawerLabel: "Create Mesocycle",
                        title: 'Create Mesocycle',
                        drawerIcon: () => <Icon name={'add-circle'} color={'white'}/>
                    }}/>
                    <Drawer.Screen name={'my-mesocycles'} component={MyMesocycles} options={{
                        drawerLabel: "My Mesocycles",
                        title: 'My Mesocycles',
                        drawerIcon: () => <Icon name={'folder-open'} color={'white'}/>
                    }}/>
                    <Drawer.Screen name={'completed-workouts'} component={CompletedWorkouts} options={{
                        drawerLabel: "Completed Workouts",
                        title: 'Completed Workouts',
                        drawerIcon: () => <Icon name={'task'} color={'white'}/>
                    }}/>
                    <Drawer.Screen name={'stats'} component={Stats} options={{
                        drawerLabel: "Stats",
                        title: 'Stats',
                        drawerIcon: () => <Icon name={'leaderboard'} color={'white'}/>
                    }}/>
                    <Drawer.Screen name={'nutrition'} component={Nutrition} options={{
                        drawerLabel: "Nutrition",
                        title: 'Nutrition',
                        drawerIcon: () => <Icon name={'restaurant'} color={'white'}/>
                    }}/>
                </Drawer.Navigator>
                {/*<View style={{flex: 1, backgroundColor:'white', padding: 10}}>*/}
                {/*    <WelcomeScreen/>*/}
                {/*</View>*/}
            </NativeBaseProvider>
        </QueryClientProvider>
        /*<Stack>*/
        //{/*  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />*/}
        //{/*  <Stack.Screen name="+not-found" />*/}
        //{/*</Stack>*/
    );
}

const styles = StyleSheet.create({
    label: {
        // color: '#ddd',
    }
})
