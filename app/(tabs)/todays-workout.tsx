import {useEffect} from "react";
import useGetUser from "@/api/queries/useGetUser";
import useGetMesocycles from "@/api/queries/useGetMesocycles";
import useUserStore from '@/store/user.store'
import useMesocyclesStore from '@/store/mesocycles.store'
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Box, HStack, Input, ScrollView, Spinner, Text, VStack} from "native-base";
import {todaysWorkout} from "@/utils";
import ExerciseInput from "@/components/todaysWorkout/ExerciseInput";
import {differenceInCalendarDays, differenceInCalendarISOWeeks, format} from "date-fns";
import useTodaysWorkoutStore from "@/store/todaysWorkout.store";
import {useShallow} from "zustand/react/shallow";

export default function TodaysWorkout() {
    const {data: userData, isFetching: isUserFetching, error: isUserError} = useGetUser('65fd893a65caf1b69f1da64b')
    const {
        data: mesoData,
        isFetching: isMesoFetching,
        error: isMesoError
    } = useGetMesocycles('65fd893a65caf1b69f1da64b')
    const setUser = useUserStore(useShallow(state => state.setUser))
    const [setExercises, exercises] = useTodaysWorkoutStore(useShallow(state => [state.setExercises, state.exercises]))
    const {setMesocycles, active} = useMesocyclesStore(useShallow(state => state))

    useEffect(() => {
        if (!userData || mesoData?.length === 0) return
        setUser(userData)
        setMesocycles(mesoData!)
        console.log("USER DATA: ", userData)
        console.log("MESO DATA: ", mesoData)

        if (!exercises) return
        setExercises(exercises)
    }, [userData, mesoData])

    useEffect(() => {
        if (!active) return
        console.log("ACTIVE: ", active)
        const workout = todaysWorkout(active)
        console.log("WORKOUT: ", workout)
        const exercises = workout?.exercises.map(e => ({id: e.id, exercise: e.exercise}))
        console.log("EXERCISES: ", exercises)
    }, [active])

    return (
        <ScrollView style={{backgroundColor: '#020817'}}>
            <Text>Todays Workout</Text>
            {(isUserFetching || isMesoFetching) && <Spinner/>}
            {/*{(active) && (*/}
            {/*    <Box>*/}
            {/*        <VStack>*/}
            {/*            <Box>*/}
            {/*                <Text style={[styles.whiteText, {opacity: 0.5}]}>{active.title.toUpperCase()}</Text>*/}
            {/*                <Text*/}
            {/*                    style={[styles.whiteText, {fontSize: 18}]}>WEEK <Text*/}
            {/*                    style={{fontSize: 24}}>{differenceInCalendarISOWeeks(new Date(), new Date(active.startDate)) + 1}</Text>/ {active.duration} - {format(new Date(), 'EEEE').toUpperCase()}*/}
            {/*                </Text>*/}
            {/*                {exercises.map(e => (*/}
            {/*                    <View key={e.id}>*/}
            {/*                        <Text style={styles.whiteText}>{e.exercise}</Text>*/}
            {/*                    </View>*/}
            {/*                ))}*/}
            {/*            </Box>*/}
            {/*        </VStack>*/}
            {/*    </Box>*/}
            {/*)}*/}
            {/*{(active && exercises) && (*/}
            {/*    <>*/}
            {/*        <Box style={styles.exercisesContainer}>*/}
            {/*            <VStack space={3}>*/}
            {/*                <Box style={[styles.exerciseContainer]}>*/}
            {/*                    <Text style={[styles.whiteText, {opacity: 0.5}]}>{active.title.toUpperCase()}</Text>*/}
            {/*                    <Text*/}
            {/*                        style={[styles.whiteText, {fontSize: 18}]}>WEEK <Text*/}
            {/*                        style={{fontSize: 24}}>{differenceInCalendarISOWeeks(new Date(), new Date(active.startDate)) + 1}</Text>/ {active.duration} - {format(new Date(), 'EEEE').toUpperCase()}*/}
            {/*                    </Text>*/}
            {/*                </Box>*/}
            {/*                {exercises.map((e) => (*/}
            {/*                    <View style={[styles.exerciseContainer]} key={e.id}>*/}
            {/*                        <Text style={[styles.whiteText, {*/}
            {/*                            marginBottom: 10,*/}
            {/*                            fontWeight: 'bold'*/}
            {/*                        }]}>{e.exercise}</Text>*/}
            {/*                        <ExerciseInput exercise={e}/>*/}
            {/*                    </View>*/}
            {/*                ))}*/}
            {/*            </VStack>*/}
            {/*        </Box>*/}
            {/*        <TouchableOpacity>*/}
            {/*            <Text>Complete Workout</Text>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </>*/}
            {/*)}*/}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    exercisesContainer: {
        padding: 10,
    },
    exerciseContainer: {
        backgroundColor: '#1E293B',
        padding: 10,
    },
    whiteText: {
        color: 'white'
    }
})