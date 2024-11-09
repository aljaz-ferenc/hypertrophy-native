import {Text, View} from "native-base";
import {StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import {StyleProps} from "react-native-reanimated";

type BadgeProps = {
    text: string,
    style?: StyleProps
}

export default function Badge({text, style}: BadgeProps){
    return (
        <View style={[styles.container, style]}><Text style={styles.text}>{text}</Text></View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        alignSelf:'flex-start',
        borderRadius: 100,
        paddingHorizontal: 10
    },
    text: {
        fontSize: 12,
        textTransform:'capitalize'
    }
})