import {StyleSheet, TouchableOpacity, View} from "react-native";
import {PropsWithChildren} from "react";
import {Text} from "native-base";

type ButtonProps = {
    modifier: 'primary' | 'secondary' | 'disabled'
    onPress: () => void
    children: React.ReactNode
}

export default function Button({modifier, onPress, children}: ButtonProps){
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'white',
        borderRadius: 5,
        color: 'black',
        padding: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
        paddingHorizontal: 7
    }
})