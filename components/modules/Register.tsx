import { Box, Input } from "native-base";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import Heading from "@/components/atoms/Heading";
import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import { useTranslation } from "react-i18next";
import { useRegister } from "@/api/queries/useRegister";
import ScreenContainer from "../molecules/ScreenContainer";

type RegisterProps = {
  setState: React.Dispatch<React.SetStateAction<"login" | "register">>;
};

export default function Register({ setState }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswrodConfirm] = useState("");
  const [email, setEmail] = useState("");
  const { t } = useTranslation();
  const { mutateAsync, data, error, isLoading } = useRegister();

  const handleRegister = async () => {
    await mutateAsync({ username, password, passwordConfirm, email });
  };

  return (
    <ScreenContainer style={{flex: 1, justifyContent: 'center', width: '80%', marginHorizontal: 'auto'}}>
      <Heading  style={{paddingTop: 5}} modifier={"h2"}>{t("AUTH.register")}</Heading>
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
          <Text style={styles.whiteText}>{t("AUTH.email")}</Text>
          <Input style={styles.input} onChangeText={setEmail} value={email} />
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
        <Box flexDirection={"column"} style={{ gap: 5 }}>
          <Text style={styles.whiteText}>{t("AUTH.passwordConfirm")}</Text>
          <Input
            type={"password"}
            style={styles.input}
            onChangeText={setPasswrodConfirm}
            value={passwordConfirm}
          />
        </Box>
      </View>
      <Button
        modifier={isLoading ? "spinner" : "primary"}
        onPress={handleRegister}
        style={{marginVertical: 20}}
      >
        {t("AUTH.registerBtn")}
      </Button>
      <View>
        <Text style={styles.whiteText}>{t("AUTH.haveAcc")}</Text>
        <TouchableOpacity onPress={() => setState("login")}>
          <Text
            style={{ color: Colors.textGray, textDecorationLine: "underline" }}
          >
            {t("AUTH.loginLink")}
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
