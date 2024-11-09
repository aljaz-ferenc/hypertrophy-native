import Button from "@/components/atoms/Button";
import ChangeLanguage from "@/components/molecules/ChangeLanguage";
import ScreenContainer from "@/components/molecules/ScreenContainer";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function Settings() {
  const { removeItem } = useAsyncStorage("hypertrophy-userId");

  return (
    <ScreenContainer>
      <ChangeLanguage />
      <Button
        onPress={() => {
          removeItem();
        }}
        modifier="dark"
      >
        Logout
      </Button>
    </ScreenContainer>
  );
}
