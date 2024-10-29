import {FlatList, HStack, Input, Text, VStack} from "native-base";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import Heading from "@/components/atoms/Heading";
import {StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import FormErrorMessage from "@/components/atoms/FormErrorMessage";
import Button from "@/components/atoms/Button";

const durationOptions = [4, 6, 8] as const
const unitOptions = ['KG', 'LB'] as const

export default function CreateMesocycle() {
    const [duration, setDuration] = useState(4)
    const [units, setUnits] = useState<'KG' | 'LB'>('KG')
    const [mesoName, setMesoName] = useState('')
    const {t} = useTranslation()
    const [errors, setErrors] = useState({mesoName: ''})

    const onSubmit = () => {
        if(!mesoName){
            setErrors(prev => ({...prev, mesoName: 'Required'}))
        }
    }

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
                                style={[styles.whiteText]}>{item}</Text></TouchableOpacity>
                        )}
                    />
                </VStack>
            </VStack>
            <Button modifier={'white'} onPress={onSubmit}>{t("CREATE_MESO.submitBtn")}</Button>
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