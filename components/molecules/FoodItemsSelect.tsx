import useGetFoodItems from "@/api/queries/useGetFoodItems";
import { Actionsheet, FlatList, Spinner } from "native-base";
import { useState } from "react";
import useUserStore from '@/store/user.store'
import { FoodItem } from "@/types";

type FoodItemsSelectProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    foodItems: Array<FoodItem & {_id: string}> | undefined,
    isFetching: boolean,
    setSelectedItem: React.Dispatch<React.SetStateAction<FoodItem & {_id: string} | undefined>>
}

export default function FoodItemSelect({setSelectedItem, isOpen, setIsOpen, foodItems, isFetching}: FoodItemsSelectProps) {
    const userId = useUserStore(state => state.user?._id)

    const handleSelectItem = (item: FoodItem & {_id: string}) => {
        setSelectedItem(item)
        setIsOpen(false)
    }

  return (
    <Actionsheet
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <Actionsheet.Content>
        {!isFetching ? <FlatList
            data={foodItems}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
                <Actionsheet.Item onPress={() => handleSelectItem(item)}>
                    {item.name}
                </Actionsheet.Item>
            )}
        /> : <Spinner/>}
       
      </Actionsheet.Content>
    </Actionsheet>
  );
}
