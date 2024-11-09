import useGetUser from "@/api/queries/useGetUser";
import { Spinner, Text, View } from "native-base";
import { useEffect, useState } from "react";
import useUserStore from "@/store/user.store";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import Register from "./Register";
import { useShallow } from "zustand/react/shallow";
import ScreenContainer from "../molecules/ScreenContainer";

type SetUserProps = {
  userId: string | null | undefined;
};

export default function SetUser({ userId }: SetUserProps) {
  // const { data, error, isFetching } = useGetUser("65fd893a65caf1b69f1da64b");
  // const { data, error, isFetching } = useGetUser("6606e51210bebde7c975eb95");
  const [setUser] = useUserStore(useShallow((state) => [state.setUser]));
  const { getItem } = useAsyncStorage("hypertrophyLng");
  const { i18n } = useTranslation();
  const [state, setState] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(true);
  const { data, error, isFetching } = useGetUser(userId || "");

  useEffect(() => {
    const setLanguage = async () => {
      const lng = await getItem();
      if (!lng) return;

      i18n.changeLanguage(lng);
    };

    setLanguage();
  }, []);

  useEffect(() => {
    if (!data) return;

    setUser(data);
  }, [data]);

  if (userId === undefined || isFetching) {
    return (
      <ScreenContainer
        style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
      >
        <Text style={{ color: "white" }}>Logging you in...</Text>
      </ScreenContainer>
    );
  }

  if (userId === null || error) {
    return <Login setState={setState} />;
  }

  if (!userId)
    return (
      <>
        {state === "login" ? (
          <Login setState={setState} />
        ) : (
          <Register setState={setState} />
        )}
      </>
    );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
  },
});
