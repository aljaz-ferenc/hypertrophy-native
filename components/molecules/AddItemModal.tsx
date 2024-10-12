import { FoodItem, Nutrition } from "@/types";
import {
  Modal,
  VStack,
  Text,
  HStack,
  Input,
  Select,
} from "native-base";
import Button from "../atoms/Button";
import { StyleSheet } from "react-native";
import { useState } from "react";
import useCreateNutrition from "@/api/queries/useCreateNutrition";
import useUserStore from '@/store/user.store'
import { useTranslation } from "react-i18next";

type AddItemModalProps = {
  item: FoodItem & { _id: string };
  setSelectedItem: React.Dispatch<
    React.SetStateAction<(FoodItem & { _id: string }) | undefined>
  >;
};

export function AddItemModal({ item, setSelectedItem }: AddItemModalProps) {
  const [amount, setAmount] = useState('')
  const [portion, setPortion] = useState('')
  const userId = useUserStore(state => state.user?._id)
  const {mutateAsync, isLoading, error, data} = useCreateNutrition(userId!)
    const {t} = useTranslation()

  const handleSave = async () => {
    setSelectedItem(undefined);
    console.log(amount, portion)

    const newNutrition: Omit<Nutrition & {item: string}, '_id'> = {
        amount: +amount * +portion,
        user: userId!,
        date: new Date(),
        itemId: item._id,
        item: item.name
    }

    try{
        await mutateAsync(newNutrition)
        console.log(data)
    }catch(err){
        console.log(err)
    }
  };

  const handleCancel = () => {
    setSelectedItem(undefined);
  };

  return (
    <Modal isOpen={!!item} onClose={handleCancel}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{t("NUTRITION.addItem")}</Modal.Header>
        <Modal.Body>
          <VStack marginBottom={5}>
            <Text style={styles.itemName}>{item.name}</Text>
            <HStack space={3} alignItems={'center'}>
              <Input keyboardType="numeric" style={{ maxWidth: 70 }} onChangeText={(val) => setAmount(val)}/>
              <Select placeholder={t("NUTRITION.select")} style={{ maxWidth: 120 }} onValueChange={(val) => setPortion(val)}>
                <Select.Item label="g" value="1"/>
                {item.portions.map((portion) => (
                  <Select.Item key={portion.id} label={portion.title} value={portion.amount} />
                ))}
              </Select>
            </HStack>
          </VStack>
          <HStack justifyContent={"end"} space={3}>
            <Button onPress={handleCancel} modifier="destructive">
              {t("NUTRITION.cancel")}
            </Button>
            <Button onPress={handleSave} modifier="secondary">
            {t("NUTRITION.save")}
            </Button>
          </HStack>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  itemName: {
    fontWeight: "bold",
    marginBottom: 3,
  },
});
