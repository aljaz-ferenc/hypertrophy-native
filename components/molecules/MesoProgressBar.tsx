import { getMesocycleProgress } from "@/utils";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { View } from "native-base";
import { styleConstants } from "@/constants/styles";

type MesoProgressBarType = {
  startDate: Date;
  durationInWeeks: number;
};

export default function MesoProgressBar({
  startDate,
  durationInWeeks,
}: MesoProgressBarType) {
  return (
    <View style={styles.container}>
    <Progress
      style={styles.bar}
      value={getMesocycleProgress(startDate, durationInWeeks)}
      size="md"
      orientation="horizontal"
      >
      <ProgressFilledTrack style={styles.track} />
    </Progress>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
  bar: { width: Dimensions.get('screen').width - styleConstants.screenPadding * 2, height: 10, backgroundColor: Colors.secondary, borderRadius: 30, overflow: 'hidden' },
  track: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
});
