import {Colors} from "@/constants/Colors";
import {styleConstants} from "@/constants/styles";
import {ScrollView, View} from "native-base";
import {SafeAreaView, StyleSheet} from "react-native";
import {StyleProps} from "react-native-reanimated";

type ScreenContainerProps = {
    children: React.ReactNode
    style?: StyleProps
}

export default function ScreenContainer({children, style}: ScreenContainerProps) {
    return (
            <ScrollView style={[styles.container]} contentContainerStyle={style}>
        <SafeAreaView>
                {children}
        </SafeAreaView>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        padding: styleConstants.screenPadding,
    }
})
