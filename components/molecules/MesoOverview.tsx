import { Colors } from "@/constants/Colors";
import { Days } from "@/enums/Days";
import { Mesocycle } from "@/types";
import {
  Box,
  Divider,
  HStack,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { StyleSheet } from "react-native";

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useMesocyclesStore from "@/store/mesocycles.store";
import Button from "../atoms/Button";

type MesoOverviewProps = {
  meso: Mesocycle;
};

export default function MesoOverview({ meso }: MesoOverviewProps) {
  return (
    <View>
      <AccordionItem value={meso._id}>
        <AccordionHeader>
          <AccordionTrigger>
            <HStack style={{ gap: 10 }}>
              <Text style={{ color: "white" }}>{meso.title}</Text>
              {meso.isActive && (
                <Text style={{ color: Colors.green }}>Active</Text>
              )}
            </HStack>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <ScrollView horizontal style={styles.workoutsContainer}>
            {meso.workouts.map((workout, i) => (
              <View
                style={[
                  styles.workoutContainer,
                  { marginLeft: i === 0 ? 0 : 15 },
                ]}
              >
                <Text style={styles.workoutTitle}>{Days[workout.weekDay]}</Text>
                <VStack>
                  <VStack style={styles.exercisesContainer}>
                    {workout.exercises.map((exercise) => (
                      <Box style={styles.exerciseContainer}>
                        <Text style={styles.badge}>{exercise.muscleGroup}</Text>
                        <Text style={styles.textWhite}>
                          {exercise.exercise}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </VStack>
              </View>
            ))}
          </ScrollView>
          <HStack style={{ justifyContent: "space-between", marginTop: 20 }}>
            <Button
              style={{ marginBottom: 10 }}
              onPress={() => {}}
              modifier="destructive"
            >
              Delete
            </Button>
            {!meso.isActive && (
              <Button
                style={{ marginBottom: 10 }}
                onPress={() => {}}
                modifier="secondary"
              >
                Activate
              </Button>
            )}
          </HStack>
        </AccordionContent>
      </AccordionItem>
      <Divider style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  workoutTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  workoutsContainer: {},
  workoutContainer: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 10,
    gap: 10,
    width: 300,
    borderRadius: 5,
  },
  exercisesContainer: {
    gap: 5,
  },
  exerciseContainer: {
    backgroundColor: Colors.secondary,
    padding: 10,
    gap: 5,
    borderRadius: 7,
  },
  badge: {
    color: Colors.black,
    backgroundColor: Colors.white,
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 100,
    textTransform: "capitalize",
  },
  textWhite: {
    color: Colors.white,
  },
  divider: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.border,
  },
});
