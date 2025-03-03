import useDeleteNutrition from "@/api/queries/useDeleteNutrition";
import { Colors } from "@/constants/Colors";
import { Nutrition } from "@/types";
import { HStack, Text, Tooltip, VStack } from "native-base";
import { Dialog, Icon } from "react-native-elements";

import { StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type NutritionListItemProps = {
  item: Nutrition;
};

export default function NutritionListItem({ item }: NutritionListItemProps) {
  const { mutateAsync, error: deleteError, isLoading } = useDeleteNutrition();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { t } = useTranslation();
  const handleDeleteItem = async (nutritionId: string) => {
    try {
      await mutateAsync(nutritionId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HStack style={styles.singleNutritionContainer}>
      <Text
        onPress={() => setModalIsOpen(true)}
        style={[styles.whiteText, { flexGrow: 1 }]}
      >
        {item.item.name}
      </Text>
      <Text style={[styles.whiteText, { marginRight: 10 }]}>
        {item.amount}g
      </Text>
      <TouchableOpacity onPress={() => handleDeleteItem(item._id!)}>
        <Icon name="close" color={Colors.danger} />
      </TouchableOpacity>
      <Dialog
        isVisible={modalIsOpen}
        onBackdropPress={() => setModalIsOpen(false)}
      >
        <VStack space={5}>
            <VStack>
            <Text style={{textTransform:'uppercase', fontWeight: 'bold', textAlign: 'center'}}>{item.item.name}</Text>
            <Text style={{textTransform:'uppercase', fontWeight: 'bold', textAlign: 'center'}}>{item.amount} g</Text>
            </VStack>
          <VStack>
            <Text style={styles.macro}>{t("GENERAL.calories")}</Text>
            <Text style={styles.amount}>{Math.round((item.item.calories * item.amount) / 100)} kcal</Text>
          </VStack>
          <VStack>
            <Text style={styles.macro}>{t("GENERAL.protein")}</Text>
            <Text style={styles.amount}>{Math.round((item.item.protein * item.amount) / 100)} g</Text>
          </VStack>
          <VStack>
            <Text style={styles.macro}>{t("GENERAL.fat")}</Text>
            <Text style={styles.amount}>{Math.round((item.item.fat * item.amount) / 100)} g</Text>
          </VStack>
          <VStack>
            <Text style={styles.macro}>{t("GENERAL.carbs")}</Text>
            <Text style={styles.amount}>{Math.round((item.item.carbs * item.amount) / 100)} g</Text>
          </VStack>
            <VStack>
                <Text style={styles.macro}>{t("GENERAL.price")}</Text>
                <Text style={styles.amount}>{Math.round((item.item.price * item.amount / 100))} €</Text>
            </VStack>
        </VStack>
      </Dialog>
    </HStack>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: Colors.white,
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
  macro: {
    textTransform: "capitalize",
    fontWeight: 'bold',
    textAlign:'center'
  },
  amount: {
    textAlign: 'center'
  }
});
