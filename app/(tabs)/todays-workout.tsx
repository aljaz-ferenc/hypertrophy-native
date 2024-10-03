import { useEffect } from "react";
import useGetUser from "@/api/queries/useGetUser";
import useGetMesocycles from "@/api/queries/useGetMesocycles";
import useUserStore from "@/store/user.store";
import useMesocyclesStore from "@/store/mesocycles.store";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Box,
  Center,
  CloseIcon,
  HStack,
  Input,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { todaysWorkout } from "@/utils";
import ExerciseInput from "@/components/todaysWorkout/ExerciseInput";
import {
  differenceInCalendarDays,
  differenceInCalendarISOWeeks,
  format,
} from "date-fns";
import useTodaysWorkoutStore from "@/store/todaysWorkout.store";
import { useShallow } from "zustand/react/shallow";
import Button from "@/components/ui/Button";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import Heading from "@/components/ui/Heading";

export default function TodaysWorkout() {
  const {
    data: userData,
    isFetching: isUserFetching,
    error: isUserError,
  } = useGetUser("65fd893a65caf1b69f1da64b");
  const {
    data: mesoData,
    isFetching: isMesoFetching,
    error: isMesoError,
  } = useGetMesocycles("65fd893a65caf1b69f1da64b");
  const setUser = useUserStore(useShallow((state) => state.setUser));
  const [setExercises, exercises, addInput, removeInput, updateInput] =
    useTodaysWorkoutStore(
      useShallow((state) => [
        state.setExercises,
        state.exercises,
        state.addInput,
        state.removeInput,
        state.updateInput,
      ])
    );
  const { setMesocycles, active } = useMesocyclesStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    if (!userData || !mesoData) return;
    setUser(userData);
    setMesocycles(mesoData!);
  }, [userData, mesoData]);

  useEffect(() => {
    if (!active) return;
    const workout = todaysWorkout(active);
    const exercises = workout?.exercises.map((e) => ({
      id: e.id,
      exercise: e.exercise,
    }));
    exercises && setExercises(exercises);
  }, [active]);

  if ((isUserFetching || isMesoFetching) && !mesoData) {
    return (
      <Box style={styles.spinnerContainer}>
        <Spinner size={"lg"} />
      </Box>
    );
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <Heading modifier="h1">Todays Workout</Heading>
      {active && exercises && (
        <>
          <Box>
            <VStack space={3}>
              <Box style={[styles.exerciseContainer]}>
                <Text style={[styles.whiteText, { opacity: 0.5 }]}>
                  {active.title.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.whiteText,
                    { fontSize: 18, fontWeight: "bold" },
                  ]}
                >
                  WEEK{" "}
                  <Text style={{ fontSize: 24 }}>
                    {differenceInCalendarISOWeeks(
                      new Date(),
                      new Date(active.startDate)
                    ) + 1}
                  </Text>
                  / {active.duration} -{" "}
                  {format(new Date(), "EEEE").toUpperCase()}
                </Text>
              </Box>
              {exercises.map((e) => (
                <View style={[styles.exerciseContainer]} key={e.id}>
                  <Text
                    style={[
                      styles.whiteText,
                      {
                        marginBottom: 10,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {e.exercise}
                  </Text>
                  <HStack style={styles.labels}>
                    <Text style={[styles.label]}>SET</Text>
                    <Text style={[styles.label, { marginLeft: 32 }]}>
                      {" "}
                      WEIGHT
                    </Text>
                    <Text style={[styles.label, { marginLeft: 78 }]}>REPS</Text>
                  </HStack>
                  {e.data.map((input, i) => (
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
                          <Text style={styles.whiteText}>{i + 1}</Text>
                          <Input
                            keyboardType="numeric"
                            onChangeText={(value) => {
                              if (value === "") {
                                updateInput(e.id, input.id, value, "weight");
                                return;
                              }
                              if (!isNaN(parseInt(value))) {
                                console.log(!isNaN(parseInt(value)));
                                updateInput(
                                  e.id,
                                  input.id,
                                  parseInt(value),
                                  "weight"
                                );
                                return;
                              }
                            }}
                            style={styles.input}
                            value={input.weight.toString()}
                          />
                          <Input
                            keyboardType="numeric"
                            onChangeText={(value) => {
                              if (value === "") {
                                updateInput(e.id, input.id, value, "reps");
                                return;
                              }
                              if (!isNaN(parseInt(value))) {
                                console.log(!isNaN(parseInt(value)));
                                updateInput(
                                  e.id,
                                  input.id,
                                  parseInt(value),
                                  "reps"
                                );
                                return;
                              }
                            }}
                            style={styles.input}
                            value={input.reps.toString()}
                          />
                          <TouchableOpacity
                            disabled={e.data.length < 2}
                            onPress={() => removeInput(e.id, input.id)}
                          >
                            <CloseIcon />
                          </TouchableOpacity>
                        </HStack>
                      </VStack>
                    </VStack>
                  ))}
                  <Button modifier={"primary"} onPress={() => addInput(e.id)}>
                    ADD SET
                  </Button>
                </View>
              ))}
            </VStack>
            <Button
              style={{ flex: 1, alignSelf: "stretch" }}
              onPress={() => {
                console.log(exercises);
              }}
              modifier="primary"
            >
              Complete Workout
            </Button>
          </Box>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    backgroundColor: "#020817"
  },
  exerciseContainer: {
    backgroundColor: "#1E293B",
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
    marginBottom: 10,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020817",
  },
});
