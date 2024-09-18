import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import 'react-native-reanimated'
import 'react-native-gesture-handler'

import {useColorScheme} from '@/hooks/useColorScheme';
import {Text, View} from "react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import WelcomeScreen from "@/screens/WelcomeScreen";
import {styled} from "nativewind";
import {NativeBaseProvider} from "native-base";
import {QueryClient, QueryClientProvider} from "react-query";

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

    return (
        <QueryClientProvider client={new QueryClient()}>
        <NativeBaseProvider>
            <View style={{flex: 1, backgroundColor:'white', padding: 10}}>
                <WelcomeScreen/>
            </View>
        </NativeBaseProvider>
        </QueryClientProvider>
        /*<Stack>*/
        //{/*  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />*/}
        //{/*  <Stack.Screen name="+not-found" />*/}
        //{/*</Stack>*/
    );
}
