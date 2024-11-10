import { Colors } from "@/constants/Colors";
import { Macros } from "@/types";
import { calculateMacrosPercentages } from "@/utils";
import { HStack, VStack, Text } from "native-base";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleProps } from "react-native-reanimated";

type TotalMacrosProps = {
    macros: Macros,
    style?: StyleProps
}

export default function TotalMacros({macros, style}: TotalMacrosProps){
    const {t} = useTranslation()
    const percentages = useMemo(() => {
      return calculateMacrosPercentages(macros)
    }, [macros])    
  

    return(
        <HStack
        justifyContent={"space-between"}
        style={style}
      >
        <VStack alignItems={"center"}>
          <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
            {t("GENERAL.calories")}
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {macros.calories} kcal
          </Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
            {t("GENERAL.protein")}
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {macros.protein} g
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            ({percentages.protein}%)
          </Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
            {t("GENERAL.fat")}
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {macros.fat} g
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            ({percentages.fat}%)
          </Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
            {t("GENERAL.carbs")}
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {macros.carbs} g
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            ({percentages.carbs}%)
          </Text>
        </VStack>
      </HStack>
    )
}