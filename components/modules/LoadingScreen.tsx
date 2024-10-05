import { Colors } from "@/constants/Colors"
import { Spinner, View } from "native-base"
import { StyleSheet } from "react-native"

export default function LoadingScreen(){
    return (
        <View style={styles.container}>
            <Spinner size={'lg'}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    }
})