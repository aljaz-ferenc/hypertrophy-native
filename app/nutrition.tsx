import {Spinner, View, VStack} from "native-base";
import Heading from "@/components/atoms/Heading";
import {StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import AppText from "@/components/atoms/Text";
import useGetNutrition from "@/api/queries/useGetNutrition";
import useUserStore from '@/store/user.store'
import {useMemo, useState} from "react";
import {FoodItem, Nutrition} from "@/types";
import {foodItems} from "@/data";
import {isToday} from "date-fns";

export default function NutritionScreen() {
    // const nutrition = useNutritionStore(state => state)
    const userId = useUserStore(state => state.user?._id)
    const {data, isFetching, error} = useGetNutrition(userId!)
    console.log(data)

    // const getTotalWeeklyNutriton = useMemo(() => {
    //     if(!data?.nutrition) return {calories: 0, protein: 0, fat: 0, carbs: 0}
    //     return data!.nutrition.reduce((acc, nutrition) => {
    //         const foodItem: FoodItem = foodItems.find(item => item.id === nutrition.itemId)
    //         console.log(nutrition.itemId)
    //         console.log(foodItem.id)
    //         // console.log(foodItem)
    //         return ({
    //             calories: acc.calories + foodItem.calories * (nutrition.amount / 100),
    //             protein: acc.protein + foodItem.protein * (nutrition.amount / 100),
    //             fat: acc.fat + foodItem.fat * (nutrition.amount / 100),
    //             carbs: acc.carbs + foodItem.carbs * (nutrition.amount / 100)
    //         })
    //     }, {calories: 0, protein: 0, fat: 0, carbs: 0})
    // }, [data?.nutrition])

    const dailyTotalNutrition = useMemo(() => {
        if(!data?.nutrition) return
        console.log(data.nutrition)
        return data?.nutrition.filter(n => isToday(n.date)).reduce((acc, nutrition) => {
            const foodItem = foodItems.find(item => item.id === nutrition.itemId)
            console.log(foodItem.id)
            console.log(nutrition.itemId)

            const calories = (nutrition.amount / 100) * foodItem.calories
            const protein = (nutrition.amount / 100) * foodItem.protein
            const fat = (nutrition.amount / 100) * foodItem.fat
            const carbs = (nutrition.amount / 100) * foodItem.carbs

            return {
                calories: Math.round(acc.calories + calories),
                carbs: Math.round(acc.carbs + carbs),
                fat: Math.round(acc.fat + fat),
                protein: Math.round(acc.protein + protein),
            }

        },  { calories: 0, carbs: 0, fat: 0, protein: 0 })
    }, [data?.nutrition])

    if (isFetching) {
        return <Spinner/>
    }

    return (
        <View style={styles.screenContainer}>
            <Heading modifier={'h2'}>Today</Heading>
            <VStack>
                <AppText>Total calories: {dailyTotalNutrition.calories}</AppText>
                <AppText>Total protein: {dailyTotalNutrition.protein}</AppText>
                <AppText>Total fat: {dailyTotalNutrition.fat}</AppText>
                <AppText>Total carbs: {dailyTotalNutrition.carbs}</AppText>
            </VStack>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 10,
        backgroundColor: "#020817",
        flex: 1
    },
    errorMessage: {
        color: Colors.danger
    }
});