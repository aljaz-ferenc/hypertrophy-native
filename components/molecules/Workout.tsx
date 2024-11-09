import {
  Actionsheet,
  Box,
  Center,
  CheckIcon,
  DeleteIcon,
  FlatList,
  HStack,
  Popover,
  Select,
  Spinner,
  Text,
  ThreeDotsIcon,
  View,
  VStack,
} from "native-base";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNewMesoStore } from "@/store/newMeso.store";
import type { Exercise, MuscleGroup, Workout } from "@/types";
import { useShallow } from "zustand/react/shallow";
import Button from "@/components/atoms/Button";
import { Colors } from "@/constants/Colors";
import { useGetMuscleGroups } from "@/api/queries/useGetMuscleGroups";
import * as Crypto from "expo-crypto";
import useGetExercises from "@/api/queries/useGetExercises";
import { Col } from "react-native-table-component";
import Badge from "@/components/atoms/Badge";
import { TouchableOpacity } from "react-native";

type WorkoutProps = {
  workout: Workout;
};

export default function Workout({ workout }: WorkoutProps) {
  const { t } = useTranslation();
  const [updateWorkout, setExercise, deleteExercise, deleteWorkout] =
    useNewMesoStore(
      useShallow((state) => [
        state.updateWorkout,
        state.setExercise,
        state.deleteExercise,
        state.deleteWorkout,
      ])
    );
  const [selectMuscleGroupIsOpen, setSelectMuscleGroupIsOpen] = useState(false);
  const [exercisesIsOpen, setExercisesIsOpen] = useState(false);
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState("");
  const { data: muscleGroups } = useGetMuscleGroups();
  const { data: exercises } = useGetExercises();
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const days = useMemo(() => {
    return [
      { label: t("DAYS.monday"), value: 1 },
      { label: t("DAYS.tuesday"), value: 2 },
      { label: t("DAYS.wednesday"), value: 3 },
      { label: t("DAYS.thursday"), value: 4 },
      { label: t("DAYS.friday"), value: 5 },
      { label: t("DAYS.saturday"), value: 6 },
      { label: t("DAYS.sunday"), value: 7 },
    ];
  }, [t]);

  const weekDay = days.find((day) => day.value === workout.weekDay);

  const onDayChange = (day: number) => {
    updateWorkout(workout.id, "weekDay", day);
  };

  const onAddExercise = (muscleGroupId: MuscleGroup["_id"]) => {
    updateWorkout(workout.id, "exercises", [
      ...workout.exercises,
      {
        muscleGroup: muscleGroups!.find((mg) => mg._id === muscleGroupId),
        _id: Crypto.randomUUID(),
        name: "",
      },
    ]);
    setSelectMuscleGroupIsOpen(false);
  };

  const onOpenExercises = (open: boolean, exercise: Exercise) => {
    setCurrentMuscleGroup(exercise.muscleGroup._id);
    setCurrentExercise(exercise);
    setExercisesIsOpen(open);
  };

  const onSetExercise = (
    workoutId: string,
    exerciseId: string,
    exerciseName: string
  ) => {
    if (!currentExercise) return;
    setExercise(workoutId, currentExercise?._id, exerciseName);
    setExercisesIsOpen(false);
  };

  const onDeleteWorkout = (workoutId: string) => {
    deleteWorkout(workoutId);
    setPopupIsOpen(false);
  };

  return (
    <>
      <VStack
        maxW="300"
        style={{
          marginRight: 15,
          borderWidth: 1,
          borderColor: Colors.border,
          padding: 10,
          borderRadius: 5,
        }}
        space={2}
      >
        <Box
          style={{
            backgroundColor: Colors.secondary,
            padding: 10,
            borderRadius: 4,
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Select
            color={"white"}
            backgroundColor={Colors.primary}
            selectedValue={weekDay?.value.toString() || undefined}
            minWidth="200"
            accessibilityLabel="Choose Service"
            placeholder={t("CREATE_MESO.selectDay")}
            mt={1}
            onValueChange={(day) => onDayChange(+day)}
          >
            {days.map((day) => (
              <Select.Item
                key={day.value}
                label={day.label}
                value={day.value.toString()}
              />
            ))}
          </Select>
          <Popover
            isOpen={popupIsOpen}
            onClose={() => setPopupIsOpen(false)}
            onOpen={() => setPopupIsOpen(true)}
            trigger={(triggerProps) => {
              return (
                <TouchableOpacity {...triggerProps}>
                  <ThreeDotsIcon />
                </TouchableOpacity>
              );
            }}
          >
            <Popover.Content borderWidth={0}>
              <Popover.Body padding={0}>
                <Button
                  onPress={() => onDeleteWorkout(workout.id)}
                  modifier="destructive"
                >
                  {t("CREATE_MESO.deleteDay")}
                </Button>
              </Popover.Body>
            </Popover.Content>
          </Popover>
        </Box>
        {workout.exercises.map((e) => (
          <Box
            key={e._id}
            style={{
              backgroundColor: Colors.secondary,
              padding: 10,
              borderRadius: 4,
            }}
          >
            <HStack justifyContent={"space-between"}>
              <Badge
                style={{ marginBottom: 10 }}
                text={t(`MUSCLE_GROUPS.${e.muscleGroup.name}`)}
              />
              <TouchableOpacity
                onPress={() => deleteExercise(workout.id, e._id)}
              >
                <DeleteIcon />
              </TouchableOpacity>
            </HStack>
            {!e.name ? (
              <TouchableOpacity
                style={{ paddingTop: 5 }}
                onPress={() => onOpenExercises(true, e)}
              >
                <Text
                  style={{
                    color: Colors.textGray,
                    borderStyle: "dashed",
                    borderColor: Colors.danger,
                    borderWidth: 1,
                    padding: 3,
                    fontStyle: "italic",
                  }}
                >
                  {t("CREATE_MESO.selectExercise")}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={{ color: Colors.white }}>{e.name}</Text>
            )}
          </Box>
        ))}
        <Button
          onPress={() => setSelectMuscleGroupIsOpen(!selectMuscleGroupIsOpen)}
          disabled={workout.weekDay === 0}
          modifier={"dark"}
          textStyle={{
            color: workout.weekDay > 0 ? Colors.textGray : Colors.border,
          }}
          style={{ width: "100%" }}
        >
          + {t("CREATE_MESO.addMuscleGroup")}
        </Button>
      </VStack>
      <Actionsheet
        onClose={() => setSelectMuscleGroupIsOpen(false)}
        isOpen={selectMuscleGroupIsOpen}
      >
        <Actionsheet.Content style={{ backgroundColor: Colors.secondary }}>
          {
            <FlatList
              style={{ width: "100%" }}
              _contentContainerStyle={{ alignItems: "center" }}
              data={muscleGroups}
              keyExtractor={(item) => item._id!}
              renderItem={({ item }) => (
                <Actionsheet.Item
                  style={{ backgroundColor: Colors.secondary }}
                  onPress={() => onAddExercise(item._id)}
                >
                  <Text
                    style={{ textTransform: "uppercase", color: Colors.white }}
                  >
                    {t(`MUSCLE_GROUPS.${item.name}`)}
                  </Text>
                </Actionsheet.Item>
              )}
            />
          }
        </Actionsheet.Content>
      </Actionsheet>

      <Actionsheet
        onClose={() => setExercisesIsOpen(false)}
        isOpen={exercisesIsOpen}
      >
        <Actionsheet.Content style={{ backgroundColor: Colors.secondary }}>
          {exercises && (
            <FlatList
              style={{ width: "100%" }}
              _contentContainerStyle={{ alignItems: "center" }}
              data={exercises.filter(
                (e) => e.muscleGroup._id === currentMuscleGroup
              )}
              keyExtractor={(item) => item._id!}
              renderItem={({ item }) => (
                <Actionsheet.Item
                  style={{ backgroundColor: Colors.secondary }}
                  onPress={() => onSetExercise(workout.id, item._id, item.name)}
                >
                  <Text
                    style={{ textTransform: "uppercase", color: Colors.white }}
                  >
                    {item.name}
                  </Text>
                </Actionsheet.Item>
              )}
            />
          )}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}
