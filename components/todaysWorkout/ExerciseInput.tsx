// import {Exercise} from "@/types";
// import {Box, CloseIcon, HStack, Icon, Input, Text, VStack} from "native-base";
// import {useState} from "react";
// import {StyleSheet, TouchableOpacity} from "react-native";
// import Button from "@/components/ui/Button";
// import useTodaysWorkoutStore from "@/store/todaysWorkout.store";
// import {useShallow} from "zustand/react/shallow";

// type ExerciseInputProps = {
//     exercise:{
//         id: string,
//         exercise: string,
//     }
// }

// export default function ExerciseInput({exercise}: ExerciseInputProps) {
//     const [setExercises, exercises] = useTodaysWorkoutStore(useShallow(state => [state.setExercises, state.exercises]))
//     const [sets, setSets] = useState(() => {
//         const initialInputs = []
//         initialInputs.push(crypto.randomUUID())
//         return initialInputs
//     })

//     const removeSet = (set: string) => {
//         setSets(prev => prev.filter(s => s !== set))
//     }

//     return (
//         <VStack>
//             <HStack>
//                 <Text style={[styles.label, {marginLeft: 9}]}>SET</Text>
//                 <Text style={[styles.label, {marginLeft: 35}]}>WEIGHT</Text>
//                 <Text style={[styles.label, {marginLeft: 75}]}>REPS</Text>
//             </HStack>
//             <VStack space={3}>
//                 {sets.map((set, i) => (
//                     <HStack style={{marginHorizontal: 'auto', alignItems: 'center'}} space={5} key={set}>
//                         <Text style={styles.whiteText}>{i + 1}</Text>
//                         <Input style={styles.input}/>
//                         <Input style={styles.input}/>
//                         <TouchableOpacity onPress={() => removeSet(set)}>
//                             <CloseIcon />
//                         </TouchableOpacity>
//                     </HStack>
//                 ))}
//             </VStack>
//             <Button modifier={'primary'} onPress={() => setSets(prev => [...prev, crypto.randomUUID()])}>ADD SET
//             </Button>
//         </VStack>
//     )
// }

// const styles = StyleSheet.create({
//     input: {
//         maxWidth: 100,
//         backgroundColor: '#020817',
//         color: 'white'
//     },
//     button: {
//         backgroundColor: 'white',
//         borderRadius: 5,
//         color: 'black',
//         padding: 5,
//         marginTop: 10,
//         alignSelf: 'flex-start'
//     },
//     whiteText: {
//         color: 'white'
//     },
//     label: {
//         color: 'white',
//         opacity: 0.5
//     }
// })