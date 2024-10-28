import {Box, Input} from "native-base";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "@/constants/Colors";
import Heading from "@/components/atoms/Heading";
import React from "react";

type RegisterProps = {
    setState: React.Dispatch<React.SetStateAction<'login' | 'register'>>
}

export default function Register({setState}: RegisterProps){
    return (
        <>
            <Heading modifier={'h2'}>Register</Heading>
        <View style={{gap: 10}}>
            <Box flexDirection={'column'} style={{gap: 5}}>
                <Text style={styles.whiteText}>Username</Text>
                <Input style={styles.input}/>
            </Box>
            <Box flexDirection={'column'} style={{gap: 5}}>
                <Text style={styles.whiteText}>Password</Text>
                <Input type={'password'} style={styles.input}/>
            </Box>
            <Box flexDirection={'column'} style={{gap: 5}}>
                <Text style={styles.whiteText}>Confirm password</Text>
                <Input type={'password'} style={styles.input}/>
            </Box>
        </View>
    <View>
        <Text style={styles.whiteText}>Alrady have an account?</Text>
        <TouchableOpacity onPress={() => setState('login')}>
            <Text style={{color: Colors.textGray, textDecorationLine: 'underline'}}>Log in!</Text>
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
