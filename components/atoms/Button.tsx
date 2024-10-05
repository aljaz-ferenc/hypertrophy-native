import {
  StyleSheet,
  StyleSheetProperties,
  TouchableOpacity,
  View,
} from "react-native";
import { PropsWithChildren } from "react";
import { Text } from "native-base";
import { StyleProps } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type ButtonProps = {
  modifier: "primary" | "secondary" | "disabled";
  onPress: () => void;
  children: React.ReactNode;
  style?: StyleProps;
};

export default function Button({
  modifier,
  onPress,
  children,
  style = {},
}: PropsWithChildren<ButtonProps>) {
  return (
    <TouchableOpacity activeOpacity={1} style={[buttonStyles[modifier], style]} onPress={onPress}>
      <Text style={textStyles[modifier]}>{children}</Text>
    </TouchableOpacity>
  );
}

const button = StyleSheet.create({
  base: {
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});

const textStyles = StyleSheet.create({
    primary: {
        color: Colors.black
    },
    secondary: {
        color: Colors.white
    },
    disabled: {
        color: Colors.black
    }
})

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
    backgroundColor: Colors.white,
  },
});
