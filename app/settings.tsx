import Button from "@/components/atoms/Button";
import ChangeLanguage from "@/components/molecules/ChangeLanguage";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import useUserStore from '@/store/user.store'
import { useShallow } from "zustand/react/shallow";
import { User } from "@/types";

export default function Settings() {
  const { removeItem } = useAsyncStorage("hypertrophy-userId");
const router = useRouter()
const [setUser] = useUserStore(useShallow(state => [state.setUser]))

  return (
    <ScreenContainer>
      <ChangeLanguage />
      <Button
      style={{marginTop: 5}}
        onPress={async() => {
          removeItem().then(() => router.navigate('/'))
          setUser({} as User)
          router.navigate('/todays-workout')
        }}
        modifier="dark"
      >
        Logout
      </Button>
    </ScreenContainer>
  );
}
