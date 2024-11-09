import {Actionsheet, Box, Center, CheckIcon, FlatList, Select, Spinner, Text, View, VStack} from "native-base";
import {useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {useNewMesoStore} from "@/store/newMeso.store";
import type {MuscleGroup, Workout} from "@/types";
import {useShallow} from "zustand/react/shallow";
import Button from "@/components/atoms/Button";
import {Colors} from "@/constants/Colors";
import {useGetMuscleGroups} from "@/api/queries/useGetMuscleGroups";
import * as Crypto from 'expo-crypto'
import useGetExercises from "@/api/queries/useGetExercises";
import {Col} from "react-native-table-component";
import Badge from "@/components/atoms/Badge";
import {TouchableOpacity} from "react-native";

type WorkoutProps = {
    workout: Workout
}

export default function Workout({workout}: WorkoutProps) {
    const {t} = useTranslation()
    const [updateWorkout, setExercise] = useNewMesoStore(useShallow(state => [state.updateWorkout, state.setExercise]))
    const [selectMuscleGroupIsOpen, setSelectMuscleGroupIsOpen] = useState(false)
    const [exercisesIsOpen, setExercisesIsOpen] = useState(false)
    const [currentMuscleGroup, setCurrentMuscleGroup] = useState('')
    const {data: muscleGroups} = useGetMuscleGroups()
    const {data: exercises} = useGetExercises()

    const days = useMemo(() => {
        return [
            {label: t("DAYS.monday"), value: 1},
            {label: t("DAYS.tuesday"), value: 2},
            {label: t("DAYS.wednesday"), value: 3},
            {label: t("DAYS.thursday"), value: 4},
            {label: t("DAYS.friday"), value: 5},
            {label: t("DAYS.saturday"), value: 6},
            {label: t("DAYS.sunday"), value: 7},
        ]
    }, [t])

    const weekDay = days.find(day => day.value === workout.weekDay)

    const onDayChange = (day: number) => {
        updateWorkout(workout.id, 'weekDay', day)
    }

    const onAddExercise = (muscleGroupId: MuscleGroup['_id']) => {
        updateWorkout(workout.id, 'exercises', [
            ...workout.exercises,
            {
                muscleGroup: muscleGroups!.find(mg => mg._id === muscleGroupId),
                _id: Crypto.randomUUID(),
                name: ''
            }
        ]);
        console.log(workout.exercises[0])
        setSelectMuscleGroupIsOpen(false);
    };

    const onOpenExercises = (open: boolean, muscleGroupId: string) => {
        setCurrentMuscleGroup(muscleGroupId)
        setExercisesIsOpen(open)
    }

    const onSetExercise = (workoutId: string, exerciseId: string, exerciseName: string) => {
        setExercise(workoutId, exerciseId, exerciseName);
        console.log(exerciseId);
        // console.log(workout)
    };


    return (
        <VStack maxW="300" style={{marginRight: 15}} space={2}>
            <Box style={{backgroundColor: Colors.secondary, padding: 10, borderRadius: 4}}>
                <Select color={'white'} textTransform={'capitalize'} backgroundColor={Colors.primary}
                        selectedValue={weekDay?.value.toString() || undefined} minWidth="200"
                        accessibilityLabel="Choose Service" placeholder="Select day..." mt={1}
                        onValueChange={day => onDayChange(+day)}>
                    {days.map(day => (
                        <Select.Item key={day.value} label={day.label} value={day.value.toString()}/>
                    ))}
                </Select>
            </Box>
            {workout.exercises.map(e => {
                if (!e.name) {
                    return <Box key={e.id} style={{backgroundColor: Colors.secondary, padding: 10, borderRadius: 4}}>
                        <Badge style={{marginBottom: 10}} text={e.muscleGroup.name}/>
                        <TouchableOpacity onPress={() => onOpenExercises(true, e.muscleGroup._id)}>
                            <Text style={{
                                color: Colors.textGray,
                                borderStyle: 'dashed',
                                borderColor: Colors.danger,
                                borderWidth: 1,
                                padding: 3,
                                fontStyle: 'italic'
                            }}>Select an exercise</Text>
                        </TouchableOpacity>
                    </Box>
                } else {
                    return <Text key={e.id} style={{color: 'white'}}>{e.name}</Text>
                }
            })}
            <Button onPress={() => setSelectMuscleGroupIsOpen(!selectMuscleGroupIsOpen)}
                    disabled={workout.weekDay === 0} modifier={'dark'}
                    textStyle={{color: workout.weekDay > 0 ? Colors.textGray : Colors.border}}
                    style={{width: '100%', marginTop: 10}}>+ Add muscle group</Button>
            <Actionsheet
                onClose={() => setSelectMuscleGroupIsOpen(false)}
                isOpen={selectMuscleGroupIsOpen}
            >
                <Actionsheet.Content style={{backgroundColor: Colors.secondary}}>
                    {<FlatList
                        style={{width: '100%'}}
                        _contentContainerStyle={{alignItems: 'center'}}
                        data={muscleGroups}
                        keyExtractor={item => item._id!}
                        renderItem={({item}) => (
                            <Actionsheet.Item style={{backgroundColor: Colors.secondary}}
                                              onPress={() => onAddExercise(item._id)}>
                                <Text style={{textTransform: 'uppercase', color: Colors.white}}>
                                    {item.name}
                                </Text>
                            </Actionsheet.Item>
                        )}
                    />}
                </Actionsheet.Content>
            </Actionsheet>

            <Actionsheet
                onClose={() => setExercisesIsOpen(false)}
                isOpen={exercisesIsOpen}
            >
                <Actionsheet.Content style={{backgroundColor: Colors.secondary}}>
                    {exercises && <FlatList
                        style={{width: '100%'}}
                        _contentContainerStyle={{alignItems: 'center'}}
                        data={exercises.filter(e => e.muscleGroup._id === currentMuscleGroup)}
                        keyExtractor={item => item.id!}
                        renderItem={({item}) => (
                            <Actionsheet.Item style={{backgroundColor: Colors.secondary}}
                                              onPress={() => onSetExercise(workout.id, item._id, item.name)}>
                                <Text style={{textTransform: 'uppercase', color: Colors.white}}>
                                    {item.name}
                                </Text>
                            </Actionsheet.Item>
                        )}
                    />}
                </Actionsheet.Content>
            </Actionsheet>
        </VStack>

    );
}

