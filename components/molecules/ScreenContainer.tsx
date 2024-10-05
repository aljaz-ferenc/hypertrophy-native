import { Colors } from "@/constants/Colors";
import { ScrollView, View } from "native-base";
import { StyleSheet } from "react-native";

type ScreenContainerProps = {
    children: React.ReactNode
}

export default function ScreenContainer({children}: ScreenContainerProps){
    return (
        <ScrollView style={styles.container}>{children}</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        flex: 1,
        padding: 10
    }
})