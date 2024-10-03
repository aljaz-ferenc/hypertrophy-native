import {Box, HamburgerIcon, Text} from "native-base";
import {StyleSheet} from "react-native";

export default function Menu(){
    return (
        <Text style={styles.container}>
            <HamburgerIcon size={30}/>
        </Text>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'white'
    }
})