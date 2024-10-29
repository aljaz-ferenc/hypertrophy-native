import {Box, Center, CheckIcon, Select, VStack} from "native-base";
import {useMemo, useState} from "react";
import {useTranslation} from "react-i18next";


type WorkoutProps = {}


export default function Workout({}: WorkoutProps) {
    const [day, setDay] = useState<number | null>(null);
    const [open, setOpen] = useState(false);
    const [service, setService] = useState("");
    const {t} = useTranslation()

    const days = useMemo(() => {
        return [
            {label: t("DAYS.monday"), value: 1},
            {label: t("DAYS.tuesday"), value: 2},
            {label: t("DAYS.wednesday"), value: 3},
            {label: t("DAYS.thursday"), value: 4},
            {label: t("DAYS.friday"), value: 5},
            {label: t("DAYS.saturday"), value: 6},
            {label: t("DAYS.sunday"), value: 7},
        ]
    }, [])

    return (
        <Box maxW="300" style={{marginRight: 15}}>
            <Select color={'white'} textTransform={'capitalize'} selectedValue={service} minWidth="200"
                    accessibilityLabel="Choose Service" placeholder="Select day..." _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5"/>
            }} mt={1} onValueChange={itemValue => setService(itemValue)}>
                {days.map(day => (
                    <Select.Item label={day.label} value={day.value.toString()}/>
                ))}
            </Select>
        </Box>

    );
}

