import {Box, Input} from "native-base";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/Colors";
import Heading from "@/components/atoms/Heading";
import React from "react";

type LoginProps = {
    setState: React.Dispatch<React.SetStateAction<'login' | 'register'>>
}

export default function Login({setState}: LoginProps) {
    return (
        <>
            <Heading modifier={'h2'}>Login</Heading>
            <View style={{gap: 10}}>
                <Box flexDirection={'column'} style={{gap: 5}}>
                    <Text style={styles.whiteText}>Username</Text>
                    <Input style={styles.input}/>
                </Box>
                <Box flexDirection={'column'} style={{gap: 5}}>
                    <Text style={styles.whiteText}>Password</Text>
                    <Input type={'password'} style={styles.input}/>
                </Box>
            </View>
            <View>
                <Text style={styles.whiteText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => setState('register')}>
                    <Text style={{color: Colors.textGray, textDecorationLine: 'underline'}}>Create one!</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    whiteText: {
        color: 'white'
    },
    input: {
        backgroundColor: Colors.secondary,
        color: "white",
        marginHorizontal: 'auto'
    },
})
