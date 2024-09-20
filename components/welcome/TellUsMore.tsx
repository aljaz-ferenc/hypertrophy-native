import {TouchableOpacity, View} from "react-native";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {SetStateAction, useEffect, useState} from "react";
import {
    Box,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    KeyboardAvoidingView,
    Select,
    Spinner,
    Switch,
    Text
} from "native-base";
import {NewUserData} from "@/screens/WelcomeScreen";
import useCreateUser from "@/api/queries/useCreateUser";
import {months} from "@/constants/Months";
import {UnitSystems} from "@/enums/UnitSystems";
import {ActivityLevels} from "@/enums/ActivityLevels";
import useGetUser from "@/api/queries/useGetUser";

const years = Array.from({length: 100}, (_, index) => new Date().getFullYear() - index)

const formSchema = z.object({
    dob: z.date(),
    height: z.number(),
    weight: z.number(),
    activityLevel: z.number(),
    units: z.enum([UnitSystems.METRIC, UnitSystems.IMPERIAL])
})

type FormData = z.infer<typeof formSchema>

type TellUsMoreProps = {
    userData: NewUserData,
    setUserData: React.Dispatch<SetStateAction<NewUserData>>
}

export default function TellUsMore({userData, setUserData}: TellUsMoreProps) {
    const [units, setUnits] = useState<UnitSystems.METRIC | UnitSystems.IMPERIAL>(UnitSystems.METRIC)
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({resolver: zodResolver(formSchema)})
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
    const {mutateAsync, error, isSuccess, isLoading} = useCreateUser()
    const [dataComplete, setDataComplete] = useState(false)
    const [dob, setDob] = useState<{ day: null | number, month: null | number, year: null | number }>({
        day: null,
        month: null,
        year: null
    })


    const setInput = (field: keyof FormData, value: any) => setUserData((prev) => {
        switch (field) {
            case 'height':
                return {...prev, height: value}
            case 'weight':
                return {...prev, weight: value}
            case 'activityLevel':
                return {...prev, activityLevel: value}
            case 'dob':
                return {...prev, dob: value}
            default:
                return prev
        }
    })

    useEffect(() => {
        if (!dob.day || !dob.month || !dob.year) return
        const dateOfBirth = new Date(`${dob.month.toString().padStart(2, '0')}-${dob.day.toString().padStart(2, '0')}-${dob.year}`)
        setInput('dob', dateOfBirth)
    }, [dob])

    useEffect(() => {
        const validation = formSchema.safeParse(userData)
        if(!validation.success) {
            setDataComplete(false)
            return
        }

        setDataComplete(true)
    }, [userData, dob])

    const onSubmit = async () => {
        if (!dataComplete) return
        const validation =  formSchema.safeParse(userData)

        if(!validation.success) return
        await mutateAsync(validation.data)
    }

    return (
        <KeyboardAvoidingView style={{gap: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>TELL US MORE ABOUT YOURSELF</Text>
            <Text style={{color: 'gray'}}>For the app to work correctly, we need some additional information about you.</Text>
            <Box style={{marginTop: 30}}>
                <Text>Units</Text>
                <HStack space={5}>
                    <Text>Metric</Text>
                    <Switch onValueChange={value => setUnits(value ? UnitSystems.IMPERIAL : UnitSystems.METRIC)}
                            value={units !== UnitSystems.METRIC}
                            size={'md'}/>
                    <Text>Imperial</Text>
                </HStack>
            </Box>
            <Box>
                <Text>Height</Text>
                <InputGroup>
                    <Input onChangeText={(text) => setInput('height', Number(text))}/>
                    <InputRightAddon children={units === UnitSystems.IMPERIAL ? 'ft' : 'cm'}/>
                </InputGroup>
            </Box>
            <Box>
                <Text>Weight</Text>
                <InputGroup>
                    <Input onChangeText={(text) => setInput('weight', Number(text))}/>
                    <InputRightAddon children={units === UnitSystems.IMPERIAL ? 'lbs' : 'kg'}/>
                </InputGroup>
            </Box>
            <Box>
                <Text>Activity Level</Text>
                <Select onValueChange={(value) => setInput('activityLevel', value)} placeholder={'Select...'}>
                    <Select.Item label={'Sedentary'} value={ActivityLevels.SEDENTARY.toString()}/>
                    <Select.Item label={'Slightly Active'} value={ActivityLevels.SLIGHTLY_ACTIVE.toString()}/>
                    <Select.Item label={'Moderately Active'} value={ActivityLevels.MODERATELY_ACTIVE.toString()}/>
                    <Select.Item label={'Active'} value={ActivityLevels.ACTIVE.toString()}/>
                    <Select.Item label={'VeryActive'} value={ActivityLevels.VERY_ACTIVE.toString()}/>
                </Select>
            </Box>
            <Box>
                <Text>Date of birth</Text>
                <HStack space={3}>
                    <View>
                        <Select width={100} placeholder={'Month'} onValueChange={month => {
                            setDob(prev => ({...prev, month: Number(month)}))
                            setSelectedMonth(Number(month))
                        }}>
                            {months.map((month, index) => (
                                <Select.Item key={month.name} label={month.label} value={index.toString()}/>
                            ))}
                        </Select>
                    </View>
                    <Box>
                        {selectedMonth ? (
                            <Select width={100} placeholder={'Day'}
                                    onValueChange={(day) => setDob(prev => ({...prev, day: Number(day)}))}>
                                {Array.from({length: months[selectedMonth].days}, (_, index) => (
                                    <Select.Item value={(index + 1).toString()} label={(index + 1).toString()}
                                                 key={index}/>
                                ))}
                            </Select>
                        ) : (<Select width={100} placeholder={'Day'}
                                     onValueChange={(day) => setDob(prev => ({...prev, day: Number(day)}))}>
                            {Array.from({length: 31}, (_, index) => (
                                <Select.Item value={(index + 1).toString()} label={(index + 1).toString()} key={index}/>
                            ))}
                        </Select>)}
                    </Box>
                    <Box>
                        <Select width={100} placeholder={'Year'}
                                onValueChange={year => setDob(prev => ({...prev, year: Number(year)}))}>
                            {years.map(year => <Select.Item key={year} value={year.toString()}
                                                            label={year.toString()}/>)}
                        </Select>
                    </Box>
                </HStack>
            </Box>
            <TouchableOpacity style={{backgroundColor: dataComplete ? 'steelblue' : 'gray', padding: 10, borderRadius: 10, marginTop: 20}} disabled={!dataComplete} onPress={onSubmit}>
                {!isLoading ? <Text style={{alignSelf: 'center', color: 'white'}}>Submit</Text> : <Spinner color={'white'}/>}
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}