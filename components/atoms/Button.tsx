import { StyleSheet, TouchableOpacity } from "react-native";
import { PropsWithChildren } from "react";
import { Spinner, Text } from "native-base";
import { StyleProps } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type ButtonProps = {
  modifier:
    | "primary"
    | "secondary"
    | "disabled"
    | "destructive"
    | "success"
    | "dark"
    | "spinner";
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProps;
  textStyle?: StyleProps;
  disabled?: boolean;
};

export default function Button({
  modifier,
  onPress,
  children,
  style = {},
  disabled,
  textStyle
}: PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[buttonStyles[modifier], style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[textStyles[modifier], textStyle]}>{children}</Text>
    </TouchableOpacity>
  );
}

const button = StyleSheet.create({
  base: {
    borderRadius: 5,
    padding: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});

const textStyles = StyleSheet.create({
  primary: {
    color: Colors.black,
  },
  secondary: {
    color: Colors.white,
  },
  disabled: {
    color: Colors.white,
  },
  destructive: {
    color: Colors.white,
  },
  success: {
    color: Colors.white,
  },
  dark: {
    color: Colors.white,
  },
  spinner: {}
});

const buttonStyles = StyleSheet.create({
  primary: {
    ...button.base,
    backgroundColor: Colors.white,
  },
  secondary: {
    ...button.base,
    backgroundColor: Colors.secondary,
    color: Colors.white,
  },
  disabled: {
    ...button.base,
    backgroundColor: Colors.textGray,
  },
  destructive: {
    ...button.base,
    backgroundColor: Colors.danger,
  },
  success: {
    ...button.base,
    backgroundColor: Colors.green,
  },
  spinner: {
    ...button.base,
  },

  dark: {
    ...button.base,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
