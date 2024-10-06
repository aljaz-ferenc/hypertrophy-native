import useGetNutrition from "@/api/queries/useGetNutrition";
import Heading from "@/components/atoms/Heading";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import { Colors } from "@/constants/Colors";
import { CloseIcon, FlatList, HStack, Text, View } from "native-base";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import useUserStore from "@/store/user.store";
import LoadingScreen from "@/components/modules/LoadingScreen";
import { format } from "date-fns";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import useDeleteNutrition from "@/api/queries/useDeleteNutrition";
import { useQueryClient } from "react-query";

export default function Nutrition() {
  const { t } = useTranslation();
  const userId = useUserStore((state) => state.user?._id);
  const { data, error: getError, isFetching } = useGetNutrition(userId!);
  const {
    mutateAsync,
    error: deleteError,
    isLoading,
  } = useDeleteNutrition();

  if (isFetching) {
    return <LoadingScreen />;
  }

  const handleDeleteItem = async (nutritionId: string) => {
    try {
      await mutateAsync(nutritionId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScreenContainer>
      <Heading modifier="h3">{t("NUTRITION.today")}</Heading>
      {/* <View style={styles.todaysNutritionContainer}>
                <View>
                    <Text style={styles.whiteText}>Calories</Text>
                </View>
                <View>
                    <Text  style={styles.whiteText}>Protein</Text>
                </View>
                <View>
                    <Text  style={styles.whiteText}>Fat</Text>
                </View>
                <View>
                    <Text style={styles.whiteText}>Carbs</Text>
                </View>
            </View> */}
      <FlatList
        data={data?.nutrition}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <HStack style={styles.singleNutritionContainer}>
            <Text style={[styles.whiteText, { flexGrow: 1 }]}>{item.item}</Text>
            <Text style={[styles.whiteText, { marginRight: 10 }]}>
              {item.amount}g
            </Text>
            {/* <Text style={styles.whiteText}>{format(item.date, 'p')}</Text> */}
            <TouchableOpacity onPress={() => handleDeleteItem(item._id)}>
              <Icon name="close" color={Colors.danger} />
            </TouchableOpacity>
          </HStack>
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: Colors.white,
  },
  todaysNutritionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  singleNutritionContainer: {
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
    marginBottom: 3,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
