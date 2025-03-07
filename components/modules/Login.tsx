import { Box, Input } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Heading from "@/components/atoms/Heading";
import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import { useTranslation } from "react-i18next";
import { useLogin } from "@/api/queries/useLogin";
import ScreenContainer from "../molecules/ScreenContainer";
import { useNavigation } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type LoginProps = {
  setState: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

export default function Login({ setState }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();
  const { mutateAsync, error, data, isLoading } = useLogin();

  const handleLogin = async () => {
    await mutateAsync({ username, password });  
  };

  return (
    <ScreenContainer style={{flex: 1, position: 'relative', justifyContent: 'center', width: '80%', marginHorizontal: 'auto'}}>
      <Heading style={{paddingTop: 5}} modifier={"h2"}>{t("AUTH.login")}</Heading>
      <View style={{ gap: 10 }}>
        <Box flexDirection={"column"} style={{ gap: 5 }}>
          <Text style={styles.whiteText}>{t("AUTH.username")}</Text>
          <Input
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
        </Box>
        <Box flexDirection={"column"} style={{ gap: 5 }}>
          <Text style={styles.whiteText}>{t("AUTH.password")}</Text>
          <Input
            type={"password"}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
        </Box>
      </View>
      <Button
        modifier={isLoading ? "spinner" : "primary"}
        onPress={handleLogin}
        style={{marginVertical: 20}}
      >
        {t("AUTH.loginBtn")}
      </Button>
      <View>
        <Text style={styles.whiteText}>{t("AUTH.noAcc")}</Text>
        <TouchableOpacity onPress={() => setState("register")}>
          <Text
            style={{ color: Colors.textGray, textDecorationLine: "underline" }}
          >
            {t("AUTH.createAcc")}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  whiteText: {
    color: "white",
  },
  input: {
    backgroundColor: Colors.secondary,
    color: "white",
    marginHorizontal: "auto",
  },
});
