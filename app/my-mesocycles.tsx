import useGetMesocycles from "@/api/queries/useGetMesocycles";

import useUserStore from "@/store/user.store";
import Heading from "@/components/atoms/Heading";
import LoadingScreen from "@/components/modules/LoadingScreen";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import MesoOverview from "@/components/molecules/MesoOverview";
import {
  Accordion,

} from "@/components/ui/accordion";

export default function MyMesocycles() {
  const userId = useUserStore((state) => state.user!._id);
  const { data, isFetching, error } = useGetMesocycles(userId);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <ScreenContainer>
      <Heading modifier="h2">My Mesocycles</Heading>
      <Accordion style={{flex: 1}}>
        {data.map((meso) => (
          <MesoOverview meso={meso}/>
        ))}
      </Accordion>
    </ScreenContainer>
  );
}