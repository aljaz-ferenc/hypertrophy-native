import ScreenContainer from "@/components/molecules/ScreenContainer";
import {Box, FlatList, HStack, ScrollView, Text, View, VStack} from "native-base";
import {CalendarList, DateData} from "react-native-calendars";
import Heading from "@/components/atoms/Heading";
import {Colors} from "@/constants/Colors";
import {formatDate, getDay, getMonth, isFirstDayOfMonth, isLastDayOfMonth, isSameDay, subDays} from "date-fns";
import {Dimensions, StyleSheet} from "react-native";
import useGetMesoOverview, {OverviewResponse} from "@/api/queries/useGetMesoOverview";
import {MaterialIcons} from "@expo/vector-icons";
import {useCallback, useMemo} from "react";
import {WorkoutStatus} from "@/enums/WorkoutStatus";
import {useTranslation} from "react-i18next";

const formatMarkedDays = (dates: OverviewResponse['mesoDates']) => {
    const markedDates: any = {};

    dates.forEach((date, index) => {
        const dateString = formatDate(date.date, 'yyyy-MM-dd');

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

const today = new Date()
export default function Dashboard() {
    const {data} = useGetMesoOverview()
    const {t} = useTranslation()

    if (!data) return

    const renderDateStatus = (date: string & DateData, workoutStatus: WorkoutStatus) => {
        if (isSameDay(today, date.dateString)) {
            return <Text style={{color: 'white', opacity: 0}}>{' '}</Text>
        }

        switch (workoutStatus) {
            case WorkoutStatus.COMPLETED:
                return <MaterialIcons
                    name={"check"}
                    size={16}
                    color={Colors.green}
                />
            case WorkoutStatus.MISSED:
                return <MaterialIcons
                    name={"close"}
                    size={16}
                    color={Colors.danger}
                />
            case WorkoutStatus.REST:
                return <Text style={{color: 'white', opacity: 1}}>{t('DASHBOARD.restSymbol')}</Text>
            case WorkoutStatus.UPCOMING:
                return <Text style={{color: 'white', opacity: 0}}>{' '}</Text>
        }
    }

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

                        const todayStyles = state === 'today' ? {
                            backgroundColor: Colors.secondary,
                            borderWidth: 1,
                            borderColor: 'skyblue'
                        } : {}
                        const containerStyle = {backgroundColor: marking ? Colors.primary : Colors.white}
                        // const isMarked = !!marking?.customStyles?.checkmark
                        const startingDayStyle = {borderBottomLeftRadius: 100, borderTopLeftRadius: 100}
                        const endingDayStyle = {borderBottomRightRadius: 100, borderTopRightRadius: 100}
                        const dateObj = new Date(date?.dateString)
                        //@ts-ignore
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
                                    {renderDateStatus(date, workoutCompleted)}
                                </VStack>
                            </View>
                        );
                    }}
                />
                <HStack marginTop={2} space={1} justifyContent={'space-between'}>
                    <HStack alignItems={'center'}>
                        <MaterialIcons
                            name={"check"}
                            size={16}
                            color={Colors.green}
                        />
                        <Text style={[styles.textWhite]}> - {t('DASHBOARD.completed')}</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <MaterialIcons
                            name={"close"}
                            size={16}
                            color={Colors.danger}
                        />
                        <Text style={[styles.textWhite]}> - {t('DASHBOARD.missed')}</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Text style={{color: 'white', opacity: 1}}>{t('DASHBOARD.restSymbol')}</Text>
                        <Text style={[styles.textWhite]}> - {t('DASHBOARD.rest')}</Text>
                    </HStack>
                </HStack>
            </Box>
            <Box>
                <Heading style={{marginTop: 10}} modifier={'h3'}>
                    {t('DASHBOARD.nutrition.title')}
                </Heading>
                <HStack space={1}>
                    <Text style={[styles.textWhite]}>{t('DASHBOARD.nutrition.average')}:</Text><Text
                    style={[styles.textWhite, {fontWeight: 'bold'}]}>{data.averageDailyCalories} kcal</Text>
                </HStack>
                <Heading style={{marginTop: 10}} modifier={'h3'}>
                    {t('DASHBOARD.weight.title')}
                </Heading>
                <FlatList
                    data={data.weightByWeeks}
                    keyExtractor={item => item.week.toString()}
                    renderItem={({item, index}) => (
                        <HStack space={1}>
                            <Text style={[styles.textWhite]}>{t('DASHBOARD.weight.week')} {index + 1} -</Text>
                            {item?.averageWeight &&
                                <Text style={[styles.textWhite, {fontWeight: 'bold'}]}>{item.averageWeight} kg</Text>}
                        </HStack>
                    )}
                />
                <HStack space={1}>
                    <Text style={[styles.textWhite]}>{t('DASHBOARD.weight.totalChange')}:</Text>
                    {data.weightByWeeks[0]?.averageWeight && <Text
                        style={[styles.textWhite, {fontWeight: 'bold'}]}>{data.weightByWeeks[0].averageWeight > data.weightByWeeks[data.weightByWeeks.length - 1].averageWeight ? '-' : '+'} {Math.abs(data.weightByWeeks[0].averageWeight - data.weightByWeeks[data.weightByWeeks.length - 1].averageWeight).toFixed(1)} kg</Text>}
                </HStack>
            </Box>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    textWhite: {
        color: Colors.white,
    },
});