import { Colors } from "@/constants/Colors";
import { Macros } from "@/types";
import { HStack, VStack, Text } from "native-base";
import { useTranslation } from "react-i18next";
import { StyleProps } from "react-native-reanimated";

type TotalMacrosProps = {
    macros: Macros,
    style?: StyleProps
}

export default function TotalMacros({macros, style}: TotalMacrosProps){
    const {t} = useTranslation()
    
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
        </VStack>
        <VStack alignItems={"center"}>
          <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
            {t("GENERAL.fat")}
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {macros.fat} g
          </Text>
        </VStack>
        <VStack alignItems={"center"}>
          <Text style={{ color: Colors.white, textTransform: "capitalize" }}>
            {t("GENERAL.carbs")}
          </Text>
          <Text style={{ color: Colors.white, fontWeight: "bold" }}>
            {macros.carbs} g
          </Text>
        </VStack>
      </HStack>
    )
}