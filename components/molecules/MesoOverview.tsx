import { Colors } from "@/constants/Colors";
import { Days } from "@/enums/Days";
import { Mesocycle } from "@/types";
import {
  Box,
  Divider,
  FlatList,
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
import { useTranslation } from "react-i18next";
import useActivateMesocycle from "@/api/queries/useActivateMesocycle";
import useUserStore from '@/store/user.store'
import {useShallow} from "zustand/react/shallow";

type MesoOverviewProps = {
  meso: Mesocycle;
};

export default function MesoOverview({ meso }: MesoOverviewProps) {
  const { t } = useTranslation();
  const {mutateAsync: activateMeso} = useActivateMesocycle()
  const [userId] = useUserStore(useShallow(state => [state.user?._id]))

  const onActivateMeso = () => {
    if(!userId) return
    activateMeso({userId, meso})
  }

  return (
    <View>
      <AccordionItem value={meso._id!}>
        <AccordionHeader>
          <AccordionTrigger>
            <HStack style={{ gap: 10 }}>
              <Text style={{ color: "white" }}>{meso.title}</Text>
              {meso.isActive ? (
                <Text style={{ color: Colors.green }}>
                  {t("MY_MESOCYCLES.active")}
                </Text>
              ) : null}
            </HStack>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>
          <ScrollView horizontal style={styles.workoutsContainer}>
            <FlatList
              horizontal
              data={meso.workouts}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  key={item.id}
                  style={[
                    styles.workoutContainer,
                    { marginLeft: index === 0 ? 0 : 15 },
                  ]}
                >
                  <Text style={styles.workoutTitle}>
                    {t(`DAYS.${Days[item.weekDay].toLowerCase()}`)}
                  </Text>
                  <VStack>
                    <VStack style={styles.exercisesContainer}>
                      <FlatList
                        data={item.exercises}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                          <Box style={styles.exerciseContainer}>
                            <Text style={styles.badge}>
                              {t(`MUSCLE_GROUPS.${item.muscleGroup}`)}
                            </Text>
                            <Text style={styles.textWhite}>
                              {item.exercise}
                            </Text>
                          </Box>
                        )}
                      />
                    </VStack>
                  </VStack>
                </View>
              )}
            />
          </ScrollView>
          <HStack style={{ justifyContent: "space-between", marginTop: 20 }}>
            <Button
              style={{ marginBottom: 10 }}
              onPress={() => {}}
              modifier="destructive"
            >
              {t("MY_MESOCYCLES.delete")}
            </Button>
            {!meso.isActive ? (
              <Button
                style={{ marginBottom: 10 }}
                onPress={onActivateMeso}
                modifier="secondary"
              >
                {t("MY_MESOCYCLES.activate")}
              </Button>
            ) : null}
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
    textTransform: "capitalize",
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
    marginBottom: 10,
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
