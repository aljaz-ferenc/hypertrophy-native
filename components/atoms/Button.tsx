import {StyleSheet, StyleSheetProperties, TouchableOpacity, View} from "react-native";
import {PropsWithChildren} from "react";
import {Text} from "native-base";
import { StyleProps } from "react-native-reanimated";

type ButtonProps = {
    modifier: 'primary' | 'secondary' | 'disabled'
    onPress: () => void
    children: React.ReactNode
    style?: StyleProps
}

export default function Button({modifier, onPress, children, style = {}}: PropsWithChildren<ButtonProps>){
    return (
        <TouchableOpacity style={[styles[modifier], style]} onPress={onPress}>
            <Text>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    primary:{
        backgroundColor: 'white',
        borderRadius: 5,
        color: 'black',
        padding: 5,
        marginTop: 10,
        alignSelf: 'flex-start',
        paddingHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center'
    }
})