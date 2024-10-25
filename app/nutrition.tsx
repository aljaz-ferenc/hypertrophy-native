import useGetNutrition from "@/api/queries/useGetNutrition";
import Heading from "@/components/atoms/Heading";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import {Colors} from "@/constants/Colors";
import {FlatList, HStack, Text, View, VStack} from "native-base";
import {useTranslation} from "react-i18next";
import {StyleSheet} from "react-native";
import useUserStore from "@/store/user.store";
import LoadingScreen from "@/components/modules/LoadingScreen";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Icon} from "react-native-elements";
import useDeleteNutrition from "@/api/queries/useDeleteNutrition";
import {Actionsheet} from "native-base";
import {useEffect, useState} from "react";
import CreateItemModal from "@/components/molecules/CreateItemModal";
import FoodItemSelect from "@/components/molecules/FoodItemsSelect";
import useGetFoodItems from "@/api/queries/useGetFoodItems";
import {FoodItem, Portion} from "@/types";
import {AddItemModal} from "@/components/molecules/AddItemModal";
import WeightChart from "@/components/molecules/WeeklyNutritionChart";
import TotalMacros from "@/components/molecules/TotalMacros";
import {useShallow} from "zustand/react/shallow";

export default function Nutrition() {
    const {t} = useTranslation();
    const [userId, bmr] = useUserStore(
        useShallow((state) => [state.user?._id, state.user?.stats?.bmr])
    );
    const {data, error: getError, isFetching} = useGetNutrition(userId!);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [createNewItemIsOpen, setCreateNewItemIsOpen] = useState(false);
    const [portions, setPortions] = useState<Portion[]>([]);
    const {
        data: foodItems,
        error,
        isFetching: isFetchingFoodItems,
        refetch,
    } = useGetFoodItems(userId!);
    const [foodItemsIsOpen, setFoodItemsIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FoodItem | undefined>();
    const {mutateAsync, error: deleteError, isLoading} = useDeleteNutrition();
    console.log(data);
    if (!data?.nutrition || (isFetching && !foodItems?.length)) {
        return <LoadingScreen/>;
    }

    console.log('WEIGHT_DATA: ', data.weightData)

    const handleDeleteItem = async (nutritionId: string) => {
        try {
            await mutateAsync(nutritionId);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddExistingPress = () => {
        setMenuIsOpen(false);
    };

    const handleCreateNewPress = () => {
        setMenuIsOpen(false);
        setCreateNewItemIsOpen(true);
    };

    const handlePress = async () => {
        setMenuIsOpen(false);
        setFoodItemsIsOpen(true);
        await refetch();
    };

    const handleClose = () => {
        setCreateNewItemIsOpen(false);
        setPortions([]);
    };

    return (
        <View style={{position: "relative", flex: 1}}>
            <CreateItemModal
                portions={portions}
                setPortions={setPortions}
                isOpen={createNewItemIsOpen}
                onClose={handleClose}
                setIsOpen={setCreateNewItemIsOpen}
            />
            <View style={styles.fabContainer}>
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => setMenuIsOpen(true)}
                >
                    <Icon name={"add"} color={"white"} size={20}/>
                </TouchableOpacity>
            </View>
            <ScreenContainer>
                <Actionsheet onClose={() => setMenuIsOpen(false)} isOpen={menuIsOpen}>
                    <Actionsheet.Content>
                        <Actionsheet.Item onPress={handleAddExistingPress}>
                            {t("NUTRITION.createNewMeal")}
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={handleCreateNewPress}>
                            {t("NUTRITION.createNewItem")}
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
                <View style={{flexDirection: 'column', gap: 50}}>
                    <View>
                        <Heading modifier="h3">{t("NUTRITION.today")}</Heading>
                        <TotalMacros macros={data.totalToday}/>
                        {bmr && bmr - data.totalToday.calories >= 0 && (
                            <Text style={{color: Colors.green, marginTop: 5}}>
                                {t("NUTRITION.caloriesLeft", {calories: bmr - data.totalToday.calories})}
                            </Text>
                        )}
                        {bmr && bmr - data.totalToday.calories < 0 && (
                            <Text style={{color: Colors.danger, marginTop: 5}}>
                                {t("NUTRITION.overCalories", {calories: bmr - data.totalToday.calories})}
                            </Text>
                        )}
                        <TouchableOpacity style={styles.addItemBtn} onPress={handlePress}>
                            <Icon name="add" color={Colors.white}/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Heading modifier="h3">
                            {t("NUTRITION.thisWeek")}
                        </Heading>
                        <TotalMacros style={{marginBottom: 20}} macros={data.totalWeek}/>
                        <FoodItemSelect
                            setSelectedItem={setSelectedItem}
                            setIsOpen={setFoodItemsIsOpen}
                            isOpen={foodItemsIsOpen}
                            foodItems={foodItems}
                            isFetching={isFetchingFoodItems}
                        />
                        <WeightChart weight={data.weightData.map(n => ({value: n.caloriesTotal}))}/>
                    </View>

                        {data.nutrition.length > 0 && (
                            <FlatList
                                data={data?.nutrition}
                                keyExtractor={(item) => Math.random().toString()}
                                renderItem={({item}) => (
                                    <HStack style={styles.singleNutritionContainer}>
                                        <Text style={[styles.whiteText, {flexGrow: 1}]}>
                                            {item.item.name}
                                        </Text>
                                        <Text style={[styles.whiteText, {marginRight: 10}]}>
                                            {item.amount}g
                                        </Text>
                                        <TouchableOpacity onPress={() => handleDeleteItem(item._id!)}>
                                            <Icon name="close" color={Colors.danger}/>
                                        </TouchableOpacity>
                                    </HStack>
                                )}
                            />
                        )}

                </View>
            </ScreenContainer>
            {selectedItem ? (
                <AddItemModal setSelectedItem={setSelectedItem} item={selectedItem}/>
            ) : null}
        </View>
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
    menu: {
        position: "absolute",
        bottom: 0,
    },
    fabContainer: {
        position: "absolute",
        zIndex: 100,
        bottom: 20,
        right: 20,
    },
    fab: {
        backgroundColor: Colors.secondary,
        padding: 20,
        borderRadius: 9999,
    },
    addItemBtn: {
        backgroundColor: Colors.secondary,
        borderRadius: 5,
        textAlign: "center",
        padding: 10,
    },
});
