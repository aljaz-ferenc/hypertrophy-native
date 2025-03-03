import {Text} from "native-base";
import {Nutrition} from "@/types";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

type ItemsPriceTotalProps = {
    items: Nutrition[]
}

export default function ItemsPriceTotal({items}: ItemsPriceTotalProps) {
    const {t} = useTranslation()

    const total = useMemo(() => {
        return items.reduce((acc, item) => {
            return item.item.price ? acc + item.item.price * item.amount / 100 : acc

        }, 0)
    }, [items]);

    return (
        <Text style={{color: 'white', textTransform:'capitalize'}}>{t('GENERAL.price')}: {total.toFixed(2)} €</Text>
    )
}
