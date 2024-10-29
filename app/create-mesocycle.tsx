import {Divider, FlatList, Input, Text, VStack} from "native-base";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import FormErrorMessage from "@/components/atoms/FormErrorMessage";
import Button from "@/components/atoms/Button";
import {WeightUnits, Workout} from "@/types";
import WorkoutComponent from '@/components/molecules/Workout'
import {useNewMesoStore} from "@/store/newMeso.store";
import {useShallow} from "zustand/react/shallow";
import * as Crypto from 'expo-crypto'

const durationOptions = [4, 6, 8] as const
const unitOptions: WeightUnits[] = ['kg', 'lb']

export default function CreateMesocycle() {
    const [mesoName, setMesoName] = useState('')
    const {t} = useTranslation()
    const [errors, setErrors] = useState({mesoName: ''})
    const [duration, title, units, workouts, setTitle, setUnits, addWorkout, updateWorkout, setDuration] = useNewMesoStore(useShallow(state => [
        state.duration,
        state.title,
        state.units,
        state.workouts,
        state.setTitle,
        state.setUnits,
        state.addWorkout,
        state.updateWorkout,
        state.setDuration
    ]))

    const onSubmit = () => {
        if (!mesoName) {
            setErrors(prev => ({...prev, mesoName: t("ERROR.required")}))
        }
    }

    console.log(duration, title, units, workouts)

    return (
        <ScreenContainer>
            <VStack space={8}>
                <VStack style={styles.nameContainer}>
                    <Text style={[styles.whiteText]}>{t("CREATE_MESO.name")}</Text>
                    <Input style={styles.whiteText} value={mesoName} onChangeText={setMesoName}/>
                    {errors.mesoName && <FormErrorMessage message={errors.mesoName}/>}
                </VStack>
                <VStack>
                    <Text style={[styles.whiteText]}>{t("CREATE_MESO.selectDuration")}</Text>
                    <FlatList
                        horizontal
                        data={durationOptions}
                        keyExtractor={item => item.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => setDuration(item)}
                                              style={[styles.toggleBtn, duration === item && styles.toggleBtnActive]}><Text
                                style={[styles.whiteText]}>{item}</Text></TouchableOpacity>
                        )}
                    />
                </VStack>
                <VStack>
                    <Text style={[styles.whiteText]}>{t("CREATE_MESO.selectUnits")}</Text>
                    <FlatList
                        horizontal
                        data={unitOptions}
                        keyExtractor={item => item}
                        renderItem={({item}) => (
                            <TouchableOpacity onPress={() => setUnits(item)}
                                              style={[styles.toggleBtn, units === item && styles.toggleBtnActive]}><Text
                                style={[styles.whiteText, {textTransform: "uppercase"}]}>{item}</Text></TouchableOpacity>
                        )}
                    />
                </VStack>
            </VStack>
            <Divider style={{backgroundColor: Colors.textGray, marginVertical: 20}}/>
            <Button modifier={'dark'} onPress={() => addWorkout({
                id: Crypto.randomUUID(),
                exercises: [],
                weekDay: 1
            })}>{t("CREATE_MESO.addDayBtn")}</Button>
            <FlatList
                marginBottom={8}
                marginTop={1}
                horizontal
                data={workouts}
                keyExtractor={item => item.id}
                renderItem={({item}) => <WorkoutComponent/>}
            />
            <Button modifier={'primary'} onPress={onSubmit}>{t("CREATE_MESO.submitBtn")}</Button>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    whiteText: {
        color: 'white'
    },
    toggleBtn: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 7
    },
    toggleBtnActive: {
        backgroundColor: Colors.secondary
    },
    nameContainer: {}
})