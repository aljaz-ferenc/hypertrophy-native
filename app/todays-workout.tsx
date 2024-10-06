import { useEffect, useTransition } from "react";
import useGetUser from "@/api/queries/useGetUser";
import useGetMesocycles from "@/api/queries/useGetMesocycles";
import useUserStore from "@/store/user.store";
import useMesocyclesStore from "@/store/mesocycles.store";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Box,
  CloseIcon,
  HStack,
  Input,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { getMesocycleProgress, getTodaysDay, todaysWorkout } from "@/utils";
import { differenceInCalendarISOWeeks, format, getDay } from "date-fns";
import useTodaysWorkoutStore from "@/store/todaysWorkout.store";
import { useShallow } from "zustand/react/shallow";
import Button from "@/components/atoms/Button";
import { Colors } from "@/constants/Colors";
import { WorkoutLog } from "@/types";
import useCompleteWorkout from "@/api/queries/useCompleteWorkout";
import { useTranslation } from "react-i18next";
import { Days } from "@/enums/Days";
import useGetActiveMesocycle from "@/api/queries/useGetActiveMesocycle";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import Heading from "@/components/atoms/Heading";
import { useQueryClient } from "react-query";
import { useRouter } from "expo-router";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import MesoProgressBar from "@/components/molecules/MesoProgressBar";

export default function TodaysWorkout() {
  const [userId] = useUserStore(useShallow((state) => [state.user?._id]));
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data,
    isFetching,
    error: activeMesoError,
  } = useGetActiveMesocycle(userId!);
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

  const { mutateAsync, error } = useCompleteWorkout();

  useEffect(() => {
    if (!data?.mesocycle) return;
    const workout = todaysWorkout(data?.mesocycle);
    const exercises = workout?.exercises.map((e) => ({
      id: e.id,
      exercise: e.exercise,
    }));
    exercises && setExercises(exercises);
  }, [data?.mesocycle]);

  if (isFetching) {
    return (
      <Box style={styles.spinnerContainer}>
        <Spinner size={"lg"} />
      </Box>
    );
  }

  const onCompleteWorkout = async () => {
    if (!data?.mesocycle) return;
    const week = differenceInCalendarISOWeeks(
      new Date(),
      new Date(data?.mesocycle.startDate)
    );

    const workoutLog: WorkoutLog = {
      day: getTodaysDay(),
      exercises: exercises.map((e) => ({
        exercise: e.exercise,
        data: e.data.map((d) => ({
          reps: d.reps || 0,
          weight: d.weight || 0,
        })),
      })),
    };

    if (!userId) return;
    try {
      await mutateAsync({
        userId,
        logId: data?.mesocycle._id,
        workout: workoutLog,
        weekIndex: week,
        workoutIndex: workoutLog.day,
      });
      queryClient.invalidateQueries({ queryKey: ["logs"] });
      queryClient.invalidateQueries({ queryKey: ["active-mesocycle"] });
      router.push("/completed-workouts");
    } catch (err) {
      console.log(err);
    }
  };

  if (data?.message === "startsMonday") {
    return (
      <ScreenContainer>
        {data?.mesocycle ? (
          <MesoProgressBar
            startDate={data.mesocycle.startDate}
            durationInWeeks={data.mesocycle.duration}
          />
        ) : null}
        <Heading style={styles.noMesoTitle} modifier="h2">
          {t("TODAYS_WORKOUT.STARTS_MONDAY.title")}
        </Heading>

        <Text style={styles.noMesoMessage}>
          {t("TODAYS_WORKOUT.STARTS_MONDAY.message")}
        </Text>
      </ScreenContainer>
    );
  }

  if (data?.message === "mesoCompleted") {
    return (
      <ScreenContainer>
        {data?.mesocycle ? (
          <MesoProgressBar
            startDate={data.mesocycle.startDate}
            durationInWeeks={data.mesocycle.duration}
          />
        ) : null}
        <Heading style={styles.noMesoTitle} modifier="h2">
          {t("TODAYS_WORKOUT.MESO_COMPLETED.title")}
        </Heading>

        <Text style={styles.noMesoMessage}>
          {t("TODAYS_WORKOUT.MESO_COMPLETED.message")}
        </Text>
      </ScreenContainer>
    );
  }

  if (data?.message === "workoutCompleted") {
    return (
      <ScreenContainer>
        {data?.mesocycle ? (
          <MesoProgressBar
            startDate={data.mesocycle.startDate}
            durationInWeeks={data.mesocycle.duration}
          />
        ) : null}
        <Heading style={styles.noMesoTitle} modifier="h2">
          {t("TODAYS_WORKOUT.WORKOUT_COMPLETED.title")}
        </Heading>

        <Text style={styles.noMesoMessage}>
          {t("TODAYS_WORKOUT.WORKOUT_COMPLETED.message")}
        </Text>
      </ScreenContainer>
    );
  }

  if (data?.message === "noActiveMesos") {
    return (
      <ScreenContainer>
        <Heading style={styles.noMesoTitle} modifier="h2">
          {t("TODAYS_WORKOUT.NO_ACTIVE_MESOS.title")}
        </Heading>

        <Text style={styles.noMesoMessage}>
          {t("TODAYS_WORKOUT.NO_ACTIVE_MESOS.message")}
        </Text>
      </ScreenContainer>
    );
  }

  if (data?.message === "restDay") {
    return (
      <ScreenContainer>
        {data?.mesocycle ? (
          <MesoProgressBar
            startDate={data.mesocycle.startDate}
            durationInWeeks={data.mesocycle.duration}
          />
        ) : null}
        <Heading style={styles.noMesoTitle} modifier="h2">
          {t("TODAYS_WORKOUT.REST.title")}
        </Heading>
        <Text style={styles.noMesoMessage}>
          {t("TODAYS_WORKOUT.REST.message")}
        </Text>
      </ScreenContainer>
    );
  }

  return (
    <ScrollView style={styles.screenContainer}>
      {data?.mesocycle ? (
        <MesoProgressBar
          startDate={data.mesocycle.startDate}
          durationInWeeks={data.mesocycle.duration}
        />
      ) : null}
      {data?.mesocycle && exercises ? (
        <>
          <Box>
            <VStack space={3}>
              <Box style={[styles.exerciseContainer]}>
                <Text style={[styles.whiteText, { opacity: 0.5 }]}>
                  {data?.mesocycle.title.toUpperCase()}
                </Text>
                <Text
                  style={[
                    styles.whiteText,
                    { fontSize: 18, fontWeight: "bold" },
                  ]}
                >
                  {t("TODAYS_WORKOUT.week")}{" "}
                  <Text style={{ fontSize: 24 }}>
                    {differenceInCalendarISOWeeks(
                      new Date(),
                      new Date(data.mesocycle.startDate)
                    ) + 1}
                  </Text>
                  / {data.mesocycle.duration} -{" "}
                  {t(`DAYS.${Days[getTodaysDay()]}`).toUpperCase()}
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
              style={styles.completeBtn}
              onPress={onCompleteWorkout}
              modifier="primary"
            >
              {t("TODAYS_WORKOUT.completeBtn")}
            </Button>
          </Box>
        </>
      ) : null}
    </ScrollView>
  );
}

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
    marginBottom: 10,
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#020817",
  },
  completeBtn: { flex: 1, alignSelf: "stretch", marginTop: 10 },
  noMesoTitle: {
    color: Colors.white,
    paddingTop: 10,
  },
  noMesoMessage: {
    color: Colors.white,
  },
});
