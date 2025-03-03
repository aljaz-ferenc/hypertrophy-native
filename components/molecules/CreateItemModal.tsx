import {
  Checkbox,
  Divider,
  FlatList,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ScrollView,
  Text,
  View,
  VStack,
} from "native-base";
import { useState } from "react";
import { StyleSheet } from "react-native";
import Button from "@/components/atoms/Button";
import FormErrorMessage from "@/components/atoms/FormErrorMessage";
import { Colors } from "@/constants/Colors";
import useUserStore from "@/store/user.store";
import { FoodItem, Portion } from "@/types";
import useCreateFoodItem from "@/api/queries/useCreateFoodItem";
import * as Crypto from "expo-crypto";
import { useTranslation } from "react-i18next";

type CreateItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  portions: Portion[]
  setPortions: React.Dispatch<React.SetStateAction<Portion[]>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
};

type Errors = Partial<{
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
  price: string
}>;

export default function CreateItemModal({
  isOpen,
  onClose,
  portions,
  setPortions,
  setIsOpen,
}: CreateItemModalProps) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [fat, setFat] = useState("");
  const [carbs, setCarbs] = useState("");
  const [price, setPrice] = useState('')
  const [pricePer, setPricePer] = useState('')
  const [errors, setErrors] = useState<Partial<Errors>>({});
  const userId = useUserStore((state) => state.user?._id);
  const { mutateAsync, error, isLoading } = useCreateFoodItem();
  const [saveitem, setSaveItem] = useState(false);
  const { t } = useTranslation();

  const createItem = async () => {
    if (!userId) return;

    const errors: Errors = {};

    if (!name) {
      errors.name = t("ERROR.required");
    }
    if (!calories) {
      errors.calories = t("ERROR.required");
    }
    if (!protein) {
      errors.protein = t("ERROR.required");
    }
    if (!carbs) {
      errors.carbs = t("ERROR.required");
    }
    if (!fat) {
      errors.fat = t("ERROR.required");
    }
    if (!price) {
      errors.fat = t("ERROR.required");
    }
    if (!pricePer) {
      errors.fat = t("ERROR.required");
    }
    if (!!Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const newItem: FoodItem = {
      name,
      calories: +calories,
      protein: +protein,
      fat: +fat,
      carbs: +carbs,
      user: userId,
      price: (+price / +pricePer)* 100,
      portions,
    };

    try {
      const res = await mutateAsync(newItem);
      setIsOpen(false)
      setName('')
      setCalories('')
      setFat('')
      setCarbs('')
      setPortions([])
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
        return;
      }
      console.log(err);
    }
  };

  const updatePortionTitle = (portion: Portion, val: string) => {
    setPortions((prev) => {
      return prev.map((p) => {
        if (p.id === portion.id) {
          return { ...p, title: val };
        }
        return p;
      });
    });
  };

  const updatePortionAmount = (portion: Portion, val: string) => {
    setPortions((prev) => {
      return prev.map((p) => {
        if (p.id === portion.id) {
          return { ...p, amount: val };
        }
        return p;
      });
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"}>
      <Modal.Content >
        {/* <ScrollView> */}
        <Modal.CloseButton />
        <Modal.Header>{t("NUTRITION.createNewItem")}</Modal.Header>
        <Modal.Body
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <View style={styles.inputsContainer}>
            <VStack space={5}>
              <View>
                <Input
                  type={"text"}
                  keyboardType={"default"}
                  placeholder={t("NUTRITION.name")}
                  onChangeText={setName}
                />
                <FormErrorMessage message={errors.name} />
              </View>
              <View>
                <View style={styles.inputGroup}>
                  <Text>{t("NUTRITION.calories")}</Text>
                  <InputGroup>
                    <Input
                      style={styles.input}
                      type={"text"}
                      keyboardType={"numeric"}
                      onChangeText={setCalories}
                    />
                    <InputRightAddon>kcal</InputRightAddon>
                  </InputGroup>
                </View>
                <FormErrorMessage message={errors.calories} />
              </View>
              <View>
                <View style={styles.inputGroup}>
                  <Text>{t("NUTRITION.protein")}</Text>
                  <InputGroup>
                    <Input
                      style={styles.input}
                      type={"text"}
                      keyboardType={"numeric"}
                      onChangeText={setProtein}
                    />
                    <InputRightAddon>g</InputRightAddon>
                  </InputGroup>
                </View>
                <FormErrorMessage message={errors.protein} />
              </View>
              <View>
                <View style={styles.inputGroup}>
                  <Text>{t("NUTRITION.fat")}</Text>
                  <InputGroup>
                    <Input
                      style={styles.input}
                      type={"text"}
                      keyboardType={"numeric"}
                      onChangeText={setFat}
                    />
                    <InputRightAddon>g</InputRightAddon>
                  </InputGroup>
                </View>
                <FormErrorMessage message={errors.fat} />
              </View>
              <View>
                <View style={styles.inputGroup}>
                  <Text>{t("NUTRITION.carbs")}</Text>
                  <InputGroup>
                    <Input
                      style={styles.input}
                      type={"text"}
                      keyboardType={"numeric"}
                      onChangeText={setCarbs}
                    />
                    <InputRightAddon>g</InputRightAddon>
                  </InputGroup>
                </View>
                <FormErrorMessage message={errors.carbs} />
              </View>
              <View>
                <View style={styles.inputGroup}>
                  <Text>{t("NUTRITION.price")}</Text>
                  <InputGroup>
                    <Input
                        style={styles.input}
                        type={"text"}
                        keyboardType={"numeric"}
                        onChangeText={setPrice}
                    />
                    <InputRightAddon>g</InputRightAddon>
                  </InputGroup>
                </View>
                <FormErrorMessage message={errors.carbs} />
              </View>
              <View>
                <View style={styles.inputGroup}>
                  <Text>{t("NUTRITION.pricePer")}</Text>
                  <InputGroup>
                    <Input
                        style={styles.input}
                        type={"text"}
                        keyboardType={"numeric"}
                        onChangeText={setPricePer}
                    />
                    <InputRightAddon>g</InputRightAddon>
                  </InputGroup>
                </View>
                <FormErrorMessage message={errors.carbs} />
              </View>
            </VStack>
            <View></View>
          </View>
          <Divider style={{ marginTop: 30 }}></Divider>
          <View style={{ marginTop: 30, marginBottom: 20 }}>
            <View
              style={{ flexDirection: "row", alignItems: "baseline", gap: 5 }}
            >
              <Text
                style={{
                  marginBottom: 3,
                  fontWeight: "bold",
                  fontSize: 16,
                  color: Colors.black,
                }}
              >
                {t("NUTRITION.portions")}
              </Text>
              <Text style={{ color: Colors.textGray }}>
                {t("NUTRITION.optional")}
              </Text>
            </View>
            <Text style={{ marginTop: 3, color: Colors.textGray }}>
              {t("NUTRITION.createPortions")}
            </Text>
            <View>
              {portions.map((portion, i) =>
                <View
                    key={i}
                style={{
                  gap: 10,
                  marginTop: 20,
                  shadowColor: Colors.textGray,
                  padding: 20,
                  shadowRadius: 10,
                  borderRadius: 10,
                  shadowOpacity: 0.5,
                  elevation: 5,
                  minWidth: 250,
                }}
              >
                <View>
                  <Text>{t("NUTRITION.portion")}</Text>
                  <Input
                    onChangeText={(val) => updatePortionTitle(portion, val)}
                    placeholder={t("NUTRITION.portionPlaceholder")}
                  />
                </View>
                <View>
                  <Text>{t("NUTRITION.amount")}</Text>
                  {/* <InputGroup> */}
                    <Input
                    keyboardType="numeric"
                      onChangeText={(val) => updatePortionAmount(portion, val)}
                    />
                    {/* <InputRightAddon>g</InputRightAddon> */}
                    {/*
                  </InputGroup> */}
                </View>
              </View>
              )}
            </View>
            {/* {!!portions.length && <FlatList
              data={portions}
              renderItem={({ item }) => (
                <View
                  style={{
                    gap: 10,
                    marginTop: 20,
                    shadowColor: Colors.textGray,
                    padding: 15,
                    shadowRadius: 10,
                    borderRadius: 10,
                    shadowOpacity: 0.5,
                  }}
                >
                  <View>
                    <Text>{t("NUTRITION.portion")}</Text>
                    <Input
                      onChangeText={(val) => updatePortionTitle(item, val)}
                      placeholder={t("NUTRITION.portionPlaceholder")}
                    />
                  </View>
                  <View>
                    <Text>{t("NUTRITION.amount")}</Text>
                    <InputGroup>
                      <Input
                        onChangeText={(val) => updatePortionAmount(item, val)}
                      />
                      <InputRightAddon>g</InputRightAddon>
                    </InputGroup>
                  </View>
                </View>
              )}
            />} */}
            <Button
              style={{ marginTop: 20 }}
              onPress={() =>
                setPortions((prev: any[]) => [
                  ...prev,
                  {
                    title: "",
                    amount: "",
                    id: Crypto.randomUUID(),
                  },
                ])
              }
              modifier={"secondary"}
            >
              {t("NUTRITION.addPortion")}
            </Button>
          </View>
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Button modifier={"destructive"} onPress={onClose}>
            {t("NUTRITION.cancel")}
          </Button>
          <Button modifier={"secondary"} onPress={createItem}>
            {t("NUTRITION.save")}
          </Button>
        </Modal.Footer>
        {/* </ScrollView> */}
      </Modal.Content>
    </Modal>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    maxWidth: 250,
  },
  footer: {
    gap: 10,
  },
  input: {
    maxWidth: 70,
  },
});
