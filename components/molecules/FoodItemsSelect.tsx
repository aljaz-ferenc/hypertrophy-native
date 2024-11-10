import useGetFoodItems from "@/api/queries/useGetFoodItems";
import { Actionsheet, FlatList, Input, Spinner } from "native-base";
import { useMemo, useState } from "react";
import useUserStore from '@/store/user.store'
import { FoodItem } from "@/types";

type FoodItemsSelectProps = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    foodItems: Array<FoodItem> | undefined,
    isFetching: boolean,
    setSelectedItem: React.Dispatch<React.SetStateAction<FoodItem | undefined>>
}

export default function FoodItemSelect({setSelectedItem, isOpen, setIsOpen, foodItems, isFetching}: FoodItemsSelectProps) {
    const userId = useUserStore(state => state.user?._id)
    const [search, setSearch] = useState('')

    const handleSelectItem = (item: FoodItem) => {
        setSelectedItem(item)
        setIsOpen(false)
    }

    const filteredItems = useMemo(() => {
      return foodItems?.filter(i => i.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }, [foodItems, search])

  return (
    <Actionsheet
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
    >
      <Actionsheet.Content alignItems={'stretch'}>
        <Input value={search} onChangeText={val => setSearch(val)}/>
        {!isFetching ? <FlatList
            data={filteredItems}
            keyExtractor={item => item._id!}
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
