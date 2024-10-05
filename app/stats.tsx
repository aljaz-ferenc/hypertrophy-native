import {
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  ScrollView,
  Text,
  View,
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import useUserStore from "@/store/user.store";
import { LineChart } from "react-native-chart-kit";
import { format } from "date-fns";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import useUpdateUser from "@/api/queries/useUpdateUser";
import { useQueryClient } from "react-query";
import Heading from "@/components/atoms/Heading";
import useGetWeight from "@/api/queries/useGetWeight";
import { Range } from "@/types";

export default function Stats() {
  const user = useUserStore((state) => state.user);
  const [range, setRange] = useState<Range>("week");
  const [weightInput, setWeightInput] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { mutateAsync } = useUpdateUser();
  const queryClient = useQueryClient();
  const { data, error, isFetching } = useGetWeight(user!._id, range);

  useEffect(() => {
    queryClient.invalidateQueries(["weight", { userId: user?._id }]);
  }, [range]);

  const handleAddWeight = async () => {
    if (!weightInput) {
      setErrors((prev: any) => ({ ...prev, input: "Please add a value." }));
    }
    if (weightInput.match(/^[0-9]+$/) != null) {
      await mutateAsync({
        userId: user?._id as string,
        update: {
          action: "update-weight",
          weight: parseInt(weightInput),
        },
      });
      setWeightInput("");
      await queryClient.invalidateQueries(["user", { userId: user?._id }]);
    } else {
      setErrors((prev: any) => ({
        ...prev,
        input: "Input invalid. Please enter a number",
      }));
    }
  };

  return (
    <ScrollView style={styles.screenContainer}>
      <Heading modifier={"h2"}>Weight</Heading>
      <HStack space={5} marginBottom={5}>
        <Button
          modifier={range === "week" ? "secondary" : "primary"}
          onPress={() => setRange("week")}
        >
          This Week
        </Button>
        <Button
          modifier={range === "month" ? "secondary" : "primary"}
          onPress={() => setRange("month")}
        >
          Month
        </Button>
        <Button
          modifier={range === "year" ? "secondary" : "primary"}
          onPress={() => setRange("year")}
        >
          Year
        </Button>
        <Button
          modifier={range === "all" ? "secondary" : "primary"}
          onPress={() => setRange("all")}
        >
          All
        </Button>
      </HStack>
      {data && (
        <View style={{alignItems: 'center'}}>
          <LineChart
            data={{
              labels: data.weight.map((weight, i) => {
                const thisMonth = format(new Date(weight.date), "M");

                if (
                  i > 0 &&
                  thisMonth === format(data.weight[i - 1]?.date!, "M")
                ) {
                  return format(new Date(weight.date), "d");
                }

                return format(new Date(weight.date), "MMM d");
              }),
              datasets: [
                {
                  data: data.weight.map((weight) => weight.value || 0), // Default to 0 if undefined
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={220}
            yAxisInterval={range === 'week' ? 1 : 5}
            chartConfig={
              {
                backgroundColor: Colors.white,
                decimalPlaces: 1,
                color: (opacity = 1) => "#8784D8",
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                propsForDots: {
                  r: "4",
                  strokeWidth: "1",
                  stroke: "white",
                  fill: "white",
                },
              } as AbstractChartConfig
            }
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      )}
      <View>
        <InputGroup alignSelf={"self-start"}>
          <Input
            style={{ color: "white" }}
            keyboardType={"numeric"}
            onChangeText={(weight) => setWeightInput(weight)}
          />
          <InputRightAddon children={"KG"} />
        </InputGroup>
        <Button modifier={"primary"} onPress={handleAddWeight}>
          Add
        </Button>
        {errors.input && (
          <Text style={styles.errorMessage}>{errors.input}</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    backgroundColor: "#020817",
  },
  errorMessage: {
    color: Colors.danger,
  },
});
