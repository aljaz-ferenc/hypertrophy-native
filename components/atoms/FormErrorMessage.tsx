import {Text} from "native-base";
import {StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";

type FormErrorMessage = {
    message: string | undefined
}

export default function FormErrorMessage({message}: FormErrorMessage){
    if(!message) return null

    return (
        <Text style={styles.message}>{message}</Text>
    )
}

const styles = StyleSheet.create({
    message:{
        color: Colors.danger,
        fontStyle: 'italic',
        fontSize: 12
    }
})