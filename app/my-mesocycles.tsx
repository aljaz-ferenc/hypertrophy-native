import useGetMesocycles from "@/api/queries/useGetMesocycles";

import useUserStore from "@/store/user.store";
import Heading from "@/components/atoms/Heading";
import LoadingScreen from "@/components/modules/LoadingScreen";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import MesoOverview from "@/components/molecules/MesoOverview";
import {
  Accordion,

} from "@/components/ui/accordion";
import { FlatList } from "native-base";

export default function MyMesocycles() {
  const userId = useUserStore((state) => state.user!._id);
  const { data, isFetching, error } = useGetMesocycles(userId);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <ScreenContainer>
      <Accordion style={{flex: 1}}>
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          renderItem={({item}) => <MesoOverview meso={item}/>}
        />
      </Accordion>
    </ScreenContainer>
  );
}