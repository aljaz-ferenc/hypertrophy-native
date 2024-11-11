import ScreenContainer from "@/components/molecules/ScreenContainer";
import {Text} from "native-base";
import {CalendarList} from "react-native-calendars";

export default function Dashboard(){
    return (
        <ScreenContainer>
           <CalendarList
            horizontal
            pagingEnabled
           />
        </ScreenContainer>
    )
}