import useGetUser from "@/api/queries/useGetUser";
import { Spinner, Text, View } from "native-base";
import { useEffect } from "react";
import useUserStore from "@/store/user.store";
import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";

export default function SetUser() {
  const { data, error, isFetching } = useGetUser("65fd893a65caf1b69f1da64b");
  // const { data, error, isFetching } = useGetUser("6606e51210bebde7c975eb95");
  const setUser = useUserStore((state) => state.setUser);
  const { getItem } = useAsyncStorage("hypertrophyLng");
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!data) return;
    setUser(data);
    console.log(data)
  }, [data]);

  useEffect(() => {
    const setLanguage = async () => {
      const lng = await getItem();
      if (!lng) return;

      i18n.changeLanguage(lng);
    };

    setLanguage();
  }, []);

  if (isFetching) {
    return (
      <View style={styles.screenContainer}>
        <Spinner size={"lg"} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screenContainer}>
        <Text style={{ color: "white" }}>Could not get user...</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: 10,
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
  },
});
