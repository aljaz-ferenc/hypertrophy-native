import { Text, View } from "native-base";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { StyleProps } from "react-native-reanimated";

type HeadingProps = {
  modifier: "h1";
  style?: StyleProps;
} & PropsWithChildren;

export default function Heading({ modifier, style, children }: HeadingProps) {
  return (
    <>
      <Text style={[styles[`${modifier}`], { color: "white" }, style]}>
        {children}
      </Text>
      <View style={styles.spacer} />
    </>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  spacer: {
    height: 0.5,
    backgroundColor: "white",
    opacity: 0.5,
    marginVertical: 10,
  },
});
