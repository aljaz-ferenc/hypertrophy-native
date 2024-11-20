import ScreenContainer from "@/components/molecules/ScreenContainer";
import {Box, HStack, ScrollView, Text, View, VStack} from "native-base";
import {CalendarList} from "react-native-calendars";
import Heading from "@/components/atoms/Heading";
import {Colors} from "@/constants/Colors";
import {formatDate, getDay, getMonth, isFirstDayOfMonth, isLastDayOfMonth, subDays} from "date-fns";
import {Dimensions, StyleSheet} from "react-native";
import useGetMesoOverview, {OverviewResponse} from "@/api/queries/useGetMesoOverview";
import {MaterialIcons} from "@expo/vector-icons";

const formatMarkedDays = (dates: OverviewResponse['mesoDates']) => {
    const markedDates: any = {};

    dates.forEach((date, index) => {
        const dateString = formatDate(subDays(date.date, 1), 'yyyy-MM-dd');

        const baseMarking = {
            color: Colors.primary,
            textColor: Colors.white,
        };

        if (index === 0) {
            markedDates[dateString] = {
                ...baseMarking,
                startingDay: true,
            };
        } else if (index === dates.length - 1) {
            markedDates[dateString] = {
                ...baseMarking,
                endingDay: true,
            };
        } else {
            markedDates[dateString] = baseMarking;
        }

            markedDates[dateString].workoutCompleted = date.workoutCompleted


        if (index === 0) {
            markedDates[dateString].startingDay = true
        }
        if (index === dates.length - 1) {
            markedDates[dateString].endingDay = true
        }
    });

    return markedDates;
};


export default function Dashboard() {
    const {data} = useGetMesoOverview()

    if (!data) return

    return (
        <ScreenContainer>
            <Heading modifier={'h2'}>{data.mesocycle}</Heading>
            <Box>
                <CalendarList
                    horizontal
                    calendarWidth={Dimensions.get('screen').width - 20}
                    pagingEnabled
                    firstDay={1}
                    markedDates={formatMarkedDays(data.mesoDates)}
                    dayComponent={({date, state, marking}) => {
                        if (!date) return

                        const todayStyles = state === 'today' ? {backgroundColor: Colors.secondary, borderWidth: 1, borderColor: 'skyblue'} : {}
                        const containerStyle = {backgroundColor: marking ? Colors.primary : Colors.white }
                        const isMarked = !!marking?.customStyles?.checkmark
                        const startingDayStyle = {borderBottomLeftRadius: 100, borderTopLeftRadius: 100}
                        const endingDayStyle = {borderBottomRightRadius: 100, borderTopRightRadius: 100}
                        const dateObj = new Date(date?.dateString)
                        const workoutCompleted = marking?.workoutCompleted

                        return (
                            <View
                                style={[
                                    {alignItems: 'center', justifyContent: 'center', width: '100%', height: 50},
                                    containerStyle, (marking?.startingDay || getDay(dateObj) === 1 || isFirstDayOfMonth(dateObj)) && startingDayStyle, (marking?.endingDay || getDay(dateObj) === 0 || isLastDayOfMonth(dateObj)) && endingDayStyle, todayStyles
                                ]}
                            >
                                <VStack justifyContent={'center'} alignItems={'center'}>
                                    <Text
                                        style={[{
                                            fontWeight: 'bold',
                                            color: marking ? Colors.white : Colors.primary
                                        }]}>{date?.day}</Text>
                                    {workoutCompleted === 'completed' && <MaterialIcons
                                        name={"check" }
                                        size={16}
                                        color={Colors.green}
                                    />}
                                    {workoutCompleted === 'missed' && <MaterialIcons
                                        name={"close" }
                                        size={16}
                                        color={Colors.danger}
                                    />}
                                    {workoutCompleted === 'rest' && <Text style={{color: 'white', opacity: 1}}>R</Text>}
                                    {workoutCompleted === 'upcoming' && <Text style={{color: 'white', opacity: 0}}>R</Text>}
                                </VStack>
                            </View>
                        );
                    }}
                />
                <HStack marginTop={2} space={1} justifyContent={'space-between'} >
                    <HStack alignItems={'center'}>
                        <MaterialIcons
                            name={"check" }
                            size={16}
                            color={Colors.green}
                        />
                        <Text style={[styles.textWhite]}> - Completed</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <MaterialIcons
                            name={"close" }
                            size={16}
                            color={Colors.danger}
                        />
                        <Text style={[styles.textWhite]}> - Missed</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Text style={{color: 'white', opacity: 1}}>R</Text>
                        <Text style={[styles.textWhite]}> - Rest day</Text>
                    </HStack>
                </HStack>
            </Box>
            <Box>
                <Heading style={{marginTop: 10}} modifier={'h3'}>
                    Nutrition and weight
                </Heading>
                <Text style={[styles.textWhite]}>Average calories consumed: 2000 kcal</Text>
                <Text style={[styles.textWhite]}>Total weight change: +2kg (0.5kg/week)</Text>
            </Box>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    textWhite: {
        color: Colors.white,
    },
});