import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Welcome from "@/components/welcome/Welcome";
import TellUsMore from "@/components/welcome/TellUsMore";
import {useState} from "react";
import {UnitSystems} from "@/enums/UnitSystems";

export type NewUserData = {
    height: null | number,
    weight: null | number,
    activityLevel: null | number,
    dob: null | Date,
    units: UnitSystems.METRIC | UnitSystems.IMPERIAL
}

export default function WelcomeScreen() {
    const [step, setStep] = useState<'welcome' | 'tellUsMore'>('welcome')
    const [userData, setUserData] = useState<NewUserData>({
        height: null,
        weight: null,
        activityLevel: null,
        dob: null,
        units: UnitSystems.METRIC
    })

    return (
        <View style={styles.container}>
            {step === 'welcome' &&
                <Welcome/>
            }
            {step === 'tellUsMore' &&
                <TellUsMore userData={userData} setUserData={setUserData}/>
            }
            <TouchableOpacity onPress={() => setStep('tellUsMore')}>
                <Text>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        gap: 100,
    }
})



