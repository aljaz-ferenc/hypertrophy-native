import Heading from "@/components/atoms/Heading";
import {Text} from "native-base";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import {Mesocycle} from "@/types";
import {useTranslation} from "react-i18next";
import {StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";

export default function NoActiveMesosScreen(){
    const {t} = useTranslation()

    return (
        <ScreenContainer>
            <Heading style={styles.noMesoTitle} modifier="h2">
                {t("TODAYS_WORKOUT.NO_ACTIVE_MESOS.title")}
            </Heading>

            <Text style={styles.noMesoMessage}>
                {t("TODAYS_WORKOUT.NO_ACTIVE_MESOS.message")}
            </Text>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 10,
        backgroundColor: Colors.primary,
    },
    exerciseContainer: {
        backgroundColor: Colors.secondary,
        padding: 10,
    },
    whiteText: {
        color: "white",
    },
    input: {
        maxWidth: 100,
        backgroundColor: "#020817",
        color: "white",
    },
    button: {
        backgroundColor: "white",
        borderRadius: 5,
        color: "black",
        padding: 5,
        marginTop: 10,
        alignSelf: "flex-start",
    },
    labels: {
        marginLeft: 38,
        marginBottom: 5,
    },
    label: {
        color: "white",
        opacity: 0.5,
    },
    inputRow: {
        marginBottom: 10,
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#020817",
    },
    completeBtn: {flex: 1, alignSelf: "stretch", marginTop: 10},
    noMesoTitle: {
        color: Colors.white,
        paddingTop: 10,
    },
    noMesoMessage: {
        color: Colors.white,
    },
});