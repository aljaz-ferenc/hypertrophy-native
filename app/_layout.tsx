import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import {NativeBaseProvider} from "native-base";
import {QueryClient, QueryClientProvider} from "react-query";
import {View} from "react-native";



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
                {/*<NavigationContainer>*/}
                    {/*<WelcomeScreen/>*/}
                <View></View>
                    <Tabs/>
                {/*</NavigationContainer>*/}
            </NativeBaseProvider>
        </QueryClientProvider>
    );
}

function Tabs() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found"/>
        </Stack>
    )
}
