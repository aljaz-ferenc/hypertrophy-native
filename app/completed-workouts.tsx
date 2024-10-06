import { HStack, ScrollView, Text, View, VStack } from "native-base";
import { FlatList, StyleSheet } from "react-native";
import useGetLogs from "@/api/queries/useGetLogs";
import useUserStore from "@/store/user.store";
import { useEffect, useState } from "react";
import { Days } from "@/enums/Days";
import useLogsStore from "@/store/logs.store";
import { Colors } from "@/constants/Colors";
import LoadingScreen from "@/components/modules/LoadingScreen";

export default function CompletedWorkouts() {
  const userId = useUserStore((state) => state.user?._id);
  const { data, isFetching, error } = useGetLogs(userId!);
  const [openedLog, setOpenedLog] = useState<string | null>(null);
  const { logs, setLogs } = useLogsStore((state) => state);

  useEffect(() => {
    if (!data || logs) return;

    setLogs(data);
  }, [data]);

  const handleOpenLog = (mesoId: string) => {
    setOpenedLog((prev) => {
      if (mesoId === prev) {
        return null;
      }
      return mesoId;
    });
  };

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView style={styles.screenContainer}>
      <VStack style={styles.container}>
        {logs?.map((log, i) => (
          <View key={i}>
            <Text
              onPress={() => handleOpenLog(log.mesoId)}
              style={styles.title}
            >
              {log.mesoTitle}
            </Text>
            <View>
              {openedLog === log.mesoId ? (
                <VStack space={10}>
                  {log.weeks.map((week, i) => {
                    if (week.workouts.length > 0) {
                      return (
                        <View key={i}>
                          <View style={styles.weekContainer}>
                            <Text style={styles.weekName}>Week {i + 1}</Text>
                            <ScrollView horizontal key={i} style={styles.week}>
                              <HStack space={10}>
                                {week.workouts.map((workout, i) => (
                                  <VStack style={styles.day} key={i}>
                                    <Text style={styles.dayName}>
                                      {Days[workout.day].toUpperCase()}
                                    </Text>
                                    <View style={styles.workout} key={i}>
                                      {workout.exercises.map((exercise, i) => (
                                        <View key={i}>
                                          <Text
                                            style={[
                                              styles.whiteText,
                                              styles.exerciseTitle,
                                              { marginBottom: 5 },
                                            ]}
                                          >
                                            {exercise.exercise}
                                          </Text>
                                          <HStack marginLeft={5}>
                                            <VStack space={5}>
                                              <Text style={styles.whiteText}>
                                                Reps
                                              </Text>
                                              <Text style={styles.whiteText}>
                                                Weight
                                              </Text>
                                            </VStack>
                                            <HStack style={{ marginLeft: 30 }}>
                                              {exercise.data.map((data, i) => (
                                                <VStack
                                                  key={i}
                                                  alignItems={"center"}
                                                  marginLeft={10}
                                                  space={5}
                                                >
                                                  <Text
                                                    style={styles.whiteText}
                                                  >
                                                    {data.reps}
                                                  </Text>
                                                  <Text
                                                    style={[
                                                      styles.whiteText,
                                                      { marginBottom: 20 },
                                                    ]}
                                                  >
                                                    {data.weight}
                                                  </Text>
                                                </VStack>
                                              ))}
                                            </HStack>
                                          </HStack>
                                        </View>
                                      ))}
                                    </View>
                                  </VStack>
                                ))}
                              </HStack>
                            </ScrollView>
                          </View>
                        </View>
                      );
                    }
                  })}
                </VStack>
              ) : null}
            </View>
          </View>
        ))}
      </VStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    backgroundColor: "#020817",
  },
  container: {},
  title: {
    color: Colors.white,
    padding: 10,
  },
  whiteText: {
    color: Colors.white,
  },
  weekContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  week: {},
  weekName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  workout: {
    gap: 10,
  },
  exerciseTitle: {
    color: Colors.textGray,
  },
  day: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    padding: 10,
  },
  dayName: {
    fontWeight: "bold",
    color: Colors.white,
    marginBottom: 5,
  },
});
