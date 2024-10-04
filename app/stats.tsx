import {Input, InputGroup, InputRightAddon, ScrollView, Text, View} from "native-base";
import {Dimensions, StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import useUserStore from '@/store/user.store'
import {LineChart} from "react-native-chart-kit";
import {format} from "date-fns";
import {AbstractChartConfig} from "react-native-chart-kit/dist/AbstractChart";
import {useEffect, useState} from "react";
import Button from "@/components/atoms/Button";
import useUpdateUser from "@/api/queries/useUpdateUser";
import {useQueryClient} from "react-query";
import Heading from "@/components/atoms/Heading";

export default function Stats() {
    const user = useUserStore(state => state.user)
    const [range, setRange] = useState<'month' | 'week'>('month')
    const [weight, setWeight] = useState('')
    const [errors, setErrors] = useState<object>({})
    const {mutateAsync} = useUpdateUser()
    const queryClient = useQueryClient()

    useEffect(() => {
        console.log(user?.stats?.weight)
    }, [user?.stats?.weight])

    const handleAddWeight = async () => {
        if (!weight) {
            setErrors(prev => ({...prev, input: 'Please add a value.'}))
        }
        if (weight.match(/^[0-9]+$/) != null) {
            await mutateAsync({
                userId: user?._id as string,
                update: {
                    action: 'update-weight',
                    weight: parseInt(weight)
                },
            });
            setWeight('')
            await queryClient.invalidateQueries(['user', {userId: user?._id}])
        } else {
            setErrors(prev => ({...prev, input: 'Input invalid. Please enter a number'}))
        }
    }

    return (
        <ScrollView style={styles.screenContainer}>
            <Heading modifier={'h2'} >Weight</Heading>
            <LineChart
                data={{
                    labels: user?.stats?.weight.map((weight, i) => {
                        // Safeguard to ensure i-1 access doesn't cause an issue when i=0
                        const thisMonth = format(new Date(weight.date), 'M');

                        // Use a safe check to avoid accessing out-of-bounds array elements
                        if (i > 0 && thisMonth === format(user?.stats?.weight[i - 1]?.date!, 'M')) {
                            return format(new Date(weight.date), 'd');
                        }

                        return format(new Date(weight.date), 'MMM d');
                    }),
                    datasets: [
                        {
                            data: user?.stats?.weight.map(weight => weight.value || 0),  // Default to 0 if undefined
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 50} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: Colors.primary,
                    decimalPlaces: 1, // optional, defaults to 2dp
                    color: (opacity = 1) => '#8784D8',
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: "4",
                        strokeWidth: "1",
                        stroke: 'white',
                        fill: 'white'
                    },
                } as AbstractChartConfig}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
            <View>
                <InputGroup alignSelf={'self-start'}>
                    <Input style={{color: 'white'}} keyboardType={'numeric'} onChangeText={weight => setWeight(weight)}/>
                    <InputRightAddon children={'KG'}/>
                </InputGroup>
                    <Button modifier={'primary'} onPress={handleAddWeight}>Add</Button>
                    {errors.input && <Text style={styles.errorMessage}>{errors.input}</Text>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 10,
        backgroundColor: "#020817"
    },
    errorMessage: {
        color: Colors.danger
    }
});