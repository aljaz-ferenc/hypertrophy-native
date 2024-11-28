import { Text, View } from "native-base";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { StyleProps } from "react-native-reanimated";

type HeadingProps = {
  modifier: "h1" | 'h2' | 'h3';
  style?: StyleProps;
} & PropsWithChildren;

export default function Heading({ modifier, style, children }: HeadingProps) {
  return (
    <>
      <Text style={[styles[`${modifier}`], { color: "white" }, style]}>
        {children}
      </Text>
      {modifier === 'h1' ? <View style={styles.spacer}/> : null}
    </>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 28,
    fontWeight: 'semibold',
    marginVertical: 10,
  },
  h3:{
    fontSize: 24,
    fontWeight: 'semibold',
    marginBottom: 5,
    paddingTop: 5
  },
  spacer: {
    height: 0.5,
    backgroundColor: "white",
    opacity: 0.5,
    marginVertical: 10,
  },
});
