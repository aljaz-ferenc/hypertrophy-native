import {
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import {PropsWithChildren} from "react";
import {Spinner, Text} from "native-base";
import {StyleProps} from "react-native-reanimated";
import {Colors} from "@/constants/Colors";

type ButtonProps = {
    modifier: "primary" | "secondary" | "disabled" | 'destructive' | 'success' | 'spinner';
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
            {modifier === 'spinner' ? <Spinner></Spinner> : <Text style={textStyles[modifier]}>{children}</Text>}
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
        color: Colors.black
    },
    secondary: {
        color: Colors.white
    },
    disabled: {
        color: Colors.white,
    },
    destructive: {
        color: Colors.white
    },
    success: {
        color: Colors.white
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
        backgroundColor: Colors.textGray
    },
    destructive: {
        ...button.base,
        backgroundColor: Colors.danger
    },
    success: {
        ...button.base,
        backgroundColor: Colors.green
    },
    spinner: {
        ...button.base
    }
});
