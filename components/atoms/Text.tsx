import {Text} from "native-base";
import {StyleSheet} from "react-native";
import React from "react";

type AppTextProps = {
    children: React.ReactNode
}

export default  function AppText({children}: AppTextProps){
    return (
        <Text style={styles.text}>{children}</Text>
    )
}


const styles = StyleSheet.create({
    text:{
        color: 'white'
    }
})