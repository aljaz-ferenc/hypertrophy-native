import { Colors } from "@/constants/Colors";
import { styleConstants } from "@/constants/styles";
import { Center, View } from "native-base";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts/dist/BarChart";

type WeightChartProps = {
  weight: { value: number }[];
};

export default function WeightChart({ weight }: WeightChartProps) {
  console.log("WEIGHT: ", weight);
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Center>
        <BarChart
        barWidth={22}
        noOfSections={3}
        barBorderRadius={4}
        frontColor={Colors.white}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{color: Colors.white}}
          data={weight}
        />
      </Center>
    </View>
  );
}


