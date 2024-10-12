import useGetNutrition from "@/api/queries/useGetNutrition";
import Heading from "@/components/atoms/Heading";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import {Colors} from "@/constants/Colors";
import { FlatList, HStack, Text, View} from "native-base";
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
import Dropdown from 'react-native-input-select';

export default function Nutrition() {
    const {t} = useTranslation();
    const userId = useUserStore((state) => state.user?._id);
    const {data, error: getError, isFetching} = useGetNutrition(userId!);
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    const [createNewItemIsOpen, setCreateNewItemIsOpen] = useState(false)
    const [country, setCountry] = useState();
    const {
        mutateAsync,
        error: deleteError,
        isLoading,
    } = useDeleteNutrition();

    useEffect(() => {
        console.log(createNewItemIsOpen)
    }, [createNewItemIsOpen])

    if (isFetching) {
        return <LoadingScreen/>;
    }

    const handleDeleteItem = async (nutritionId: string) => {
        try {
            await mutateAsync(nutritionId);
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddExistingPress = () => {
        setMenuIsOpen(false)
    }

    const handleCreateNewPress = () => {
        setMenuIsOpen(false)
        setCreateNewItemIsOpen(true)
    }

    return (
        <View style={{position: 'relative', flex: 1}}>
            <CreateItemModal isOpen={createNewItemIsOpen} onClose={() => setCreateNewItemIsOpen(false)}/>
            <View style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab} onPress={() => setMenuIsOpen(true)}>
                    <Icon name={'add'} color={'white'} size={20}/>
                </TouchableOpacity>
            </View>
            <ScreenContainer>
                <Actionsheet onClose={() => setMenuIsOpen(false)} isOpen={menuIsOpen}>
                    <Actionsheet.Content>
                        <Actionsheet.Item onPress={handleAddExistingPress}>Create new meal</Actionsheet.Item>
                        <Actionsheet.Item onPress={handleCreateNewPress}>Create new item</Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
                <Heading modifier="h3">{t("NUTRITION.today")}</Heading>
                <FlatList
                    data={data?.nutrition}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => (
                        <HStack style={styles.singleNutritionContainer}>
                            <Text style={[styles.whiteText, {flexGrow: 1}]}>{item.item}</Text>
                            <Text style={[styles.whiteText, {marginRight: 10}]}>
                                {item.amount}g
                            </Text>
                            {/* <Text style={styles.whiteText}>{format(item.date, 'p')}</Text> */}
                            <TouchableOpacity onPress={() => handleDeleteItem(item._id)}>
                                <Icon name="close" color={Colors.danger}/>
                            </TouchableOpacity>
                        </HStack>
                    )}
                />
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
                <View style={{marginTop: 30}}>
                    <Text style={{color: Colors.white}}>Add item</Text>
                    <Dropdown
                        label="Country"
                        placeholder="Select an option..."
                        options={[
                            { label: 'Nigeria', value: 'NG' },
                            { label: 'Åland Islands', value: 'AX' },
                            { label: 'Algeria', value: 'DZ' },
                            { label: 'American Samoa', value: 'AS' },
                            { label: 'Andorra', value: 'AD' },
                        ]}
                        selectedValue={country}
                        onValueChange={(value) => console.log(value)}
                        primaryColor={'green'}
                    />
                </View>
            </ScreenContainer>
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
        position: 'absolute',
        bottom: 0
    },
    fabContainer: {
        position: 'absolute',
        zIndex: 100,
        bottom: 20,
        right: 20
    }
    ,
    fab: {
        backgroundColor: Colors.secondary,
        padding: 20,
        borderRadius: 9999,

    }
});
