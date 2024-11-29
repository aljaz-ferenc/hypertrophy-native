import { Colors } from "@/constants/Colors";
import { styleConstants } from "@/constants/styles";
import { Center, View } from "native-base";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts/dist/BarChart";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

type WeightChartProps = {
  weight: { value: number }[];
};

export default function WeightChart({ weight }: WeightChartProps) {
    const {t} = useTranslation()

    // const weightData = useMemo(() => {
    //     // const arr = new Array(7 - weight.length).fill({value: 0})
    //     // return [...weight, ...arr]
    //     const arr = new Array(7 - weight.length).fill({value: 0})
    // }, [weight])

    const days = useMemo(() => {
        return [
            t("NUTRITION.daysAbbr.mon"),
            t("NUTRITION.daysAbbr.tue"),
            t("NUTRITION.daysAbbr.wed"),
            t("NUTRITION.daysAbbr.thu"),
            t("NUTRITION.daysAbbr.fri"),
            t("NUTRITION.daysAbbr.sat"),
            t("NUTRITION.daysAbbr.sun"),
        ]
    }, [t])

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Center>
        <BarChart
        barWidth={20}
        noOfSections={3}
        barBorderRadius={4}
        frontColor={Colors.white}
        yAxisThickness={0}
        xAxisThickness={0}
        maxValue={2500}
        xAxisLabelTexts={days}
        xAxisLabelTextStyle={{color: 'white'}}
        yAxisTextStyle={{color: Colors.white}}
          data={weight}
          width={Dimensions.get('window').width - 50}
        />
      </Center>
    </View>
  );
}


