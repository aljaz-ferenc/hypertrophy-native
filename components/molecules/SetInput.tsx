import {Checkbox, CheckIcon, HStack, Input, Text, View, VStack} from "native-base";
import {Animated, StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/Colors";
import useTodaysWorkoutStore from "@/store/todaysWorkout.store";
import {useShallow} from "zustand/react/shallow";
import {Swipeable} from "react-native-gesture-handler";

type SetInputProps = {
    input: {
        reps: string,
        weight: string,
        id: string,
        isChecked: boolean
    },
    exercise: any,
    index: number
}

export default function SetInput({input, exercise, index}: SetInputProps) {
    const [updateInput, removeInput, toggleCheckedInput] =
        useTodaysWorkoutStore(
            useShallow((state) => [
                state.updateInput,
                state.removeInput,
                state.toggleCheckedInput
            ])
        );

    return (
        <Swipeable renderRightActions={renderRightActions} onSwipeableRightOpen={() => removeInput(exercise.id, input.id)}
                   dragOffsetFromRightEdge={50}>
            <VStack style={styles.inputRow} key={input.id}>
                <VStack space={3}>
                    <HStack
                        style={{
                            marginHorizontal: "auto",
                            alignItems: "center",
                        }}
                        space={5}
                        key={input.id}
                    >
                        <Text style={styles.whiteText}>{index + 1}</Text>
                        <Input
                            isDisabled={input.isChecked}
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                if (value === "") {
                                    updateInput(exercise.id, input.id, value, "weight");
                                    return;
                                }
                                if (/^\d*\.?\d*$/.test(value)) {
                                    const parsedValue = parseFloat(value);
                                    if (!isNaN(parsedValue) && parsedValue.toString() === value) {
                                        updateInput(exercise.id, input.id, parsedValue.toString(), "weight");
                                    } else {
                                        updateInput(exercise.id, input.id, value, "weight");
                                    }
                                }
                            }}
                            style={styles.input}
                            value={input.weight.toString()}
                        />
                        <Input
                            isDisabled={input.isChecked}
                            keyboardType="numeric"
                            onChangeText={(value) => {
                                if (value === "") {
                                    updateInput(exercise.id, input.id, value, "reps");
                                    return;
                                }
                                if (!isNaN(parseInt(value))) {
                                    updateInput(
                                        exercise.id,
                                        input.id,
                                        value,
                                        "reps"
                                    );
                                    return;
                                }
                            }}
                            style={styles.input}
                            value={input.reps.toString()}
                        />
                        <TouchableOpacity onPress={() => console.log(exercise.data)}>
                            <Checkbox backgroundColor={Colors.primary} borderColor={Colors.white} isChecked={input.isChecked} value={input.id} onChange={(checked) => {toggleCheckedInput(input.id, checked, exercise.id)}}/>
                        </TouchableOpacity>
                    </HStack>
                </VStack>
            </VStack>
        </Swipeable>
    )
}

const renderRightActions = (
    progress: any,
    dragAnimatedValue: any,
) => {
    const opacity = dragAnimatedValue.interpolate({
        inputRange: [-90, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={{backgroundColor: Colors.primary, height: '100%', width: '100%', opacity, justifyContent: 'center', borderRadius: 5}}>
            <TouchableOpacity>
                <Text style={{marginLeft: 'auto', marginRight: 15, color: Colors.white}}>Delete</Text>
            </TouchableOpacity>
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    screenContainer: {
        padding: 10,
        backgroundColor: Colors.primary,
    },
    exerciseContainer: {
        backgroundColor: Colors.secondary,
        padding: 10,
    },
    whiteText: {
        color: "white",
    },
    input: {
        maxWidth: 100,
        backgroundColor: "#020817",
        color: "white",
    },
    button: {
        backgroundColor: "white",
        borderRadius: 5,
        color: "black",
        padding: 5,
        marginTop: 10,
        alignSelf: "flex-start",
    },
    labels: {
        marginLeft: 38,
        marginBottom: 5,
    },
    label: {
        color: "white",
        opacity: 0.5,
    },
    inputRow: {
        marginVertical: 10,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#020817",
    },
    completeBtn: {flex: 1, alignSelf: "stretch", marginTop: 10},
    noMesoTitle: {
        color: Colors.white,
        paddingTop: 10,
    },
    noMesoMessage: {
        color: Colors.white,
    },
});